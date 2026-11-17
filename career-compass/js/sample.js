/*
 * CareerCompass — sample report fixture (docs/05-SAMPLE-REPORT-SPEC.md).
 *
 * The ONLY candidate used by the sample path is the master prompt's
 * hypothetical candidate: MBA, 12 years, banking operations & payments,
 * plus compliance and digital transformation exposure, team-management
 * responsibilities, targeting senior management roles in Singapore.
 * No real person's data is used anywhere in this file (DECISIONS.md #7).
 *
 * The fixture text is deliberately written so the real extractor reproduces
 * exactly these attributes and no others: it names no employer, no dates,
 * no certification and no location — those must surface as "missing".
 */
(function (global) {
  "use strict";

  var SAMPLE_LABEL = "Illustrative sample candidate — not a real person";

  var FIXTURE_TEXT = [
    "Illustrative sample candidate — not a real person.",
    "",
    "Profile summary",
    "MBA-qualified professional with 12 years of experience in banking operations and payments. Responsibilities have included compliance work within banking operations and digital transformation programmes in payments operations. Has held team-management responsibilities, including leading a small team of operations staff. Now seeking senior management opportunities in banking operations and payments.",
    "",
    "Core experience",
    "Banking operations; payments operations; compliance; digital transformation; team management."
  ].join("\n");

  var api = { SAMPLE_LABEL: SAMPLE_LABEL, FIXTURE_TEXT: FIXTURE_TEXT };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.CC_SAMPLE = api;
})(typeof window !== "undefined" ? window : globalThis);
