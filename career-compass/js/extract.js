/*
 * CareerCompass — client-side CV extraction (engine).
 *
 * Extraction runs entirely in the visitor's browser with provenance
 * labels, using a deterministic rule-based parser: it only ever reports
 * what is literally in the document (provenance "verified" =
 * document-backed), what it computed from document dates ("ai_inferred",
 * labelled as an estimate in the UI), or what the user later types
 * ("user_provided"). It never invents a fact.
 *
 * Uploaded documents are untrusted input (docs/02 §7): text is treated as
 * data; instruction-like text addressed to an AI is flagged, never followed.
 */
(function (global) {
  "use strict";

  var INDUSTRIES = [
    { name: "Banking & Financial Services", keys: ["banking", "bank", "payments", "payment", "fintech", "financial services", "capital markets", "asset management", "wealth management"] },
    { name: "Insurance", keys: ["insurance", "insurer", "actuarial", "underwriting"] },
    { name: "Technology", keys: ["software", "technology", "it services", "saas", "data engineering", "cloud"] },
    { name: "Healthcare & Life Sciences", keys: ["healthcare", "hospital", "pharmaceutical", "life sciences", "clinical"] },
    { name: "Engineering", keys: ["engineering", "engineer", "infrastructure projects"] },
    { name: "Education", keys: ["education", "university", "school", "training provider"] },
    { name: "Manufacturing", keys: ["manufacturing", "plant operations", "factory"] },
    { name: "Logistics & Supply Chain", keys: ["logistics", "supply chain", "procurement", "warehousing"] },
    { name: "Consulting", keys: ["consulting", "advisory services", "management consulting"] },
    { name: "Retail & Consumer", keys: ["retail", "e-commerce", "consumer goods", "fmcg"] },
    { name: "Energy & Utilities", keys: ["energy", "utilities", "oil and gas", "renewables"] },
    { name: "Legal", keys: ["legal services", "law firm"] },
    { name: "Public Sector", keys: ["public sector", "government agency", "civil service"] },
    { name: "Real Estate & Construction", keys: ["real estate", "construction", "property development"] }
  ];

  var SKILLS = [
    "banking operations", "payments operations", "payment operations", "payments",
    "iso 20022", "swift", "aml", "kyc", "compliance", "regulatory compliance",
    "sanctions screening", "fraud prevention", "risk management", "operational risk",
    "credit risk", "trade finance", "treasury", "cash management", "settlements",
    "reconciliations", "digital transformation", "process improvement", "change management",
    "operations management", "team management", "team leadership", "leadership",
    "stakeholder management", "project management", "programme management",
    "data analytics", "data analysis", "business analysis", "internal audit", "audit",
    "financial reporting", "accounting", "vendor management", "outsourcing",
    "customer service", "agile", "sql", "python", "sap", "core banking", "cards",
    "relationship management", "sales", "marketing", "human resources", "supply chain"
  ];

  var ROLE_FAMILY_RULES = [
    { family: "Banking operations leadership", keys: ["banking operations", "head of operations", "operations director", "chief operating", "coo"] },
    { family: "Payments operations", keys: ["payments operations", "payment operations", "payments"] },
    { family: "Operations transformation", keys: ["digital transformation", "process improvement", "change management", "transformation"] },
    { family: "Compliance & financial crime", keys: ["aml", "kyc", "compliance", "sanctions screening", "fraud prevention"] },
    { family: "Risk management", keys: ["risk management", "operational risk", "credit risk"] },
    { family: "Trade finance operations", keys: ["trade finance"] },
    { family: "Treasury & cash management", keys: ["treasury", "cash management"] },
    { family: "Customer operations", keys: ["customer service", "customer operations"] },
    { family: "Technology & engineering", keys: ["software", "cloud", "data engineering"] },
    { family: "General operations management", keys: ["operations management", "operations"] }
  ];

  var SENIOR_TITLES = ["chief", "head of", "director", "vice president", "vp", "president", "partner", "principal", "managing director", "general manager"];
  var LANGUAGES = ["english", "hindi", "mandarin", "cantonese", "tamil", "malay", "bahasa", "french", "german", "arabic", "japanese", "spanish", "punjabi", "bengali", "telugu", "marathi", "urdu", "korean", "portuguese", "italian"];
  var COUNTRIES = ["india", "singapore", "united arab emirates", "uae", "dubai", "abu dhabi", "united kingdom", "uk", "london", "canada", "toronto"];
  var QUALIFICATIONS = [
    { re: /\b(mba|master of business administration)\b/i, label: "MBA" },
    { re: /\bph\.?d\b/i, label: "PhD" },
    { re: /\b(b\.?e\.?|b\.?tech|bachelor of engineering|bachelor of technology)\b/i, label: "Bachelor's in Engineering" },
    { re: /\b(b\.?com|bachelor of commerce)\b/i, label: "Bachelor of Commerce" },
    { re: /\b(b\.?sc|bachelor of science)\b/i, label: "Bachelor of Science" },
    { re: /\b(b\.?a\.?|bachelor of arts)\b/i, label: "Bachelor of Arts" },
    { re: /\b(m\.?sc|master of science)\b/i, label: "Master of Science" },
    { re: /\b(m\.?tech|master of technology)\b/i, label: "Master of Technology" },
    { re: /\bbachelor('s)?\b/i, label: "Bachelor's degree" },
    { re: /\bmaster('s)?\b/i, label: "Master's degree" },
    { re: /\b(chartered accountant|\bca\b)\b/i, label: "Chartered Accountant (CA)" },
    { re: /\bcfa\b/i, label: "CFA" },
    { re: /\bcpa\b/i, label: "CPA" },
    { re: /\bpmp\b/i, label: "PMP" }
  ];
  var INJECTION_RE = /(ignore\s+(all\s+)?(previous|prior|above)\s+instructions|disregard\s+(the\s+)?(above|previous)|you\s+are\s+an?\s+(ai|assistant|language model)|system\s+prompt|act\s+as\s+if\s+you)/i;

  function esc(re) { return re.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function hasKey(text, key) {
    return new RegExp("(^|[^a-z])" + esc(key) + "([^a-z]|$)", "i").test(text);
  }
  function uniq(arr) { return Array.from(new Set(arr)); }

  function extractProfile(rawText) {
    var text = String(rawText || "").replace(/\r\n/g, "\n");
    var lower = text.toLowerCase();
    var lines = text.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    var prov = {}; // field -> provenance
    var missing = [];
    var profile = {
      name: null, email: null, phone: null, headline: null,
      currentTitle: null, currentEmployer: null, currentLocation: null,
      totalExperienceYears: null, seniority: null,
      industries: [], roleFamilies: [], skills: [], languages: [],
      qualifications: [], certifications: [], employmentHistory: [],
      missingOrUncertain: [], injectionFlags: []
    };

    // --- injection guard (docs/02 §7): flag, never follow -------------------
    if (INJECTION_RE.test(text)) {
      profile.injectionFlags.push("This document contains text addressed to an AI system. It was treated as data and ignored during extraction.");
    }

    // --- contact ------------------------------------------------------------
    var emailM = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
    if (emailM) { profile.email = emailM[0]; prov.email = "verified"; }
    var phoneM = text.match(/(\+\d{1,3}[\s-]?)?(\(?\d{3,5}\)?[\s-]?){2,3}\d{3,4}/);
    if (phoneM && phoneM[0].replace(/\D/g, "").length >= 8) { profile.phone = phoneM[0].trim(); prov.phone = "verified"; }

    // --- name ---------------------------------------------------------------
    var nameM = text.match(/^\s*name\s*[:\-]\s*(.+)$/im);
    if (nameM) { profile.name = nameM[1].trim(); prov.name = "verified"; }
    else if (lines.length) {
      var first = lines[0];
      if (/^[A-Z][a-zA-Z.'-]+(\s+[A-Z][a-zA-Z.'-]+){1,3}$/.test(first) && first.length <= 40 && !/curriculum|resume|cv\b/i.test(first)) {
        profile.name = first; prov.name = "ai_inferred";
      }
    }
    if (!profile.name) missing.push("Name not stated in the document");

    // --- experience years ---------------------------------------------------
    var yrsM = lower.match(/(\d{1,2})\+?\s*(years|yrs)\s*(of\s+)?(experience|exp)/);
    var dateSpans = [];
    var spanRe = /((?:19|20)\d{2})\s*[-–—to]+\s*((?:19|20)\d{2}|present|current|now)/gi, sm;
    while ((sm = spanRe.exec(lower)) !== null) {
      var start = parseInt(sm[1], 10);
      var end = /present|current|now/.test(sm[2]) ? new Date().getFullYear() : parseInt(sm[2], 10);
      if (end >= start && end - start <= 45) dateSpans.push([start, end]);
    }
    if (yrsM) {
      profile.totalExperienceYears = parseInt(yrsM[1], 10); prov.totalExperienceYears = "verified";
    } else if (dateSpans.length) {
      // Union of spans -> rough total; labelled as an estimate.
      dateSpans.sort(function (a, b) { return a[0] - b[0]; });
      var total = 0, curS = dateSpans[0][0], curE = dateSpans[0][1];
      dateSpans.slice(1).forEach(function (s) {
        if (s[0] <= curE) { curE = Math.max(curE, s[1]); } else { total += curE - curS; curS = s[0]; curE = s[1]; }
      });
      total += curE - curS;
      if (total > 0) { profile.totalExperienceYears = total; prov.totalExperienceYears = "ai_inferred"; }
    }
    if (profile.totalExperienceYears === null) missing.push("Total years of experience could not be determined from the document");

    // --- employment history (blocks anchored on date ranges) ----------------
    var blocks = [];
    var blockRe = /((?:19|20)\d{2})\s*[-–—]\s*((?:19|20)\d{2}|present|current)/i;
    function splitTitleEmployer(head) {
      var parts = String(head || "").split(/\s*[,|]\s+|\s+[-–—]\s+/).map(function (p) { return p.trim(); }).filter(Boolean);
      return { title: parts[0] || null, employer: parts.length > 1 ? parts[1] : null };
    }
    lines.forEach(function (line, i) {
      var m = line.match(blockRe);
      if (m) {
        var rest = line.slice(m.index + m[0].length).replace(/^[\s,|·-]+/, "").trim();
        var head = null;
        if (rest.length >= 3 && rest.length <= 90) head = rest;                    // "2019 - Present  Head of Ops, ABC Bank"
        else if (i > 0 && lines[i - 1].length <= 70 && !/[.!?]\s/.test(lines[i - 1])) head = lines[i - 1]; // title on the line above
        var te = splitTitleEmployer(head);
        blocks.push({ title: te.title, employer: te.employer, period: m[0], current: /present|current/i.test(m[2]) });
      }
    });
    // A "Title, Employer" line near the top of the document (common CV layout)
    if (!blocks.length || !blocks.some(function (b) { return b.title; })) {
      for (var li = 0; li < Math.min(6, lines.length); li++) {
        var cand = lines[li];
        if (cand.length <= 70 && /,/.test(cand) && !/@/.test(cand) && /(head|manager|director|officer|lead|consultant|engineer|analyst|executive|specialist|vp|president)/i.test(cand)) {
          var te2 = splitTitleEmployer(cand);
          if (te2.title && te2.employer) { blocks.unshift({ title: te2.title, employer: te2.employer, period: "", current: true }); break; }
        }
      }
    }
    profile.employmentHistory = blocks;
    if (blocks.length) prov.employmentHistory = "verified";
    var current = blocks.filter(function (b) { return b.current; })[0] || blocks[blocks.length - 1];
    var roleM = text.match(/current\s+(role|title|position)\s*[:\-]\s*(.+)/i);
    if (roleM) { profile.currentTitle = roleM[2].trim(); prov.currentTitle = "verified"; }
    else if (current && current.title) { profile.currentTitle = current.title; prov.currentTitle = "verified"; }
    if (current && current.employer) { profile.currentEmployer = current.employer; prov.currentEmployer = "verified"; }
    if (!profile.currentTitle) missing.push("Current job title not identified in the document");
    if (!profile.currentEmployer) missing.push("Specific employers and employment dates were not identified in the document");

    // --- industries / skills / role families --------------------------------
    // Industry scan excludes education/qualification lines, so a CV's
    // "Education: MBA" section is not mistaken for education-sector experience.
    var industryText = lines.filter(function (l) { return !/^(education|qualifications|academic)\b/i.test(l); }).join("\n").toLowerCase();
    INDUSTRIES.forEach(function (ind) {
      if (ind.keys.some(function (k) { return hasKey(industryText, k); })) profile.industries.push(ind.name);
    });
    if (profile.industries.length) prov.industries = "verified";
    SKILLS.forEach(function (s) { if (hasKey(lower, s)) profile.skills.push(s); });
    profile.skills = uniq(profile.skills).filter(function (s) {
      // drop a shorter skill when a longer containing skill also matched (e.g. "payments" vs "payments operations")
      return !profile.skills.some(function (o) { return o !== s && o.indexOf(s) > -1; });
    });
    if (profile.skills.length) prov.skills = "verified";
    ROLE_FAMILY_RULES.forEach(function (r) {
      if (r.keys.some(function (k) { return hasKey(lower, k); })) profile.roleFamilies.push(r.family);
    });
    if (profile.roleFamilies.length) prov.roleFamilies = "ai_inferred";

    // --- qualifications & certifications ------------------------------------
    QUALIFICATIONS.forEach(function (q) { if (q.re.test(text)) profile.qualifications.push(q.label); });
    profile.qualifications = uniq(profile.qualifications);
    if (profile.qualifications.length) prov.qualifications = "verified";
    var certLines = lines.filter(function (l) { return /certif/i.test(l) && l.length <= 140; });
    profile.certifications = uniq(certLines.map(function (l) { return l.replace(/^[-•*]\s*/, ""); }));
    if (profile.certifications.length) prov.certifications = "verified";
    else missing.push("Certifications held are not stated in the document");

    // --- languages & location ------------------------------------------------
    var langSection = lower.match(/languages?\s*[:\-]([^\n]+)/);
    if (langSection) {
      LANGUAGES.forEach(function (l) { if (langSection[1].indexOf(l) > -1) profile.languages.push(l[0].toUpperCase() + l.slice(1)); });
    } else {
      var fluentM = lower.match(/fluent in ([a-z, and]+)/);
      if (fluentM) LANGUAGES.forEach(function (l) { if (fluentM[1].indexOf(l) > -1) profile.languages.push(l[0].toUpperCase() + l.slice(1)); });
    }
    if (profile.languages.length) prov.languages = "verified";
    var locM = text.match(/(based in|located in|location)\s*[:\-]?\s*([A-Z][a-zA-Z ]{2,30})/i);
    if (locM) { profile.currentLocation = locM[2].trim(); prov.currentLocation = "verified"; }
    else {
      var foundCountry = COUNTRIES.filter(function (c) { return hasKey(lower, c); });
      if (foundCountry.length === 1) { profile.currentLocation = foundCountry[0]; prov.currentLocation = "ai_inferred"; }
    }
    if (!profile.currentLocation) missing.push("Current location is not stated in the document");
    missing.push("Work-authorisation position for the target country is not stated in the document");

    // --- seniority ------------------------------------------------------------
    var yrs = profile.totalExperienceYears || 0;
    var titleText = ((profile.currentTitle || "") + " " + lower.slice(0, 400)).toLowerCase();
    var seniorTitle = SENIOR_TITLES.some(function (t) { return titleText.indexOf(t) > -1; });
    var execTitle = /\b(chief|managing director|ceo|coo|cfo|president)\b/.test(titleText);
    if (execTitle && yrs >= 8) profile.seniority = "executive";
    else if (yrs >= 10 || (seniorTitle && yrs >= 7)) profile.seniority = "senior";
    else if (yrs >= 5) profile.seniority = "mid";
    else if (yrs >= 2) profile.seniority = "early";
    else if (yrs > 0) profile.seniority = "entry";
    if (profile.seniority) prov.seniority = "ai_inferred"; // seniority is always an assessment, never a stated fact

    // --- headline ---------------------------------------------------------------
    if (profile.industries.length || profile.roleFamilies.length) {
      var lead = profile.seniority === "executive" ? "Executive" : profile.seniority === "senior" ? "Senior" : "";
      var domain = profile.roleFamilies[0] || profile.industries[0] || "Professional";
      profile.headline = (lead ? lead + " " : "") + domain.charAt(0).toUpperCase() + domain.slice(1) +
        (profile.totalExperienceYears ? " — " + profile.totalExperienceYears + " years of experience" : "");
      prov.headline = "ai_inferred";
    }

    profile.missingOrUncertain = missing.concat(profile.injectionFlags);
    profile.provenance = prov;
    return profile;
  }

  var api = { extractProfile: extractProfile };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.CC_EXTRACT = api;
})(typeof window !== "undefined" ? window : globalThis);
