/*
 * CareerCompass — report generation (engine).
 *
 * Dataset-first, per docs/02-ARCHITECTURE.md §2: recommendations are matched
 * and scored deterministically over the verified firm dataset
 * (js/data.js, converted from data/firms-*.md). Nothing is invented:
 *  - Module 1 uses ONLY rows of the verified dataset, with their source URLs
 *    and verification dates.
 *  - Modules 2 (employers) and 4 (training) have NO verified dataset yet,
 *    so they return empty with an explicit note instead of names.
 *  - Module 3 demand evidence is counted from the verified firm dataset.
 *  - Module 5 for Singapore uses the district set named in
 *    docs/05-SAMPLE-REPORT-SPEC.md §3 (labelled AI-inferred); other countries
 *    derive cities from verified firm office data.
 * Scores are suitability assessments against stated criteria — never a
 * probability of an offer (PRD §2 Rule 3). Baseline weights follow PRD §5
 * and are labelled indicative in the UI.
 */
(function (global) {
  "use strict";

  var WEIGHTS = { skills: 0.35, demand: 0.25, industry: 0.20, location: 0.10, evidence: 0.10 };
  var BANDS = ["entry", "early", "mid", "senior", "executive"];

  function norm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9& ]+/g, " ").replace(/\s+/g, " ").trim(); }
  function termHit(haystack, term) {
    var h = " " + norm(haystack) + " ", t = norm(term);
    return t.length >= 3 && h.indexOf(" " + t) > -1 || h.indexOf(t) > -1 && t.length >= 5;
  }
  function anyHit(texts, term) { return texts.some(function (t) { return termHit(t, term); }); }

  var INDUSTRY_TERMS = {
    "Banking & Financial Services": ["banking", "financial services", "finance", "payments", "capital markets", "asset management", "wealth", "bank"],
    "Insurance": ["insurance", "actuarial", "underwriting"],
    "Technology": ["technology", "software", "digital", "data", "it "],
    "Healthcare & Life Sciences": ["health", "life sciences", "pharmaceutical", "medical"],
    "Engineering": ["engineering", "engineer"],
    "Education": ["education", "academic"],
    "Manufacturing": ["manufacturing", "industrial"],
    "Logistics & Supply Chain": ["logistics", "supply chain", "procurement"],
    "Consulting": ["consulting", "advisory", "professional services"],
    "Retail & Consumer": ["retail", "consumer", "fmcg"],
    "Energy & Utilities": ["energy", "oil & gas", "utilities", "renewables"],
    "Legal": ["legal", "law"],
    "Public Sector": ["public sector", "government", "public"],
    "Real Estate & Construction": ["real estate", "property", "construction"]
  };

  function firmBand(firm) {
    var text = norm((firm.seniority_focus || []).join(" ") + " " + (firm.practice_areas || []).join(" "));
    if (/\b(board|c suite|ceo|chief|executive search|managing director|partner level)\b/.test(text)) return "executive";
    if (/\b(senior|vice president|director|head of|leadership)\b/.test(text)) return "senior";
    if (/\b(mid|middle management|professional)\b/.test(text)) return "mid";
    if (/\b(graduate|entry|junior|early career|volume|train)\b/.test(text)) return "entry";
    return null;
  }

  function scoreFirm(firm, profile) {
    var specs = firm.specialisations || [], fams = firm.job_families || [], pracs = firm.practice_areas || [];
    var firmTerms = specs.concat(fams, pracs);

    // Industry / level alignment (20)
    var profileIndustries = profile.industries || [];
    var matchedIndustries = profileIndustries.filter(function (ind) {
      return (INDUSTRY_TERMS[ind] || []).some(function (t) { return anyHit(specs, t) || anyHit(pracs, t); });
    });
    var industryScore = profileIndustries.length ? Math.round(100 * matchedIndustries.length / profileIndustries.length) : 45;

    // Skills / experience alignment (35): per matched skill / role-family area
    var profileTerms = (profile.skills || []).concat(profile.roleFamilies || []);
    var matchedTerms = profileTerms.filter(function (t) { return anyHit(firmTerms, t); });
    var skillsScore = matchedTerms.length === 0 ? 8 : Math.min(100, 30 + 16 * matchedTerms.length);

    // Market-demand evidence (25): breadth of the firm's verified relevant coverage
    var demandScore = Math.min(100, 35 + 10 * matchedTerms.length + (matchedIndustries.length ? 25 : 0));

    // Seniority alignment folded into industry/level criterion per PRD module-1 criteria
    var fb = firmBand(firm), pb = profile.seniority || "mid";
    var seniorityScore, seniorityNote;
    if (!fb) { seniorityScore = 55; seniorityNote = "Firm does not state a seniority focus on its official site; treated as neutral."; }
    else {
      var diff = Math.abs(BANDS.indexOf(fb) - BANDS.indexOf(pb));
      seniorityScore = diff === 0 ? 100 : diff === 1 ? 75 : diff === 2 ? 40 : 15;
      seniorityNote = "Firm recruits at " + fb + " level; your assessed level is " + pb + ".";
    }
    var levelScore = Math.round((industryScore + seniorityScore) / 2);

    // Location / practical suitability (10)
    var locationScore = (firm.offices && firm.offices.length ? 60 : 35) + (firm.registration_url ? 40 : 0);

    // Evidence quality / freshness (10)
    var nSrc = (firm.source_urls || []).length;
    var evidenceScore = (nSrc >= 3 ? 100 : nSrc === 2 ? 85 : nSrc === 1 ? 65 : 30) + (firm.licensing_note ? 10 : 0);
    evidenceScore = Math.min(100, evidenceScore);

    var total = Math.round(
      WEIGHTS.skills * skillsScore + WEIGHTS.demand * demandScore +
      WEIGHTS.industry * levelScore + WEIGHTS.location * locationScore +
      WEIGHTS.evidence * evidenceScore
    );

    var breakdown = [
      { criterion: "Skills & experience alignment", weight: WEIGHTS.skills, score: skillsScore, note: matchedTerms.length ? "Matched: " + matchedTerms.slice(0, 4).join(", ") : "No direct skill/role-family overlap recorded" },
      { criterion: "Market-demand evidence", weight: WEIGHTS.demand, score: demandScore, note: "Breadth of this firm's verified specialisations relevant to your profile" },
      { criterion: "Industry & level alignment", weight: WEIGHTS.industry, score: levelScore, note: (matchedIndustries.length ? "Industry match: " + matchedIndustries.join(", ") + ". " : "No industry match on the firm's stated specialisations. ") + seniorityNote },
      { criterion: "Location & practical suitability", weight: WEIGHTS.location, score: locationScore, note: firm.registration_url ? "Official candidate registration/contact page is recorded" : "No candidate registration page captured in the dataset; the official website is the contact route" },
      { criterion: "Evidence quality & freshness", weight: WEIGHTS.evidence, score: evidenceScore, note: nSrc + " official source page(s) recorded; verified " + firm.verified_at }
    ];

    var rationaleParts = [];
    if (matchedIndustries.length) rationaleParts.push("Its verified specialisations include " + specs.filter(function (s) { return matchedIndustries.some(function (ind) { return (INDUSTRY_TERMS[ind] || []).some(function (t) { return termHit(s, t); }); }); }).slice(0, 3).join(", ") + ", matching your " + matchedIndustries.join(", ") + " background");
    if (matchedTerms.length) rationaleParts.push("it recruits across " + firmTerms.filter(function (t) { return matchedTerms.some(function (pt) { return termHit(t, pt) || termHit(pt, t); }); }).slice(0, 3).join(", "));
    if (firm.seniority_focus) rationaleParts.push("its stated seniority focus is " + firm.seniority_focus.join(", "));
    var rationale = rationaleParts.length ? rationaleParts.join("; ") + "." : "Generalist firm with a verified presence in this country; fit is based on country presence rather than a specialisation match.";

    return {
      total: total, breakdown: breakdown,
      matchedIndustries: matchedIndustries, matchedTerms: matchedTerms,
      rationale: rationale,
      confidence: total >= 70 ? "high" : total >= 50 ? "medium" : "low",
      limitations: firm.registration_url ? null : "Candidate registration page was not captured in the verified dataset; use the firm's official website (linked) as the contact route."
    };
  }

  function moduleFirms(firms, profile, country) {
    var pool = firms.filter(function (f) { return f.country_code === country && f.is_active; });
    var scored = pool.map(function (f) { return { firm: f, s: scoreFirm(f, profile) }; });
    var included = scored.filter(function (x) { return (x.s.matchedIndustries.length > 0 || x.s.matchedTerms.length > 0) && x.s.total >= 40; });
    included.sort(function (a, b) { return b.s.total - a.s.total; });
    var top = included.slice(0, 5);
    var items = top.map(function (x, i) {
      var f = x.firm;
      return {
        entity_id: f.id, name: f.name, rank: i + 1,
        suitability_score: x.s.total, score_basis: "suitability_assessment_not_probability",
        score_breakdown: x.s.breakdown, confidence: x.s.confidence,
        rationale: x.s.rationale, limitations: x.s.limitations,
        data_state: f.data_state, verified_at: f.verified_at,
        website: f.website, registration_url: f.registration_url,
        offices: f.offices, specialisations: f.specialisations,
        seniority_focus: f.seniority_focus, licensing_note: f.licensing_note,
        sources: (f.source_urls || []).map(function (u) { return { url: u, retrieved_at: f.verified_at }; })
      };
    });
    var shortfall = null;
    if (items.length < 5) {
      shortfall = "Only " + items.length + " of the " + pool.length + " verified firms in the " + country + " dataset match this profile's industry, skills and seniority on the evidence recorded. CareerCompass returns fewer than five rather than pad the list (PRD §2, Rule 4).";
    }
    return { target: 5, returned: items.length, shortfall_note: shortfall, items: items, _scoredPool: included };
  }

  // ---- Module 3: priority skills -------------------------------------------
  var GAP_SKILLS = {
    "Banking operations leadership": [
      { name: "ISO 20022 & payments messaging standards", category: "technical", strong: ["iso 20022"], weak: ["swift", "payments"], demand: ["payments", "payment", "iso 20022", "banking"], target: "Strong working command of ISO 20022 message standards as they replace legacy payment formats" },
      { name: "Operational risk & controls", category: "functional", strong: ["operational risk"], weak: ["risk management"], demand: ["risk", "controls", "audit"], experienceValued: true, target: "Demonstrable ownership of control frameworks, issue management and audit outcomes" },
      { name: "Sanctions screening & AML operations", category: "functional", strong: ["sanctions screening", "aml"], weak: ["compliance", "kyc"], demand: ["compliance", "aml", "sanctions", "financial crime", "kyc"], target: "Hands-on depth in screening operations, alert handling and escalation standards" },
      { name: "Data analytics & operational MI", category: "technical", strong: ["data analytics", "data analysis"], weak: ["sql"], demand: ["data", "analytics", "technology", "digital"], target: "Ability to build and use operational dashboards and data-led process diagnostics" },
      { name: "Regulatory change delivery", category: "professional", strong: ["regulatory compliance"], weak: ["compliance", "change management"], demand: ["compliance", "regulatory", "change", "transformation"], target: "A track record of landing regulatory change into live operations on deadline" }
    ],
    "Payments operations": [
      { name: "ISO 20022 & payments messaging standards", category: "technical", strong: ["iso 20022"], weak: ["swift"], demand: ["payments", "payment", "iso 20022", "banking"], target: "Strong working command of ISO 20022 across payment types" },
      { name: "Real-time & cross-border payments operations", category: "functional", strong: ["payments operations"], weak: ["payments"], demand: ["payments", "cross border", "treasury", "banking"], target: "Operational command of instant and cross-border payment rails and their exception handling" },
      { name: "Fraud prevention in payments", category: "functional", strong: ["fraud prevention"], weak: ["risk management"], demand: ["fraud", "risk", "payments"], target: "Working depth in payment fraud typologies and control design" },
      { name: "Data analytics & operational MI", category: "technical", strong: ["data analytics", "data analysis"], weak: ["sql"], demand: ["data", "analytics", "technology"], target: "Data-led monitoring of payment flows, failures and client impact" },
      { name: "Vendor & scheme relationship management", category: "professional", strong: ["vendor management"], weak: ["outsourcing"], demand: ["vendor", "outsourcing", "relationship"], experienceValued: true, target: "Evidence of managing schemes, processors and outsourced operations partners" }
    ],
    "Operations transformation": [
      { name: "Process automation & AI in operations", category: "technical", strong: ["process improvement"], weak: ["digital transformation"], demand: ["digital", "technology", "automation", "transformation"], target: "Delivered automation outcomes with measured efficiency and control impact" },
      { name: "Data analytics & operational MI", category: "technical", strong: ["data analytics", "data analysis"], weak: ["sql"], demand: ["data", "analytics"], target: "Data-led diagnostics behind transformation priorities" },
      { name: "Programme delivery at scale", category: "managerial", strong: ["programme management"], weak: ["project management", "change management"], demand: ["programme", "project", "change", "transformation"], experienceValued: true, target: "End-to-end ownership of multi-workstream change in live operations" },
      { name: "Operational risk & controls", category: "functional", strong: ["operational risk"], weak: ["risk management"], demand: ["risk", "controls"], experienceValued: true, target: "Transformation delivered without control breaches — evidenced, not asserted" },
      { name: "Stakeholder & executive communication", category: "managerial", strong: ["stakeholder management"], weak: ["leadership"], demand: ["stakeholder", "leadership", "advisory"], target: "Board-level reporting and cross-functional alignment on change outcomes" }
    ],
    "Compliance & financial crime": [
      { name: "Sanctions screening & AML operations", category: "functional", strong: ["sanctions screening", "aml"], weak: ["kyc"], demand: ["sanctions", "aml", "financial crime"], target: "Depth in screening systems, tuning and quality assurance" },
      { name: "Regulatory change delivery", category: "professional", strong: ["regulatory compliance"], weak: ["compliance"], demand: ["regulatory", "compliance", "change"], target: "Landing new regulatory obligations into BAU controls on deadline" },
      { name: "Data analytics for financial crime", category: "technical", strong: ["data analytics"], weak: ["data analysis"], demand: ["data", "analytics", "technology"], target: "Using data to target typologies, alerts and investigations" },
      { name: "Operational risk & controls", category: "functional", strong: ["operational risk"], weak: ["risk management", "audit"], demand: ["risk", "controls", "audit"], experienceValued: true, target: "Control design and testing ownership evidenced through audit outcomes" },
      { name: "Investigations & case management", category: "functional", strong: ["internal audit"], weak: ["fraud prevention"], demand: ["investigations", "fraud", "compliance"], target: "Complex case handling to evidential standard" }
    ],
    "_default": [
      { name: "Data analytics & MI", category: "technical", strong: ["data analytics", "data analysis"], weak: ["sql"], demand: ["data", "analytics", "technology"], target: "Data-led decision-making in your function" },
      { name: "Digital transformation & automation", category: "technical", strong: ["digital transformation"], weak: ["process improvement"], demand: ["digital", "transformation", "technology"], target: "Delivered digitisation outcomes in your current domain" },
      { name: "Stakeholder & executive communication", category: "managerial", strong: ["stakeholder management"], weak: ["leadership", "team management"], demand: ["stakeholder", "leadership"], target: "Senior stakeholder influence evidenced by outcomes" },
      { name: "Regulatory & compliance awareness", category: "professional", strong: ["regulatory compliance"], weak: ["compliance"], demand: ["compliance", "regulatory"], target: "Working command of your sector's regulatory expectations" },
      { name: "Operational risk & controls", category: "functional", strong: ["operational risk"], weak: ["risk management"], demand: ["risk", "controls"], experienceValued: true, target: "Ownership of controls and issue remediation in your area" }
    ]
  };

  function moduleSkills(profile, firmResult, countryFirms) {
    var families = (profile.roleFamilies || []).filter(function (f) { return GAP_SKILLS[f]; });
    var candidateLists = families.length ? families.map(function (f) { return GAP_SKILLS[f]; }) : [GAP_SKILLS._default];
    var seen = {}, candidates = [];
    candidateLists.forEach(function (list) { list.forEach(function (g) { if (!seen[g.name]) { seen[g.name] = 1; candidates.push(g); } }); });

    var profileSkills = (profile.skills || []).map(norm);
    var demandPool = firmResult._scoredPool && firmResult._scoredPool.length ? firmResult._scoredPool.map(function (x) { return x.firm; }) : countryFirms;

    var evaluated = candidates.map(function (g) {
      var hasStrong = g.strong.some(function (k) { return profileSkills.indexOf(norm(k)) > -1; });
      var hasWeak = (g.weak || []).some(function (k) { return profileSkills.indexOf(norm(k)) > -1; });
      var demandFirms = demandPool.filter(function (f) {
        var texts = (f.job_families || []).concat(f.practice_areas || [], f.specialisations || []);
        return g.demand.some(function (t) { return anyHit(texts, t); });
      });
      return { g: g, hasStrong: hasStrong, hasWeak: hasWeak, demandFirms: demandFirms };
    }).filter(function (e) { return !e.hasStrong; });

    evaluated.sort(function (a, b) { return b.demandFirms.length - a.demandFirms.length; });
    // De-duplicate near-identical skills arising from different role-family maps
    // (e.g. "Data analytics & operational MI" vs "Data analytics for financial crime").
    var deduped = [], stemSeen = {};
    evaluated.forEach(function (e) {
      var stem = norm(e.g.name).split(" ").slice(0, 2).join(" ");
      if (!stemSeen[stem]) { stemSeen[stem] = 1; deduped.push(e); }
    });
    var top = deduped.slice(0, 5);
    var items = top.map(function (e, i) {
      var classification = e.g.experienceValued ? "experience_valued_over_certification"
        : e.hasWeak ? "possessed_but_not_demonstrated" : "not_possessed";
      var sources = [];
      e.demandFirms.slice(0, 2).forEach(function (f) { (f.source_urls || []).slice(0, 1).forEach(function (u) { sources.push({ url: u, retrieved_at: f.verified_at }); }); });
      return {
        name: e.g.name, rank: i + 1, category: e.g.category, classification: classification,
        why_it_matters: "Named across the verified practice areas and job families of " + e.demandFirms.length + " of the firms matched to your profile in this country" + (e.demandFirms.length ? " (including " + e.demandFirms.slice(0, 2).map(function (f) { return f.name; }).join(" and ") + ")" : "") + ".",
        demand_evidence: e.demandFirms.length + " matched firms reference this area in their verified dataset records.",
        gap: classification === "not_possessed" ? "Not evidenced anywhere in your confirmed profile." :
             classification === "possessed_but_not_demonstrated" ? "Related experience appears in your profile, but this specific capability is not demonstrated with outcomes." :
             "The gap is evidenced experience, not coursework — employers weight delivered outcomes here.",
        target_proficiency: e.g.target,
        roadmap: e.g.experienceValued
          ? ["Take ownership of a live control or risk outcome in your current scope", "Document measurable results (audit findings closed, losses avoided, issues remediated)", "Have the outcome attested by a senior stakeholder or audit trail"]
          : ["Baseline: structured self-study of the standard/framework fundamentals", "Apply it inside a current-role project so the skill is evidenced, not just learned", "Record measurable outcomes in your CV for the next application cycle"],
        sources: sources, data_state: "ai_inferred",
        limitations: "Demand signal is derived from the verified firm dataset; the comparison against O*NET/ESCO taxonomy mappings and labour-market reports is not yet integrated (PRD §5, Module 3)."
      };
    });
    var shortfall = items.length < 5 ? "Fewer than five priority gaps are returned because the remaining candidate skills are already evidenced in your confirmed profile; recommending them would misstate the gap (PRD §5, Module 3)." : null;
    return { target: 5, returned: items.length, shortfall_note: shortfall, items: items };
  }

  // ---- Module 5: locations ---------------------------------------------------
  // District set and relative employment-concentration weights follow the
  // character set out in docs/05-SAMPLE-REPORT-SPEC.md §3 (Module 5).
  var SG_CLUSTERS = [
    { name: "Raffles Place & Marina Bay", kind: "Central financial district", weight: 10, industries: ["Banking & Financial Services", "Insurance"], officeHints: ["raffles", "marina", "battery road", "suntec", "collyer"], note: "Singapore's central financial district: headquarters and front-to-back operations of international banks and financial institutions." },
    { name: "Tampines", kind: "Regional banking operations hub", weight: 7, industries: ["Banking & Financial Services"], officeHints: ["tampines"], note: "A designated regional centre hosting large banking operations and technology centres for international banks." },
    { name: "Changi Business Park", kind: "Operations & technology cluster", weight: 6, industries: ["Banking & Financial Services", "Technology"], officeHints: ["changi"], note: "A business-park cluster used by banks and financial firms for operations, technology and shared-services functions." },
    { name: "Jurong East", kind: "Regional centre — back-office growth", weight: 3, industries: ["Banking & Financial Services", "Logistics & Supply Chain"], officeHints: ["jurong"], note: "The western regional centre, with growing financial back-office and corporate presence." },
    { name: "one-north / Fusionopolis", kind: "Fintech & innovation cluster", weight: 4, industries: ["Technology", "Banking & Financial Services"], officeHints: ["one-north", "fusionopolis", "buona vista"], note: "The research-and-innovation district where fintech firms and bank innovation teams concentrate." }
  ];

  function moduleLocations(profile, firmResult, country, countryFirms) {
    if (country === "SG") {
      var items = SG_CLUSTERS.map(function (c, i) {
        var overlap = c.industries.filter(function (ind) { return (profile.industries || []).indexOf(ind) > -1; });
        var crossRefs = firmResult.items.filter(function (it) {
          return (it.specialisations || []).some(function (s) { return c.industries.some(function (ind) { return (INDUSTRY_TERMS[ind] || []).some(function (t) { return termHit(s, t); }); }); });
        }).slice(0, 2).map(function (it) { return it.name; });
        var officeHere = firmResult.items.filter(function (it) {
          return (it.offices || []).some(function (o) { return c.officeHints.some(function (h) { return norm(o).indexOf(h) > -1; }); });
        }).map(function (it) { return it.name; });
        var score = Math.min(96, 50 + 13 * overlap.length + c.weight + (officeHere.length ? 6 : 0));
        return {
          name: c.name, rank: i + 1, location_type: "district/cluster", kind: c.kind,
          suitability_score: score, score_basis: "suitability_assessment_not_probability",
          confidence: overlap.length ? "medium" : "low",
          rationale: c.note + (overlap.length ? " Relevant to your profile: " + overlap.join(", ") + "." : ""),
          cross_references: crossRefs, offices_from_dataset: officeHere,
          salary_indicator: null, col_indicator: null,
          data_state: "ai_inferred",
          limitations: "District set and descriptions follow the CareerCompass product research specification (docs/05 §3). A verified locations dataset (employer counts, salary and cost-of-living indicators) is not yet built, so no salary or cost figures are shown."
        };
      });
      items.sort(function (a, b) { return b.suitability_score - a.suitability_score; });
      items.forEach(function (it, i) { it.rank = i + 1; });
      return { location_type_label: "Singapore employment districts and clusters", target: 5, returned: items.length, shortfall_note: null, items: items };
    }
    // Other countries: derive cities from verified firm office data.
    var CITY_ALIASES = { "bengaluru": "Bangalore", "bangalore": "Bangalore", "gurgaon": "Gurugram", "gurugram": "Gurugram", "bombay": "Mumbai", "madras": "Chennai", "calcutta": "Kolkata", "delhi": "New Delhi", "new delhi": "New Delhi" };
    function cityOf(o) {
      var c = String(o).split("(")[0].split("—")[0].split(",")[0].trim();
      return CITY_ALIASES[c.toLowerCase()] || c;
    }
    var cityStats = {};
    countryFirms.forEach(function (f) {
      (f.offices || []).forEach(function (o) {
        var city = cityOf(o);
        if (!city || city.length > 40) return;
        cityStats[city] = cityStats[city] || { firms: 0, matched: 0 };
        cityStats[city].firms += 1;
      });
    });
    firmResult.items.forEach(function (it) {
      (it.offices || []).forEach(function (o) {
        var city = cityOf(o);
        if (cityStats[city]) cityStats[city].matched += 1;
      });
    });
    var cities = Object.keys(cityStats).map(function (name) { return { name: name, firms: cityStats[name].firms, matched: cityStats[name].matched }; });
    cities.sort(function (a, b) { return (b.matched - a.matched) || (b.firms - a.firms); });
    var topCities = cities.slice(0, 5);
    var items2 = topCities.map(function (c, i) {
      var score = Math.min(95, Math.round(40 + c.matched * 8 + Math.min(12, c.firms * 0.8)));
      return {
        name: c.name, rank: i + 1, location_type: "city",
        suitability_score: score, score_basis: "suitability_assessment_not_probability",
        confidence: c.matched ? "medium" : "low",
        rationale: c.firms + " verified firms in the dataset list offices here" + (c.matched ? ", including " + c.matched + " of the firms matched to your profile" : "") + ".",
        cross_references: [], offices_from_dataset: [],
        salary_indicator: null, col_indicator: null,
        data_state: "live_verified",
        limitations: "Derived from the verified firm dataset's office records. Salary and cost-of-living indicators are not in the dataset and are not shown."
      };
    });
    return {
      location_type_label: "Career locations — cities", target: 5, returned: items2.length,
      shortfall_note: items2.length < 5 ? "Only " + items2.length + " locations could be derived from verified firm office records for this country." : null,
      items: items2
    };
  }

  // ---- Eligibility -----------------------------------------------------------
  var DISCLAIMER = "This is guidance only, based on the official sources linked, and is not a legal or immigration determination. Confirm your position with the authority or a qualified adviser before acting.";
  var ELIGIBILITY = {
    SG: { data_state: "live_verified", verified_at: "2026-11-16", notes: [
      { topic: "sponsorship", text: "Foreign professionals need an Employment Pass (EP) sponsored by the Singapore employer; there is no self-sponsored route for employees. If your profile does not state Singapore work authorisation, assume sponsorship is required and target employers able to sponsor.", source: "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility" },
      { topic: "salary_threshold", text: "As checked on 2026-11-16 against the Ministry of Manpower's published criteria: the EP qualifying salary for new applications is S$5,600 per month (S$6,200 for financial services), rising to S$6,000 (S$6,600 financial services) for applications from 1 January 2027, and candidates must also pass the COMPASS points-based assessment (40 points). These figures are time-sensitive — re-check them on MOM's page before relying on them.", source: "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility" },
      { topic: "professional_registration", text: "Senior banking roles sit inside MAS-regulated institutions; fitness and propriety expectations apply to senior appointments, and your prospective employer will run its own regulatory checks. No individual licence is generally required for operations roles.", source: "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility" }
    ]},
    IN: { data_state: "ai_inferred", verified_at: null, notes: [
      { topic: "work_authorisation", text: "Indian citizens need no work authorisation for India. Other nationals generally require an employment visa sponsored by the Indian employer before starting work.", source: "https://indianvisaonline.gov.in/" }
    ]},
    AE: { data_state: "ai_inferred", verified_at: null, notes: [
      { topic: "sponsorship", text: "Employment in the UAE runs on an employer-sponsored work permit and residence visa, arranged by the employer; free-zone and mainland routes differ in detail. Confirm the sponsoring entity and permit type before relocating.", source: "https://u.ae/en/information-and-services/visa-and-emirates-id" }
    ]},
    GB: { data_state: "ai_inferred", verified_at: null, notes: [
      { topic: "sponsorship", text: "Unless you already hold UK work authorisation, you will generally need a Skilled Worker visa sponsored by a licensed sponsor employer, with a salary at or above the prevailing threshold for the role — check the current threshold on GOV.UK, as it changes.", source: "https://www.gov.uk/skilled-worker-visa" }
    ]},
    CA: { data_state: "ai_inferred", verified_at: null, notes: [
      { topic: "work_authorisation", text: "Unless you are a Canadian citizen or permanent resident, you will generally need a work permit; many employer-specific permits require the employer to obtain a Labour Market Impact Assessment first, unless an exemption applies.", source: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html" }
    ]}
  };

  // ---- Action plan -------------------------------------------------------------
  function modulePlan(firmResult, skillsResult, trainingItems, locationResult, profile) {
    var firms = firmResult.items, skills = skillsResult.items, locs = locationResult.items;
    function t(phase, text, priority, linked, outcome) { return { phase: phase, task: text, priority: priority, linked_recommendation: linked || null, expected_outcome: outcome, status: "todo" }; }
    var d30 = [], d60 = [], d90 = [];
    var alertTopic = (profile.roleFamilies && profile.roleFamilies[0]) || "your target roles";
    if (firms[0]) d30.push(t("d30", "Register your profile with " + firms[0].name + " via its official candidate route (linked in Module 1) and set alerts for " + alertTopic + " roles.", "high", firms[0].name, "Your profile is in front of the best-matched firm for your background."));
    if (firms[1]) d30.push(t("d30", "Register with " + firms[1].name + " and note its stated seniority focus against your assessed level.", "high", firms[1].name, "A second live recruiter channel at your level."));
    if (skills[0]) d30.push(t("d30", "Close the evidence gap on " + skills[0].name + ": gather current-role examples and metrics that demonstrate it.", "high", skills[0].name, "Interview-ready evidence for your top priority skill."));
    if (locs[0]) d30.push(t("d30", "Focus your search on " + locs[0].name + " — the strongest location match in Module 5 — and map your matched firms there.", "medium", locs[0].name, "A geographically focused, realistic target list."));
    if (firms[2]) d60.push(t("d60", "Register with " + firms[2].name + " and request a market conversation about seniority fit and current mandates.", "medium", firms[2].name, "Direct market feedback on your positioning."));
    if (skills[1]) d60.push(t("d60", "Work the roadmap for " + skills[1].name + " (Module 3): complete the baseline step and apply it in a live project.", "high", skills[1].name, "A demonstrable new capability, not just study."));
    var expSkill = trainingItems.filter(function (x) { return x.resolution === "experience_valued"; })[0];
    if (expSkill) d60.push(t("d60", "For " + expSkill.skill + ", Module 4 recommends no course — instead, take ownership of one measurable outcome in your current role this quarter.", "medium", expSkill.skill, "Attestable experience where employers weight it over certificates."));
    if (firms[3]) d60.push(t("d60", "Engage " + firms[3].name + " with a tailored CV version emphasising your matched specialisations.", "medium", firms[3].name, "Broader coverage of the firms that recruit your profile."));
    if (firms[0]) d90.push(t("d90", "Follow up with " + firms[0].name + (firms[1] ? " and " + firms[1].name : "") + " with an updated evidence pack covering your Module 3 progress.", "high", firms[0].name, "Your candidacy stays current as your evidence improves."));
    if (skills[2]) d90.push(t("d90", "Review progress on " + skills[2].name + " and re-run your CareerCompass report so the plan reflects your updated profile.", "medium", skills[2].name, "A refreshed strategy based on what has actually changed."));
    if (locs[1]) d90.push(t("d90", "Extend applications to " + locs[1].name + " if the first location has not produced interviews, using the same matched-firm list.", "low", locs[1].name, "A second geographic front without restarting the search."));
    return { d30: d30, d60: d60, d90: d90 };
  }

  function generateReport(profile, country, firms, meta) {
    var countryFirms = firms.filter(function (f) { return f.country_code === country; });
    var firmResult = moduleFirms(firms, profile, country);
    var skillsResult = moduleSkills(profile, firmResult, countryFirms);
    var trainingItems = skillsResult.items.map(function (s) {
      return {
        skill: s.name,
        resolution: s.classification === "experience_valued_over_certification" ? "experience_valued" : "requires_verification",
        programme: null, provider: null,
        fee: "Requires verification",
        note: s.classification === "experience_valued_over_certification"
          ? "No course recommended for this skill: the gap is evidenced experience, not coursework (PRD §5, Module 4 rule)."
          : "No verified programme is listed for this skill yet. CareerCompass does not publish course fees, durations, intakes or accreditation without a verified source, and the training-provider dataset has not been built yet — so nothing is recommended here rather than something invented."
      };
    });
    var locationResult = moduleLocations(profile, firmResult, country, countryFirms);
    var plan = modulePlan(firmResult, skillsResult, trainingItems, locationResult, profile);
    var elig = ELIGIBILITY[country] || { data_state: "ai_inferred", verified_at: null, notes: [] };

    return {
      report_id: "cc-" + Date.now().toString(36),
      status: "summary",
      country_code: country,
      dataset_version: meta.dataset_version,
      generated_at: new Date().toISOString(),
      profile: profile,
      modules: {
        firms: { target: firmResult.target, returned: firmResult.returned, shortfall_note: firmResult.shortfall_note, items: firmResult.items },
        employers: {
          strategic_fit: [], verified_vacancies: [],
          note: "No verified employer dataset exists yet, so no employers are named. CareerCompass never presents a company as a target — or as hiring — without a verified source (PRD §2, Rules 1–2). The employer dataset is a launch research task (docs/03-DATA-MODEL.md §7)."
        },
        skills: skillsResult,
        training: {
          target: skillsResult.items.length, returned: trainingItems.length,
          shortfall_note: "The training-provider dataset has not been built yet. No courses, fees, durations, intakes or accreditations are shown, because none could be verified (PRD §2, Rule 1).",
          items: trainingItems
        },
        locations: locationResult
      },
      eligibility: { notes: elig.notes, data_state: elig.data_state, verified_at: elig.verified_at, disclaimer: DISCLAIMER },
      action_plan: plan,
      degradations: [
        { module: "employers", reason: "no_verified_dataset", data_state: null },
        { module: "training", reason: "no_verified_dataset", data_state: null }
      ]
    };
  }

  var api = { generateReport: generateReport, WEIGHTS: WEIGHTS, _scoreFirm: scoreFirm };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.CC_REPORT = api;
})(typeof window !== "undefined" ? window : globalThis);
