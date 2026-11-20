/*
 * CareerCompass by Deesha Global — static application wiring.
 *
 * Everything runs client-side. The CV file is read in the browser and never
 * uploaded; the extracted profile is kept only in this browser's local
 * storage after consent + confirmation, and "Delete my data" removes it.
 * The full report is gated by email verification: codes are issued and
 * checked by Deesha Global's Supabase email + OTP service — the same
 * service and pattern as the Relocation Assessment (DECISIONS.md #5).
 */
(function () {
  "use strict";

  var FIRMS = window.CC_FIRMS || [];
  var META = window.CC_DATASET_META || { countries: {}, counts: {}, dataset_version: "unknown" };
  var COUNTRY_ORDER = ["IN", "SG", "AE", "GB", "CA"];
  var PROV_LABEL = { verified: "From your document", ai_inferred: "Assessed", user_provided: "Provided by you" };

  var state = {
    mode: "user",            // 'user' | 'sample'
    country: "IN",
    rawText: "",
    profile: null,
    report: null,
    unlockedEmail: null
  };

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function show(id) { $(id).hidden = false; }
  function hide(id) { $(id).hidden = true; }
  function scrollTo(id) { $(id).scrollIntoView({ behavior: "smooth", block: "start" }); }

  // ---------------------------------------------------------------- countries
  function renderCountries() {
    $("countryGrid").innerHTML = COUNTRY_ORDER.map(function (code) {
      var c = META.countries[code] || {};
      return '<button type="button" class="country' + (state.country === code ? " sel" : "") + '" data-country="' + code + '" role="radio" aria-checked="' + (state.country === code) + '">' +
        '<span class="cname">' + esc(c.name || code) + '</span>' +
        '<span class="ccount">' + (META.counts[code] || 0) + ' verified firms</span></button>';
    }).join("");
    Array.prototype.forEach.call(document.querySelectorAll(".country"), function (b) {
      b.addEventListener("click", function () { state.country = b.getAttribute("data-country"); renderCountries(); syncCountrySelect(); });
    });
    syncCountrySelect();
  }
  function syncCountrySelect() {
    var sel = $("countrySelect");
    sel.innerHTML = COUNTRY_ORDER.map(function (code) {
      return '<option value="' + code + '"' + (state.country === code ? " selected" : "") + '>' + esc((META.countries[code] || {}).name || code) + '</option>';
    }).join("");
  }

  // --------------------------------------------------------------------- tabs
  var activeTab = "upload";
  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
    t.addEventListener("click", function () {
      activeTab = t.getAttribute("data-tab");
      Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (x) { x.classList.toggle("active", x === t); });
      ["upload", "paste", "describe"].forEach(function (k) { $("pane-" + k).hidden = k !== activeTab; });
      refreshExtractBtn();
    });
  });

  // --------------------------------------------------------------- file input
  var fileText = "";
  $("cvFile").addEventListener("change", function () {
    var f = this.files[0];
    fileText = "";
    if (!f) { $("fileName").textContent = "Maximum 10 MB. The file is read in your browser only — it is never uploaded."; refreshExtractBtn(); return; }
    if (f.size > 10 * 1024 * 1024) { $("intakeErr").textContent = "That file is over the 10 MB limit."; this.value = ""; return; }
    $("fileName").textContent = "Reading " + f.name + " …";
    readFile(f).then(function (text) {
      fileText = text || "";
      $("fileName").textContent = f.name + " — " + (fileText ? fileText.length.toLocaleString() + " characters extracted. The file itself is not stored." : "no readable text found in this file.");
      if (!fileText) $("intakeErr").textContent = "No readable text could be extracted from that file. Try the paste option instead.";
      refreshExtractBtn();
    }).catch(function () {
      $("intakeErr").textContent = "That file could not be read (unsupported or corrupt). Try the paste option instead.";
    });
  });

  function readFile(f) {
    var name = f.name.toLowerCase();
    if (name.endsWith(".txt")) return f.text();
    if (name.endsWith(".pdf")) {
      if (!window.pdfjsLib) return Promise.reject(new Error("pdf.js unavailable"));
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      return f.arrayBuffer().then(function (buf) {
        return window.pdfjsLib.getDocument({ data: buf }).promise.then(function (pdf) {
          var pages = [];
          for (var i = 1; i <= pdf.numPages; i++) pages.push(pdf.getPage(i).then(function (pg) {
            return pg.getTextContent().then(function (tc) {
              var lines = [], cur = [], lastY = null;
              tc.items.forEach(function (it) {
                var y = (it.transform && typeof it.transform[5] === "number") ? Math.round(it.transform[5]) : null;
                if (lastY !== null && y !== null && Math.abs(y - lastY) > 2) { lines.push(cur.join(" ")); cur = []; }
                cur.push(it.str);
                if (y !== null) lastY = y;
                if (it.hasEOL) { lines.push(cur.join(" ")); cur = []; lastY = null; }
              });
              if (cur.length) lines.push(cur.join(" "));
              return lines.join("\n");
            });
          }));
          return Promise.all(pages).then(function (arr) { return arr.join("\n"); });
        });
      });
    }
    if (name.endsWith(".docx")) {
      if (!window.mammoth) return Promise.reject(new Error("mammoth unavailable"));
      return f.arrayBuffer().then(function (buf) { return window.mammoth.extractRawText({ arrayBuffer: buf }).then(function (r) { return r.value; }); });
    }
    return Promise.reject(new Error("unsupported type"));
  }

  // ------------------------------------------------------------- extract flow
  function currentInputText() {
    if (activeTab === "upload") return fileText;
    if (activeTab === "paste") return $("cvText").value;
    return $("cvDescribe").value;
  }
  function refreshExtractBtn() {
    $("extractBtn").disabled = !($("consentBox").checked && currentInputText().trim().length >= 20);
  }
  $("consentBox").addEventListener("change", refreshExtractBtn);
  $("cvText").addEventListener("input", refreshExtractBtn);
  $("cvDescribe").addEventListener("input", refreshExtractBtn);

  $("extractBtn").addEventListener("click", function () {
    $("intakeErr").textContent = "";
    var text = currentInputText();
    if (!$("consentBox").checked) { $("intakeErr").textContent = "Consent is required before any processing."; return; }
    if (text.trim().length < 20) { $("intakeErr").textContent = "Please provide a CV file or text first."; return; }
    state.rawText = text;
    state.profile = window.CC_EXTRACT.extractProfile(text);
    if ($("linkedinUrl").value.trim()) { state.profile.linkedinUrl = $("linkedinUrl").value.trim(); }
    renderProfileForm();
    show("stepProfile"); scrollTo("stepProfile");
  });

  // ------------------------------------------------------------ profile form
  var FIELD_DEFS = [
    { key: "name", label: "Name", type: "text" },
    { key: "headline", label: "Suggested headline", type: "text", full: true },
    { key: "currentTitle", label: "Current job title", type: "text" },
    { key: "currentEmployer", label: "Current employer", type: "text" },
    { key: "currentLocation", label: "Current location", type: "text" },
    { key: "totalExperienceYears", label: "Total experience (years)", type: "number" },
    { key: "seniority", label: "Seniority assessment", type: "seniority" },
    { key: "industries", label: "Industries (comma-separated)", type: "list", full: true },
    { key: "roleFamilies", label: "Role families (comma-separated)", type: "list", full: true },
    { key: "skills", label: "Skills (comma-separated)", type: "list", full: true },
    { key: "qualifications", label: "Qualifications (comma-separated)", type: "list", full: true },
    { key: "languages", label: "Languages (comma-separated)", type: "list" },
    { key: "certifications", label: "Certifications (comma-separated)", type: "list" }
  ];

  function provChip(field) {
    var p = (state.profile.provenance || {})[field];
    if (!p) return "";
    return ' <span class="prov ' + p + '">' + PROV_LABEL[p] + "</span>";
  }

  function renderProfileForm() {
    var p = state.profile;
    $("profileForm").innerHTML = '<div class="pf-grid">' + FIELD_DEFS.map(function (fd) {
      var v = p[fd.key];
      var input;
      if (fd.type === "seniority") {
        var opts = ["", "entry", "early", "mid", "senior", "executive"].map(function (o) {
          return '<option value="' + o + '"' + (v === o ? " selected" : "") + '>' + (o ? o[0].toUpperCase() + o.slice(1) : "Not assessed") + "</option>";
        }).join("");
        input = '<select data-field="' + fd.key + '">' + opts + "</select>";
      } else if (fd.type === "list") {
        input = '<input type="text" data-field="' + fd.key + '" value="' + esc((v || []).join(", ")) + '">';
      } else {
        input = '<input type="' + fd.type + '" data-field="' + fd.key + '" value="' + esc(v == null ? "" : v) + '">';
      }
      return '<label class="fld' + (fd.full ? " full" : "") + '"><span>' + fd.label + provChip(fd.key) + "</span>" + input + "</label>";
    }).join("") + "</div>";
    $("missingList").innerHTML = (p.missingOrUncertain || []).map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") || "<li>Nothing flagged.</li>";
    syncCountrySelect();
  }

  $("countrySelect").addEventListener("change", function () { state.country = this.value; renderCountries(); });
  $("backToIntake").addEventListener("click", function () { scrollTo("stepIntake"); });

  $("confirmBtn").addEventListener("click", function () {
    var p = state.profile, prov = p.provenance || {};
    Array.prototype.forEach.call(document.querySelectorAll("#profileForm [data-field]"), function (el) {
      var key = el.getAttribute("data-field"), raw = el.value;
      var val;
      if (el.tagName === "SELECT") val = raw || null;
      else if (el.type === "number") val = raw === "" ? null : Number(raw);
      else if (FIELD_DEFS.filter(function (f) { return f.key === key; })[0].type === "list") val = raw.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      else val = raw.trim() || null;
      var before = JSON.stringify(p[key] || null), after = JSON.stringify(val);
      if (before !== after) { p[key] = val; prov[key] = "user_provided"; }
    });
    p.provenance = prov;
    state.country = $("countrySelect").value;
    try {
      localStorage.setItem("cc_profile", JSON.stringify(p));
      localStorage.setItem("cc_country", state.country);
      localStorage.setItem("cc_consent", JSON.stringify({ types: ["cv_processing", "profile_storage"], version: "2026-11-17", at: new Date().toISOString(), mode: state.mode }));
    } catch (e) { /* storage unavailable — session continues in memory */ }
    state.report = window.CC_REPORT.generateReport(p, state.country, FIRMS, META);
    renderSummary();
    show("stepSummary"); hide("stepReport");
    $("gateBox").style.display = "";
    resetGate();
    scrollTo("stepSummary");
  });

  // ------------------------------------------------------------------ summary
  function sampleTag() {
    return state.mode === "sample" ? '<p class="limit">Illustrative sample candidate — not a real person. This sample uses the hypothetical candidate from the product specification.</p>' : "";
  }

  function renderSummary() {
    var r = state.report, p = state.profile, m = r.modules;
    var countryName = (META.countries[r.country_code] || {}).name || r.country_code;
    var html = sampleTag();
    html += '<p class="note">Report for <strong>' + esc(countryName) + '</strong> · Profile: ' + esc(p.headline || "—") +
      ' · Dataset version ' + esc(r.dataset_version) + ' · Generated ' + new Date(r.generated_at).toLocaleString() + "</p>";
    html += '<div class="sum-grid">';
    html += sumCard("Module 1 — Recruitment firms", m.firms.returned, m.firms.items.map(function (f) { return f.name; }).join(" · ") || "No matching firms", m.firms.shortfall_note);
    html += sumCard("Module 2 — Target employers", m.employers.strategic_fit.length + m.employers.verified_vacancies.length, "No verified employer dataset yet — no employers are named rather than invented.", null);
    html += sumCard("Module 3 — Priority skills", m.skills.returned, m.skills.items.map(function (s) { return s.name; }).join(" · "), m.skills.shortfall_note);
    html += sumCard("Module 4 — Training", m.training.returned, "Per-skill resolutions only — no unverified courses, fees or intakes are shown.", null);
    html += sumCard("Module 5 — Locations", m.locations.returned, esc(m.locations.location_type_label) + (m.locations.items[0] ? " · Top: " + esc(m.locations.items[0].name) : ""), m.locations.shortfall_note);
    html += sumCard("Action plan", r.action_plan.d30.length + r.action_plan.d60.length + r.action_plan.d90.length, "30-60-90-day tasks linked to the firms, skills and locations in this report.", null);
    html += "</div>";
    html += '<p class="note" style="margin-top:14px">Scores in the full report are <strong>suitability assessments</strong> against stated criteria, with the full breakdown shown. They are not, and never imply, a probability of receiving an offer.</p>';
    $("summaryBody").innerHTML = html;
  }
  function sumCard(title, count, body, shortfall) {
    return '<div class="sum-mod"><h4>' + esc(title) + '</h4><span class="cnt">' + count + '</span><p>' + body + "</p>" +
      (shortfall ? '<p style="color:#8c2f2f">' + esc(shortfall) + "</p>" : "") + "</div>";
  }

  // ------------------------------------------------- email verification (OTP)
  /* Codes are issued and checked directly by Deesha Global's Supabase
     project "deesha-global-otp" — the same service and pattern as the
     Relocation Assessment (pathway-check). The key below is the project's
     public (publishable) key, designed to be embedded in web pages. The
     session returned on success is used only to open the full report in
     this page — it is not stored. If the service cannot be reached, the
     gate says so plainly and directs the reader to
     info@deesha-global.com. Success is never simulated. */
  var CC_OTP = {
    enabled: true,
    serviceUrl: "https://zeiymverdeoxxziwejuz.supabase.co",
    publicKey: "sb_publishable_6CvkX7OUOPkifwLVTTtt5Q_cT5-5ffa",
    codeLength: 6,
    resendSeconds: 60,
    otpExpirySeconds: 3600
  };
  var OTP_UNAVAILABLE = "Email verification is temporarily unavailable, and we are not able to open the full report online at the moment. Please write to info@deesha-global.com and we will send your full report to you personally.";
  var GATE = { state: "idle", email: "", sentAt: 0, resendTimer: null, resendLeft: 0 };

  function otpConfigured() {
    return !!(CC_OTP.enabled && CC_OTP.serviceUrl && CC_OTP.publicKey);
  }
  function otpHeaders() {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "apikey": CC_OTP.publicKey,
      "Authorization": "Bearer " + CC_OTP.publicKey
    };
  }
  /* Supabase reports a wrong code and a lapsed code the same way (an
     "otp_expired" refusal). While the code we sent is still inside its
     validity window, a refusal can only mean the digits did not match,
     so the two states are told apart by timing. */
  function isExpiredError(res) {
    var tag = String((res && (res.error_code || res.code)) || "");
    var text = String((res && (res.msg || res.message || res.error_description || res.error)) || "");
    return /otp_expired/.test(tag) || /expired/i.test(text);
  }
  function codeStillFresh() {
    return !!GATE.sentAt && (Date.now() - GATE.sentAt) < (CC_OTP.otpExpirySeconds * 1000) - 30000;
  }
  function gateErr(t) { $("gateErr").textContent = t; }
  function gateMsg(t) { $("gateMsg").textContent = t; }

  function startResendCountdown() {
    GATE.resendLeft = CC_OTP.resendSeconds;
    var btn = $("resendBtn"), note = $("resendNote");
    btn.disabled = true;
    if (GATE.resendTimer) clearInterval(GATE.resendTimer);
    var tick = function () {
      if (GATE.resendLeft <= 0) {
        clearInterval(GATE.resendTimer); GATE.resendTimer = null;
        btn.disabled = false; note.textContent = "";
        return;
      }
      note.textContent = "You may request a new code in " + GATE.resendLeft + " seconds.";
      GATE.resendLeft--;
    };
    tick();
    GATE.resendTimer = setInterval(tick, 1000);
  }

  function resetGate() {
    GATE.state = "idle"; GATE.email = ""; GATE.sentAt = 0; GATE.resendLeft = 0;
    if (GATE.resendTimer) { clearInterval(GATE.resendTimer); GATE.resendTimer = null; }
    hide("otpArea"); hide("gateDone"); show("gateForm");
    gateErr(""); gateMsg(""); $("resendNote").textContent = "";
    var sb = $("sendCodeBtn"); sb.disabled = false; sb.textContent = "Send my code";
    var vb = $("verifyBtn"); vb.disabled = false; vb.textContent = "Verify & unlock →";
    var rb = $("resendBtn"); rb.disabled = true;
  }

  function sendCode() {
    var email = $("gateEmail").value.trim();
    gateErr("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { gateErr("Please enter a valid email address."); return; }
    if (!otpConfigured()) {
      GATE.state = "unavailable";
      gateErr(OTP_UNAVAILABLE);
      return;
    }
    var btn = $("sendCodeBtn");
    btn.disabled = true; btn.textContent = "Sending…";
    gateMsg("Sending your code…");
    GATE.state = "sending";
    fetch(CC_OTP.serviceUrl + "/auth/v1/otp", {
      method: "POST", headers: otpHeaders(),
      body: JSON.stringify({ email: email, create_user: true })
    })
      .then(function (r) {
        btn.disabled = false; btn.textContent = "Send my code";
        if (r.ok) {
          GATE.state = "sent";
          GATE.sentAt = Date.now();
          GATE.email = email;
          gateErr("");
          show("otpArea");
          gateMsg("We have sent a six-digit code to " + email + ". Codes remain valid for a short period only, so please enter it promptly.");
          startResendCountdown();
          $("otpInput").focus();
        } else if (r.status >= 500) {
          GATE.state = "unavailable";
          gateMsg("");
          gateErr(OTP_UNAVAILABLE);
        } else {
          GATE.state = "idle";
          gateMsg("");
          gateErr("We could not send a code to that address just now. Please check the address and try again — or write to us at info@deesha-global.com and we will help directly.");
        }
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = "Send my code";
        GATE.state = "unavailable";
        gateMsg("");
        gateErr(OTP_UNAVAILABLE);
      });
  }
  $("sendCodeBtn").addEventListener("click", sendCode);
  $("resendBtn").addEventListener("click", function () {
    if (GATE.resendLeft > 0) return;
    sendCode();
  });

  $("verifyBtn").addEventListener("click", function () {
    var email = $("gateEmail").value.trim();
    var code = $("otpInput").value.replace(/\D/g, "");
    gateErr("");
    if (GATE.state !== "sent") { gateErr("Request a code first."); return; }
    if (code.length !== CC_OTP.codeLength) { gateErr("Please enter the six-digit code in full."); return; }
    if (!otpConfigured()) { gateErr(OTP_UNAVAILABLE); return; }
    var btn = $("verifyBtn");
    btn.disabled = true; btn.textContent = "Checking…";
    gateMsg("Checking your code…");
    GATE.state = "verifying";
    fetch(CC_OTP.serviceUrl + "/auth/v1/verify", {
      method: "POST", headers: otpHeaders(),
      body: JSON.stringify({ email: email, token: code, type: "email" })
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (res) {
          return { status: r.status, ok: r.ok, res: res || {} };
        });
      })
      .then(function (out) {
        btn.disabled = false; btn.textContent = "Verify & unlock →";
        if (out.ok && out.res.access_token) {
          GATE.state = "verified";
          state.unlockedEmail = email;
          state.report.status = "full";
          try { sessionStorage.setItem("cc_unlocked", state.unlockedEmail); } catch (e) {}
          hide("gateForm");
          $("gateDone").innerHTML = "<h3>Full report unlocked ✓</h3><p>Verified for " + esc(state.unlockedEmail) + ". Your full report is below.</p>";
          show("gateDone");
          renderReport();
          show("stepReport");
          scrollTo("stepReport");
        } else if (out.status >= 500) {
          GATE.state = "sent";
          gateMsg("");
          gateErr(OTP_UNAVAILABLE);
        } else if (isExpiredError(out.res) && !codeStillFresh()) {
          GATE.state = "sent";
          gateMsg("");
          gateErr("That code has expired. Please request a new code, and enter it promptly when it arrives.");
        } else {
          GATE.state = "sent";
          gateMsg("");
          gateErr("That code does not match the one we sent. Please check the digits and try again.");
        }
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = "Verify & unlock →";
        GATE.state = "sent";
        gateMsg("");
        gateErr(OTP_UNAVAILABLE);
      });
  });

  // ------------------------------------------------------------- full report
  function stateLabel(ds, verifiedAt) {
    var map = { live_verified: "Live-verified", cached: "Cached", historical: "Historical", ai_inferred: "AI-inferred" };
    return (map[ds] || ds) + (verifiedAt ? " · checked " + verifiedAt : "");
  }
  function scoreBlock(score, basisNote) {
    return '<div class="score"><div class="num">' + score + '</div><div class="cap">Suitability score</div></div>';
  }
  function breakdownTable(bd) {
    var rows = bd.map(function (b) {
      return "<tr><td>" + esc(b.criterion) + "</td><td>" + Math.round(b.weight * 100) + "%</td><td>" + b.score + "</td><td>" + esc(b.note) + "</td></tr>";
    }).join("");
    return '<details class="breakdown"><summary>How this score was assessed (indicative weights — an assessment of fit, not a probability of an offer)</summary>' +
      '<table class="break"><tr><th>Criterion</th><th>Weight</th><th>Score</th><th>Basis</th></tr>' + rows + "</table></details>";
  }
  function sourcesHtml(sources, verifiedAt) {
    if (!sources || !sources.length) return "";
    return '<div class="srcs">Sources: ' + sources.map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.url) + "</a>"; }).join(" · ") + (verifiedAt ? " · Verified " + esc(verifiedAt) : "") + "</div>";
  }
  function savedSet() {
    try { return new Set(JSON.parse(localStorage.getItem("cc_saved") || "[]")); } catch (e) { return new Set(); }
  }
  function saveBtn(entityId, name) {
    var on = savedSet().has(entityId);
    return '<button class="save-btn' + (on ? " saved" : "") + '" data-save="' + esc(entityId) + '">' + (on ? "★ Saved" : "☆ Save") + "</button>";
  }

  function renderReport() {
    var r = state.report, m = r.modules, p = r.profile;
    var countryName = (META.countries[r.country_code] || {}).name || r.country_code;
    var h = sampleTag();
    h += '<p class="note">Country: <strong>' + esc(countryName) + '</strong> · Dataset version ' + esc(r.dataset_version) +
      ' · Generated ' + new Date(r.generated_at).toLocaleString() + ' · Profile: ' + esc(p.headline || "—") + "</p>";

    // Module 1 — firms
    h += '<section class="mod"><h3>Module 1 — Top recruitment firms</h3>' +
      '<p class="mod-sub">Matched only from Deesha Global\'s verified firm dataset (' + (META.counts[r.country_code] || 0) + ' firms for ' + esc(countryName) + ', each checked against its own official website on 2026-11-16). CareerCompass never contacts a firm on your behalf.</p>';
    if (m.firms.shortfall_note) h += '<div class="shortfall">' + esc(m.firms.shortfall_note) + "</div>";
    m.firms.items.forEach(function (f) {
      h += '<article class="item"><div class="item-head"><div><span class="item-name">' + f.rank + ". " + esc(f.name) + '</span> ' +
        '<span class="conf ' + f.confidence + '">' + f.confidence + ' confidence</span><div class="meta-line">' +
        esc(stateLabel(f.data_state, f.verified_at)) + (f.offices ? " · Offices: " + esc(f.offices.join("; ")) : "") + "</div></div>" +
        '<div>' + scoreBlock(f.suitability_score) + saveBtn(f.entity_id, f.name) + "</div></div>" +
        (f.specialisations ? '<div>' + f.specialisations.slice(0, 6).map(function (s) { return '<span class="tag">' + esc(s) + "</span>"; }).join("") + "</div>" : "") +
        '<p class="rationale"><strong>Why this firm:</strong> ' + esc(f.rationale) + "</p>" +
        (f.seniority_focus ? '<p class="meta-line">Seniority focus (per the firm): ' + esc(f.seniority_focus.join(", ")) + "</p>" : "") +
        (f.licensing_note ? '<p class="meta-line">Licensing: ' + esc(f.licensing_note) + "</p>" : "") +
        (f.limitations ? '<div class="limit">' + esc(f.limitations) + "</div>" : "") +
        '<p style="margin:10px 0 0"><a href="' + esc(f.website) + '" target="_blank" rel="noopener">Visit firm ↗</a>' +
        (f.registration_url ? ' · <a href="' + esc(f.registration_url) + '" target="_blank" rel="noopener">Candidate registration / contact page ↗</a>' : "") + "</p>" +
        sourcesHtml(f.sources, f.verified_at) + breakdownTable(f.score_breakdown) + "</article>";
    });
    h += "</section>";

    // Module 2 — employers (honest empty)
    h += '<section class="mod"><h3>Module 2 — Top target employers</h3>' +
      '<p class="mod-sub">Two groups, always kept separate: strategic-fit employers, and employers with verified active vacancies.</p>' +
      '<h4>Strategic fit</h4><div class="empty-note">' + esc(m.employers.note) + '</div>' +
      '<h4 style="margin-top:16px">Employers with verified active vacancies</h4>' +
      '<div class="empty-note">None are shown. There are no verified vacancy records yet, and CareerCompass never states or implies that a company is hiring without one.</div></section>';

    // Module 3 — skills
    h += '<section class="mod"><h3>Module 3 — Five priority skills</h3>' +
      '<p class="mod-sub">Gaps between your confirmed profile and the demand evidenced in the verified firm dataset for ' + esc(countryName) + '.</p>';
    if (m.skills.shortfall_note) h += '<div class="shortfall">' + esc(m.skills.shortfall_note) + "</div>";
    m.skills.items.forEach(function (s) {
      var classLabel = { not_possessed: "Not evidenced in your profile", possessed_but_not_demonstrated: "Possessed, but not demonstrated", experience_valued_over_certification: "Experience valued over certification", requires_formal_certification: "Requires formal certification" }[s.classification] || s.classification;
      h += '<article class="item"><div class="item-head"><span class="item-name">' + s.rank + ". " + esc(s.name) + '</span><span class="tag">' + esc(s.category) + '</span></div>' +
        '<p class="meta-line">Classification: <strong>' + esc(classLabel) + '</strong> · ' + esc(stateLabel(s.data_state, null)) + "</p>" +
        '<p class="rationale"><strong>Why it matters here:</strong> ' + esc(s.why_it_matters) + "</p>" +
        '<p><strong>The gap:</strong> ' + esc(s.gap) + '<br><strong>Target:</strong> ' + esc(s.target_proficiency) + "</p>" +
        '<p><strong>Roadmap:</strong></p><ul>' + s.roadmap.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        (s.limitations ? '<div class="limit">' + esc(s.limitations) + "</div>" : "") + sourcesHtml(s.sources, null) + "</article>";
    });
    h += "</section>";

    // Module 4 — training
    h += '<section class="mod"><h3>Module 4 — Training organisations &amp; courses</h3>';
    if (m.training.shortfall_note) h += '<div class="shortfall">' + esc(m.training.shortfall_note) + "</div>";
    m.training.items.forEach(function (t) {
      h += '<article class="item"><span class="item-name">' + esc(t.skill) + '</span>' +
        (t.resolution === "experience_valued"
          ? '<p class="rationale"><strong>No course recommended.</strong> ' + esc(t.note) + "</p>"
          : '<p class="rationale">' + esc(t.note) + '</p><p class="meta-line">Fees: <strong>requires verification</strong> · Duration: <strong>requires verification</strong> · Next intake: <strong>requires verification</strong> · Accreditation: <strong>requires verification</strong></p>') +
        "</article>";
    });
    h += "</section>";

    // Module 5 — locations
    h += '<section class="mod"><h3>Module 5 — ' + esc(m.locations.location_type_label) + '</h3>';
    if (r.country_code === "SG") h += sgMap(m.locations.items);
    if (m.locations.shortfall_note) h += '<div class="shortfall">' + esc(m.locations.shortfall_note) + "</div>";
    m.locations.items.forEach(function (l) {
      h += '<article class="item"><div class="item-head"><div><span class="item-name">' + l.rank + ". " + esc(l.name) + '</span> <span class="conf ' + l.confidence + '">' + l.confidence + ' confidence</span>' +
        '<div class="meta-line">' + esc(l.kind || l.location_type) + " · " + esc(stateLabel(l.data_state, null)) + "</div></div>" + scoreBlock(l.suitability_score) + "</div>" +
        '<p class="rationale">' + esc(l.rationale) + "</p>" +
        (l.cross_references && l.cross_references.length ? '<p class="meta-line">Cross-referenced firms from Module 1: ' + esc(l.cross_references.join(", ")) + "</p>" : "") +
        (l.offices_from_dataset && l.offices_from_dataset.length ? '<p class="meta-line">Matched firms with an office recorded here in the verified dataset: ' + esc(l.offices_from_dataset.join(", ")) + "</p>" : "") +
        '<p class="meta-line">Salary indicator: <strong>not shown — no verified figure in the dataset</strong> · Cost-of-living indicator: <strong>not shown — no verified figure in the dataset</strong></p>' +
        (l.limitations ? '<div class="limit">' + esc(l.limitations) + "</div>" : "") + "</article>";
    });
    h += "</section>";

    // Eligibility
    h += '<section class="mod"><h3>Eligibility &amp; practical constraints — guidance</h3><div class="elig">';
    r.eligibility.notes.forEach(function (n) {
      h += "<p><strong>" + esc(n.topic.replace(/_/g, " ")) + ":</strong> " + esc(n.text) + ' <a href="' + esc(n.source) + '" target="_blank" rel="noopener">Official source ↗</a></p>';
    });
    h += '<p class="meta-line">' + esc(stateLabel(r.eligibility.data_state, r.eligibility.verified_at)) + '</p>' +
      '<p class="disclaimer">' + esc(r.eligibility.disclaimer) + "</p></div></section>";

    // Action plan
    h += '<section class="mod"><h3>Your 30-60-90-day action plan</h3><p class="mod-sub">Every task is linked to a firm, skill or location from this report. The plan never guarantees interviews or offers — it sequences the work.</p>';
    [["d30", "Days 1–30 — Get in front of the market"], ["d60", "Days 31–60 — Build and apply"], ["d90", "Days 61–90 — Follow up and refine"]].forEach(function (ph) {
      var tasks = r.action_plan[ph[0]];
      if (!tasks.length) return;
      h += '<div class="plan-phase"><h4>' + ph[1] + "</h4>" + tasks.map(function (t, i) {
        var key = r.report_id + ":" + ph[0] + ":" + i;
        var st = "todo";
        try { st = localStorage.getItem("cc_task:" + key) || "todo"; } catch (e) {}
        return '<div class="task"><span class="prio">' + esc(t.priority) + '</span><div><p>' + esc(t.task) + '</p>' +
          '<p class="outcome">Expected outcome: ' + esc(t.expected_outcome) + (t.linked_recommendation ? ' · Linked: ' + esc(t.linked_recommendation) : "") + '</p></div>' +
          '<select data-task="' + esc(key) + '"><option value="todo"' + (st === "todo" ? " selected" : "") + '>To do</option><option value="done"' + (st === "done" ? " selected" : "") + '>Done</option><option value="skipped"' + (st === "skipped" ? " selected" : "") + '>Skipped</option></select></div>';
      }).join("") + "</div>";
    });
    h += "</section>";

    $("reportBody").innerHTML = h;

    Array.prototype.forEach.call(document.querySelectorAll("[data-save]"), function (b) {
      b.addEventListener("click", function () {
        var set = savedSet(), id = b.getAttribute("data-save");
        if (set.has(id)) set.delete(id); else set.add(id);
        try { localStorage.setItem("cc_saved", JSON.stringify(Array.from(set))); } catch (e) {}
        b.classList.toggle("saved", set.has(id));
        b.textContent = set.has(id) ? "★ Saved" : "☆ Save";
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-task]"), function (sel) {
      sel.addEventListener("change", function () {
        try { localStorage.setItem("cc_task:" + sel.getAttribute("data-task"), sel.value); } catch (e) {}
      });
    });
  }

  // Schematic Singapore cluster map (not to scale; positions are indicative)
  function sgMap(items) {
    var pos = {
      "Jurong East": [70, 150], "one-north / Fusionopolis": [165, 165],
      "Raffles Place & Marina Bay": [265, 195], "Tampines": [385, 95], "Changi Business Park": [445, 80]
    };
    var dots = items.map(function (l) {
      var xy = pos[l.name] || [250, 140];
      return '<g><circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="17" fill="#0b3b36" stroke="#c9a227" stroke-width="2.5"/>' +
        '<text x="' + xy[0] + '" y="' + (xy[1] + 5) + '" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">' + l.suitability_score + "</text>" +
        '<text x="' + xy[0] + '" y="' + (xy[1] + 34) + '" text-anchor="middle" font-size="11.5" fill="#14201c" font-weight="600">' + esc(l.name) + "</text></g>";
    }).join("");
    return '<div class="mapbox"><svg viewBox="0 0 520 250" width="100%" role="img" aria-label="Schematic map of Singapore employment clusters">' +
      '<path d="M30,150 Q90,95 200,105 Q320,60 430,70 Q500,80 495,120 Q480,165 380,180 Q260,215 150,205 Q60,195 30,150 Z" fill="#e8eef4" stroke="#b9c9d8"/>' + dots + "</svg>" +
      '<div class="cap">Schematic map — cluster positions are indicative, not to scale. Numbers are suitability scores.</div></div>';
  }

  // ------------------------------------------------------------------ sample
  $("navSample").addEventListener("click", function () {
    state.mode = "sample";
    show("sampleBanner");
    document.querySelector('.tab[data-tab="paste"]').click();
    $("cvText").value = window.CC_SAMPLE.FIXTURE_TEXT;
    $("cvText").readOnly = true;
    $("consentBox").checked = false;
    refreshExtractBtn();
    scrollTo("stepIntake");
  });

  // ------------------------------------------------------------------ misc
  $("printBtn").addEventListener("click", function () { window.print(); });
  $("restartBtn").addEventListener("click", function () { window.location.reload(); });
  function deleteMyData() {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf("cc_") === 0) keys.push(k); }
    keys.forEach(function (k) { localStorage.removeItem(k); });
    try { sessionStorage.removeItem("cc_unlocked"); } catch (e) {}
    state.profile = null; state.report = null; state.unlockedEmail = null;
    hide("stepProfile"); hide("stepSummary"); hide("stepReport");
    scrollTo("stepIntake");
    $("intakeErr").textContent = "";
    alert("Your CareerCompass data held in this browser (profile, consent record, saved items and task states) has been deleted. Your confirmed profile is kept only in this browser — it is not held on Deesha Global's servers — so this deletion is complete.");
  }
  $("navDelete").addEventListener("click", deleteMyData);

  // -------------------------------------------------------------------- init
  $("dsVersion").textContent = META.dataset_version || "—";
  renderCountries();
  refreshExtractBtn();
})();
