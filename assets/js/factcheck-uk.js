/* ============================================================
   Deesha Global — Admission Fact Check (United Kingdom)
   All data transcribed from official university sources only
   (university admissions/course/fee pages, UCAS, gov.uk).
   Compiled 3 November 2026 from ~/workspace/deesha-factcheck/uk-data.md.
   Where an official source publishes no figure, the text says so —
   nothing is estimated or filled in. Fees marked fee: 0 have NO
   officially published figure (see that stream's feeNote) and must
   be excluded from any average. Extra fields (feesNote, feeNote,
   holistic) carry caveats the integrator may render.
   ============================================================ */
window.FC_DATA = window.FC_DATA || {};
window.FC_DATA.uk = { rate: 127.08, cur: "GBP", curSymbol: "£", unis: [

/* ================= 1. University of Oxford ================= */
{
  name: "University of Oxford",
  short: "Oxford",
  link: "https://www.ox.ac.uk/admissions/undergraduate",
  living: 15570,
  livingNote: "Oxford’s own estimate: £1,425–£2,035 per month (2025–26), budgeted over 9 months = £12,825–£18,315 a year. Figure used is the midpoint of that published range.",
  english: "Oxford applies its HIGHER level to ALL undergraduate courses: IELTS Academic 7.5 overall with at least 7.0 in each component; TOEFL iBT 110 (Listening 22, Reading 24, Speaking 25, Writing 24); PTE Academic 76 with at least 66 in each component; Cambridge C1 Advanced / C2 Proficiency 191 with at least 185 in each component. Evidence must be shown by 31 July in the year of the offer. Oxford does NOT publish a CBSE/ISC English exemption — an Indian applicant whose first language is not English should plan to sit one of these tests.",
  scholarships: "Reach Oxford Scholarship — open to Indian nationals (India is explicitly on the eligible-country list): course fees, a grant for living costs and one return air fare per year for 3–4 years; for candidates of the highest academic ability with financial need and social commitment — NO numeric minimum is published; all subjects EXCEPT Medicine; you must hold an Oxford offer first, then apply (2027-entry deadline 26 January 2027); only about 2–3 awards a year. Simon and June Li Undergraduate Scholarship — for students ordinarily resident in India, Social Sciences Division courses only (covers Economics and Management and PPE; not Medicine or Computer Science): course fees plus a living-cost grant, on academic merit and financial need, no numeric minimum published; one award for 2027 entry. GREAT Scholarships are not open to undergraduates; Felix and Weidenfeld-Hoffmann are postgraduate only.",
  feesNote: "Fees shown are 2025–26 Overseas annual fees. Oxford charges ONE combined course fee that already includes the college fee. The overall Overseas range for 2026–27 is £37,380–£62,820. Oxford publishes its Indian requirement by A-level grade band, not course by course (2026 entry table).",
  holistic: "One UCAS personal statement and an academic reference are used in selection, alongside predicted/achieved grades and any required test. Shortlisted candidates are interviewed in December. For the five courses below, no written work is required (2026 entry). There is no published extracurricular requirement.",
  streams: [
    { n: "Economics and Management (BA)", fee: 38550, req: {
      cbse: "A*AA band (2026 entry): CBSE A1 A1 A1 A2 A2, with A1 in Mathematics. Admissions test: TSA Section 1 for 2026 entry; TARA for 2027 entry.",
      icse: "A*AA band (2026 entry): at least 90% overall, at least 95% in three subjects including Mathematics, at least 85% in the other two. Admissions test: TSA Section 1 for 2026 entry; TARA for 2027 entry.",
      ib: "39 points including 766 at Higher Level; Mathematics must have been studied to A-Level (A*/A) or HL (score 6 or 7). Admissions test: TSA Section 1 for 2026 entry; TARA for 2027 entry.",
      al: "A*AA, including Mathematics at grade A or A*. Admissions test: TSA Section 1 for 2026 entry; TARA for 2027 entry."
    } },
    { n: "Law (Jurisprudence) (BA)", fee: 38550, req: {
      cbse: "AAA band: Oxford’s separate AAA-band CBSE pattern is NOT published on official source as retrieved — CBSE is an accepted board (state boards and NIOS are NOT accepted), but check the live Oxford international-qualifications page before relying on a pattern. Admissions test: LNAT required.",
      icse: "AAA band: Oxford’s separate AAA-band CISCE pattern is NOT published on official source as retrieved — CISCE/ISC is an accepted board, but check the live Oxford international-qualifications page. Admissions test: LNAT required.",
      ib: "38 points (including core points) with 666 at Higher Level. Admissions test: LNAT required.",
      al: "AAA; no specific subject required (an essay-writing subject is helpful). Admissions test: LNAT required in both 2026 and 2027 entry."
    } },
    { n: "Medicine (BM BCh)", fee: 43670, feeNote: "Pre-clinical rate, years 1–3 (2025–26). Clinical years 4–6 are charged at the top of the Overseas range — £59,260 in 2025–26. Six-year course.", req: {
      cbse: "A*AA band (2026 entry): A1 A1 A1 A2 A2, with A1 in Chemistry and in the second required science/Mathematics subject. Admissions test: UCAT required; no official UCAT cut-off is published. NEET is NOT an Oxford entry qualification. Applicants must be 18 by 1 November in the year of entry.",
      icse: "A*AA band (2026 entry): at least 90% overall, at least 95% in three subjects including Chemistry and the second required subject, at least 85% in the other two. Admissions test: UCAT required; no published cut-off. NEET is not an entry qualification.",
      ib: "39 points (including core points) with 766 at Higher Level, including Chemistry at HL and at least one of Biology, Physics or Mathematics at HL. Admissions test: UCAT required.",
      al: "A*AA (excluding Critical Thinking and Thinking Skills), with Chemistry at grade A or above AND at least one of Biology, Physics, Mathematics or Further Mathematics at grade A or above. Admissions test: UCAT required."
    } },
    { n: "Computer Science (BA / MCompSci)", fee: 48620, req: {
      cbse: "A*AA band (2026 entry): A1 A1 A1 A2 A2, with A1 in Mathematics. Admissions test: MAT for 2026 entry; TMUA for 2027 entry (MAT is retired).",
      icse: "A*AA band (2026 entry): at least 90% overall, at least 95% in three subjects including Mathematics, at least 85% in the other two. Admissions test: MAT for 2026 entry; TMUA for 2027 entry.",
      ib: "39 points (including core points) with 766 at Higher Level, the 7 in Mathematics (either HL Mathematics course accepted). Admissions test: MAT for 2026 entry; TMUA for 2027 entry.",
      al: "A*AA, including Mathematics, with the A* in Mathematics, Further Mathematics or Computer Science (Further Mathematics highly recommended). Admissions test: MAT for 2026 entry; TMUA for 2027 entry."
    } },
    { n: "Philosophy, Politics and Economics — PPE (BA)", fee: 38550, req: {
      cbse: "AAA band: Oxford’s separate AAA-band CBSE pattern is NOT published on official source as retrieved — CBSE is an accepted board (state boards and NIOS are not); check the live Oxford international-qualifications page. Admissions test: TSA for 2026 entry; TARA for 2027 entry.",
      icse: "AAA band: Oxford’s separate AAA-band CISCE pattern is NOT published on official source as retrieved; check the live Oxford international-qualifications page. Admissions test: TSA for 2026 entry; TARA for 2027 entry.",
      ib: "39 points (including core points) with 766 at Higher Level. Admissions test: TSA for 2026 entry; TARA for 2027 entry.",
      al: "AAA; no required subjects (Mathematics recommended, History helpful, neither essential). Admissions test: TSA for 2026 entry; TARA for 2027 entry."
    } }
  ]
},

/* ================= 2. University of Cambridge ================= */
{
  name: "University of Cambridge",
  short: "Cambridge",
  link: "https://www.undergraduate.study.cam.ac.uk",
  living: 15660,
  livingNote: "Cambridge’s own estimate: £1,305 per month (2026–27) — £11,745 if in Cambridge for term time only (about 9 months), or £15,660 if there all year round (12 months). Figure used is the year-round overseas-student figure, £15,660.",
  english: "Cambridge sets NO single automatic English condition: the College that makes the offer decides, based on your qualifications, assessments and interview. Guide standard: a good C1 (CEFR) level in all four skills — IELTS Academic normally 7.5 overall, usually with 7.0 or above in each element; Cambridge C2 Proficiency 200 with no element below 185; C1 Advanced 193 with no element below 185, alongside other evidence. At application, English equivalent to at least IELTS 6.5 (no element below 6.0) is recommended for interview. Cambridge publishes NO TOEFL, PTE or Duolingo score for undergraduate entry, and NO CBSE/ISC English exemption — the older wording quoting a CISCE percentage is superseded.",
  scholarships: "Cambridge Trust Undergraduate Scholarships — open to all students paying Overseas fees, including Indian nationals, in any subject: selection is on significant academic achievement and potential PLUS established financial need; NO numeric minimum is published; awards are primarily part-cost, not normally full-cost, and highly competitive. You must apply by the UCAS deadline and hold a conditional offer before applying to the Trust; outcomes are normally known in spring. Gates Cambridge Scholarships are postgraduate only. No undergraduate GREAT Scholarship for Indians is published on official source.",
  feesNote: "Fees shown = 2026–27 University tuition fee PLUS a separate College fee — unlike Oxford, Cambridge charges the College fee on top. The College fee in these figures is Trinity Hall’s £13,245 (2026–27); College fees vary by College, roughly £11,500–£14,950 a year. International fees are fixed for the duration of the course. Requirements below are the university minimum offer levels for 2027 entry (updated March 2026); individual Colleges may set higher offers.",
  holistic: "Two forms: the UCAS application by 15 October (18:00 UK) AND My Cambridge Application (deadline shortly after, with a school transcript). Pre-registration tests (ESAT, TMUA, LNAT, UCAT) must be registered for by September deadlines. Most applicants are interviewed; interviews are academic, subject-focused and in English. STEP may appear in offers for Mathematics-related courses where A-Level equivalence cannot be shown. No published extracurricular minimum.",
  streams: [
    { n: "Economics (BA Hons)", fee: 42297, req: {
      cbse: "⚠️ Economics is NOT on Cambridge’s CBSE-accepted course list (2027 entry). A CBSE applicant must instead offer A-Levels, IB, 5 or more AP Tests at Score 5 plus A1 A1 A1 A1 A1 in relevant Class XII subjects, or possibly a first undergraduate year. Admissions test: TMUA.",
      icse: "⚠️ ISC is treated as a board other than CBSE: Class XII alone is NOT a direct route for 2027 entry — further study is recommended (A-Levels, IB, or 5 APs at Score 5 plus Class XII A1 grades). Admissions test: TMUA.",
      ib: "41–42 points with 776 at Higher Level, including HL Mathematics: Analysis and Approaches (2027 entry minimum offer level). Admissions test: TMUA (pre-registration; October sitting).",
      al: "A*A*A, including Mathematics (Colleges usually require the A* in Mathematics). Admissions test: TMUA (pre-registration; October sitting)."
    } },
    { n: "Law (BA Hons)", fee: 42297, req: {
      cbse: "✅ Law IS on Cambridge’s CBSE-accepted course list (2027 entry) — but only at 20 named Colleges (Clare, Downing, Fitzwilliam, Girton, Gonville & Caius, Hughes Hall, Homerton, Jesus, Lucy Cavendish, Murray Edwards, Pembroke, Peterhouse, Queens’, Robinson, Selwyn, Sidney Sussex, St Catharine’s, St Edmund’s, Trinity Hall, Wolfson — NOT Christ’s or Trinity). Minimum offer on this route: A1 A1 A1 A1 A1 in relevant subjects. Admissions test: LNAT.",
      icse: "⚠️ ISC is treated as a board other than CBSE: Class XII alone is NOT a direct route even for Law (2027 entry) — further study is recommended (A-Levels, IB, or 5 APs at Score 5 plus Class XII A1 grades). Admissions test: LNAT.",
      ib: "41–42 points with 776 at Higher Level (2027 entry minimum offer level). Admissions test: LNAT (for 2027 entry, register by 15 September 2026 and sit by 15 October 2026).",
      al: "A*AA; no specific subjects are required by any College, and Law at A-Level is not required. Admissions test: LNAT."
    } },
    { n: "Medicine (MB, BChir)", fee: 83799, feeNote: "Group 5 tuition £70,554 (2026–27) plus College fee (Trinity Hall £13,245 shown). Six-year course — all six years must be funded; overseas Medicine places are capped.", req: {
      cbse: "⚠️ Medicine is NOT on Cambridge’s CBSE-accepted course list (2027 entry). Use A-Levels, IB, 5 APs at Score 5 plus A1 A1 A1 A1 A1 in relevant Class XII subjects, or possibly a first undergraduate year — and confirm suitability with shortlisted Colleges. Admissions test: UCAT.",
      icse: "⚠️ ISC alone is NOT a direct route (2027 entry) — further study as for CBSE. Admissions test: UCAT (pre-registration); no official UCAT cut-off is published.",
      ib: "41–42 points with 776 at Higher Level, including HL Chemistry and two other science/mathematics subjects (usually 7 in Chemistry and another science/mathematics subject). Note: most recent IB entrants achieved at least 44 points and/or 777 at HL. Admissions test: UCAT.",
      al: "A*A*A, including Chemistry and two other science or mathematics subjects (Mathematics, Biology/Human Biology, Physics, Further Mathematics) — Cambridge requires THREE science/mathematics A-Levels. Admissions test: UCAT."
    } },
    { n: "Computer Science (BA Hons / MEng)", fee: 57459, req: {
      cbse: "⚠️ Computer Science is NOT on Cambridge’s CBSE-accepted course list (2027 entry). Use A-Levels, IB, 5 APs at Score 5 plus Class XII A1 grades, or possibly a first undergraduate year. Some Colleges may also include STEP in offers where A-Level Mathematics equivalence cannot be shown. Admissions test: TMUA.",
      icse: "⚠️ ISC alone is NOT a direct route (2027 entry) — further study as for CBSE. Admissions test: TMUA.",
      ib: "41–42 points with 776 at Higher Level, including HL Mathematics: Analysis and Approaches (Applications and Interpretation is not a substitute). Colleges normally ask for 7 in HL Mathematics. Admissions test: TMUA.",
      al: "A*A*A, including Mathematics; Further Mathematics to AS or A Level is required if your school offers it. Some Colleges require a third science subject or a higher offer (e.g. Churchill: A*A*A* / IB 43 with 777). Admissions test: TMUA."
    } },
    { n: "Engineering (BA Hons / MEng)", fee: 57459, req: {
      cbse: "⚠️ Engineering is NOT on Cambridge’s CBSE-accepted course list (2027 entry). Use A-Levels, IB, 5 APs at Score 5 plus Class XII A1 grades, or possibly a first undergraduate year. A JEE (Advanced) rank may be taken into account by some Colleges (Christ’s looks for a rank under 2000) IN ADDITION — it is not a substitute qualification. Admissions test: ESAT (Mathematics 1, Mathematics 2 and Physics).",
      icse: "⚠️ ISC alone is NOT a direct route (2027 entry) — further study as for CBSE. Admissions test: ESAT (Mathematics 1, Mathematics 2 and Physics).",
      ib: "41–42 points with 776 at Higher Level, including HL Mathematics: Analysis and Approaches and HL Physics. Admissions test: ESAT.",
      al: "A*A*A, including Mathematics and Physics, and Further Mathematics to AS or A Level if your school offers it. Admissions test: ESAT (Mathematics 1, Mathematics 2 and Physics)."
    } }
  ]
},

/* ================= 3. Imperial College London ================= */
{
  name: "Imperial College London",
  short: "Imperial",
  link: "https://www.imperial.ac.uk/study/apply/undergraduate",
  living: 16717,
  livingNote: "Imperial’s own ‘average’ estimate for living in London (2026): £1,821–£1,893 per month = £16,392–£17,042 for 9 months. Figure used is the midpoint of that published range. Imperial also publishes a lower estimate (£11,375 per 9 months) and an upper estimate (£19,055 per 9 months).",
  english: "Imperial sets two levels by course. Standard (Computing): IELTS 6.5 overall, min 6.0 in all elements; TOEFL iBT 92, min 20; PTE Academic 62, min 56; Duolingo 115, min 105. Higher (Medicine, Mathematics): IELTS 7.0, min 6.5; TOEFL iBT 100, min 22; PTE 69, min 62; Duolingo 125, min 115. The English level for Mechanical Engineering and EEE is NOT published on official source as retrieved. Imperial lists Indian Class XII (CBSE & CISCE boards only) among its accepted English qualifications, but the exact English percentage required is NOT published on its official page — do not rely on third-party figures. The requirement is a condition of an offer, not needed before applying.",
  scholarships: "Imperial Inspires Scholarships — the main undergraduate route for Indians: for international students paying the Overseas fee rate on full-time undergraduate courses in the Faculty of Engineering, Faculty of Natural Sciences, Faculty of Medicine or Imperial Business School; £15,000 per year for each year of the course (at least 300 awards for 2027 entry). You must meet your course’s minimum entry requirements — NO higher numeric minimum is published; eligible students are invited to apply after applying via UCAS (undergraduate invitees complete an additional optional essay). President’s Undergraduate Scholarship: £1,000 per year for up to four years, awarded by department nomination with no application process — the official page neither restricts it to Home students nor confirms overseas eligibility (NOT FOUND). The India Future Leaders Scholarship is POSTGRADUATE only, despite its name. GREAT Scholarships: no award for Indian undergraduates is published. The Imperial Bursary is Home students only.",
  feesNote: "Fees shown are the Overseas annual fees for October 2027 entry, as published on each course page. UCAS deadline for most Imperial courses: 13 January 2027 (Medicine: 15 October 2026).",
  holistic: "Applications via UCAS with one personal statement and one reference, which Imperial’s academic tutors consider as part of their review. Interviews and tests are course-specific (see each course): Computing — TMUA and interview; Mechanical Engineering — ESAT and interview; Medicine — UCAT then Multiple Mini Interview; Mathematics — TMUA; EEE — ESAT, with a possible online interview.",
  streams: [
    { n: "Computing (BEng)", fee: 47800, req: {
      cbse: "Imperial treats CBSE and CISCE ISC together: 90% overall across five subjects, with 90% in relevant subjects (university-level standard, October 2027 entry). A Computing-specific Indian-board figure is NOT published. Admissions test: TMUA, plus interview.",
      icse: "Treated together with CBSE in Imperial’s single category: 90% overall across five subjects, with 90% in relevant subjects. A Computing-specific figure is NOT published. Admissions test: TMUA, plus interview.",
      ib: "Minimum 41 points overall, including 7 in Higher Level Mathematics and 7 in another relevant Higher Level subject (typical offers have been higher, 42–44). Admissions test: TMUA, plus interview.",
      al: "Minimum A*A*A or A*AAA, including A* in Mathematics, plus A*A in two further subjects or AAA in three further subjects. ICT, Business Studies, General Studies and Critical Thinking are not accepted. Admissions test: TMUA, plus interview."
    } },
    { n: "Mechanical Engineering (MEng)", fee: 47800, req: {
      cbse: "Imperial treats CBSE and CISCE ISC together: 90% overall across five subjects, with 90% in relevant subjects (university-level standard, October 2027 entry). A Mechanical-specific Indian-board figure is NOT published. Admissions test: ESAT (Mathematics 1, Mathematics 2 and Physics), plus interview.",
      icse: "Treated together with CBSE: 90% overall across five subjects, with 90% in relevant subjects. Admissions test: ESAT (Mathematics 1, Mathematics 2 and Physics), plus interview.",
      ib: "Minimum 40 points overall, including 6 in Higher Level Mathematics and 6 in Higher Level Physics (Analysis & Approaches preferred; Applications & Interpretation accepted at HL). Admissions test: ESAT, plus interview.",
      al: "Minimum A*A*A or A*AAA, including A* in Mathematics; A*/A in Physics (A* if offering three A-Levels, at least A if offering four); A in the third/fourth subject. Admissions test: ESAT, plus interview."
    } },
    { n: "Medicine (MBBS/BSc)", fee: 61550, feeNote: "By far Imperial’s most expensive undergraduate course (October 2027 entry). Six-year course; UCAS deadline 15 October 2026.", req: {
      cbse: "⚠️ Medicine has its OWN, higher India figure — not Imperial’s 90% standard: 91% overall, including 95% in one of Biology/Chemistry and 90% in the other, plus 90% in Mathematics or Physics. Admissions test: UCAT — for 2026 entry Imperial’s published overseas threshold was a total score of 2310 with Situational Judgement Band 3 minimum (thresholds are recalculated every year); shortlisting by UCAT, then a Multiple Mini Interview. Resit grades are NOT accepted for MBBS.",
      icse: "⚠️ The Medicine course page states the same figures for CBSE AISSCE or CISCE ISC: 91% overall, 95% in one of Biology/Chemistry and 90% in the other, plus 90% in Mathematics or Physics. Admissions test: UCAT (2026-entry overseas threshold 2310, SJT Band 3 minimum; reset yearly), then MMI. Resits not accepted.",
      ib: "Minimum 38 points overall, including 6 in Higher Level Biology and 6 in Higher Level Chemistry (typical offer 39 points, with 7 and 6 in HL Biology and Chemistry). Admissions test: UCAT, then Multiple Mini Interview.",
      al: "Minimum A*AA including Chemistry and Biology, with the A* in one of these two subjects; all qualifications must be achieved in one sitting, and resit grades are NOT accepted for MBBS. Admissions test: UCAT, then Multiple Mini Interview."
    } },
    { n: "Mathematics (BSc)", fee: 44850, req: {
      cbse: "Imperial treats CBSE and CISCE ISC together: 90% overall across five subjects, with 90% in relevant subjects (university-level standard, October 2027 entry). A Mathematics-specific Indian-board figure is NOT published. Admissions test: TMUA (all applicants should take it; no specific score is required — it is considered holistically; typical offers may include STEP where TMUA has not been taken).",
      icse: "Treated together with CBSE: 90% overall across five subjects, with 90% in relevant subjects. Admissions test: TMUA.",
      ib: "Minimum 39 points overall, including 7 in Higher Level Mathematics and 6 in another Higher Level subject (Analysis & Approaches preferred; Applications & Interpretation accepted at HL). Admissions test: TMUA.",
      al: "Minimum A*A*A, to include A* in Mathematics, A* in Further Mathematics and A in a third subject (special cases are possible if your school does not offer Further Mathematics). Admissions test: TMUA."
    } },
    { n: "Electrical and Electronic Engineering (BEng)", fee: 47800, req: {
      cbse: "⚠️ The EEE department publishes its OWN India standard, far above Imperial’s university-level 90%: 95% in Mathematics, 95% in Physics and 95% overall, plus a rank on the common merit list from JEE performance (which may be waived). Admissions test: ESAT (Mathematics 1, Mathematics 2 and Physics) for all applicants; an online interview may follow.",
      icse: "⚠️ The department states the same standard for India ISC/CBSE: 95% in Mathematics, 95% in Physics and 95% overall, plus a JEE common-merit-list rank (may be waived). Admissions test: ESAT for all applicants.",
      ib: "Minimum 40 points overall, including 7 in Higher Level Mathematics and 7 in Higher Level Physics (Analysis & Approaches preferred). Admissions test: ESAT (Mathematics 1, Mathematics 2 and Physics).",
      al: "Minimum A*A*A or A*AAA — A* in Mathematics; A*/A in Physics (A* with three A-Levels, at least A with four); A in the third/fourth subject. Admissions test: ESAT for all applicants."
    } }
  ]
},

/* ================= 4. London School of Economics and Political Science (LSE) ================= */
{
  name: "London School of Economics and Political Science (LSE)",
  short: "LSE",
  link: "https://www.lse.ac.uk/study-at-lse/undergraduate",
  living: 13950,
  livingNote: "LSE’s own estimate: budget at least £1,550 per month for all living expenses in London (accommodation, travel, food, laundry, study and personal costs). Figure used annualises this over 9 months = £13,950.",
  english: "LSE publishes a single undergraduate standard: IELTS Academic 7.0 overall and 7.0 in each component (one sitting); TOEFL iBT 100 overall (27 Writing, 25 Reading, 24 Listening, 24 Speaking); PTE Academic 70 overall with 70 in all components (in-person only); Cambridge C1 Advanced / C2 Proficiency 185 overall and in each component. IB English A at any HL grade, or at least 6 at SL (English B: 7 at HL), is also accepted. Proof of English is NOT needed at application stage. ⚠️ NO CBSE/ISC English exemption is published on official source — Indian applicants should plan to present one of the listed tests or qualifications.",
  scholarships: "LSE Undergraduate Support Scheme (USS) — the main route for Indian applicants: for Overseas-fee-status offer holders on any LSE undergraduate programme who do not have the funds to meet all study costs. Awards are usually £15,000–£25,000 per year per the scheme page (⚠️ LSE’s parents/carers page states £6,000–£15,000 — confirm the current range with LSE’s Financial Support Office), renewed subject to satisfactory progress. All LSE scholarships are awarded on financial circumstances first and academic merit second; NO grade minimum is published. Uggla Family Scholars Programme: 3 places for new overseas undergraduates (2026 entry) from low-income households — £13,646 per year tuition contribution + £17,985 maintenance stipend + £566 travel award, with the USS covering the remaining overseas tuition fee. One form — the LSE Undergraduate Scholarship Application — covers the USS and every other LSE award you are eligible for (2026-entry overseas deadline was 30 April 2026). NO India-specific undergraduate scholarship is published; the Stelios Scholarships are UK students only.",
  feesNote: "Fees shown are Overseas fees for new entrants from LSE’s official Table of Fees 2026/27. LSE fixes the overseas fee at the year-of-entry rate for the duration of the programme. Entry requirements below are as published for September 2027 entry. All five programmes require A*AA at A-Level, so LSE’s single A*AA India conversion applies to each.",
  holistic: "UCAS only — LSE does not accept direct applications (September 2027 entry deadline: 13 January 2027, 18:00). Decisions rest on academic attainment, subject combinations, the personal statement, the teacher’s reference and educational circumstances — the personal statement carries unusual weight. ⚠️ LSE does NOT interview for any degree programme. Some applicants may additionally be asked to sit LSE’s Undergraduate Admissions Assessment (UGAA); no India-specific UGAA statement is published.",
  streams: [
    { n: "Economics (BSc)", fee: 39900, req: {
      cbse: "LSE treats CBSE and CISCE together (A*AA conversion): overall average of 95% or above, with 3 subjects at 95% or above and 2 subjects at 90% or above, AND 95% in Standard Mathematics (CBSE/ISC Applied Mathematics is NOT accepted as A-Level Mathematics). ⚠️ Admissions test: TMUA is MANDATORY for BSc Economics (September 2027 entry).",
      icse: "Treated together with CBSE: overall average 95% or above, 3 subjects at 95% or above, 2 subjects at 90% or above, and 95% in Standard Mathematics (Applied Mathematics not accepted). ⚠️ Admissions test: TMUA is MANDATORY.",
      ib: "39 points overall, with 766 in Higher Level subjects, including 7 in Mathematics. ⚠️ Admissions test: TMUA is MANDATORY for BSc Economics (September 2027 entry).",
      al: "A*AA, with the A* in Mathematics (an A* in Further Mathematics with an A in Mathematics is an acceptable alternative; A-Level Economics is NOT required). ⚠️ Admissions test: TMUA is MANDATORY."
    } },
    { n: "Finance (BSc)", fee: 35700, req: {
      cbse: "LSE treats CBSE and CISCE together (A*AA conversion): overall average of 95% or above, with 3 subjects at 95% or above and 2 subjects at 90% or above, AND 95% in Standard Mathematics (Applied Mathematics is NOT accepted). No admission test is stated for BSc Finance.",
      icse: "Treated together with CBSE: overall average 95% or above, 3 subjects at 95% or above, 2 subjects at 90% or above, and 95% in Standard Mathematics. No admission test stated.",
      ib: "39 points overall, with 766 in Higher Level subjects, including 7 in Mathematics. No admission test stated.",
      al: "A*AA, with the A* in Mathematics (A* in Further Mathematics with A in Mathematics acceptable; Further Mathematics desirable but not required where your school does not offer it). No admission test stated."
    } },
    { n: "Bachelor of Laws (LLB)", fee: 35700, req: {
      cbse: "LSE treats CBSE and CISCE together (A*AA conversion): overall average of 95% or above, with 3 subjects at 95% or above and 2 subjects at 90% or above (no Mathematics-specific condition applies to the LLB). ⚠️ Admissions test: LNAT is required for ALL LLB applicants — the only LSE programme with this requirement.",
      icse: "Treated together with CBSE: overall average 95% or above, 3 subjects at 95% or above, 2 subjects at 90% or above. ⚠️ Admissions test: LNAT required for all applicants.",
      ib: "39 points overall, with 766 in Higher Level subjects. ⚠️ Admissions test: LNAT required for all LLB applicants.",
      al: "A*AA; no set subject combination and no specific subject (including Law) is required, but at least two full A-Levels should be in traditional academic subjects. ⚠️ Admissions test: LNAT required for all applicants."
    } },
    { n: "Philosophy, Politics and Economics (BSc PPE)", fee: 30700, feeNote: "LSE’s BSc PPE is a FOUR-year programme (optional year abroad in Year 3) — budget four years of fees.", req: {
      cbse: "LSE treats CBSE and CISCE together (A*AA conversion): overall average of 95% or above, with 3 subjects at 95% or above and 2 subjects at 90% or above, AND 95% in Standard Mathematics (Applied Mathematics is NOT accepted). ⚠️ Unlike PPE at most universities, LSE PPE requires top-grade Mathematics, because of its core economics courses. No admission test stated.",
      icse: "Treated together with CBSE: overall average 95% or above, 3 subjects at 95% or above, 2 subjects at 90% or above, and 95% in Standard Mathematics. No admission test stated.",
      ib: "39 points overall, with 766 in Higher Level subjects, including 7 in Higher Level Mathematics. No admission test stated.",
      al: "A*AA, with the A* in Mathematics (essential); an A* in Further Mathematics with an A in Mathematics is an acceptable alternative. No prior study of Philosophy, Politics or Economics is needed. No admission test stated."
    } },
    { n: "Data Science (BSc)", fee: 32100, req: {
      cbse: "LSE treats CBSE and CISCE together (A*AA conversion): overall average of 95% or above, with 3 subjects at 95% or above and 2 subjects at 90% or above, AND 95% in Standard Mathematics (Applied Mathematics is NOT accepted). Admissions test: TMUA is recommended but NOT mandatory for Data Science.",
      icse: "Treated together with CBSE: overall average 95% or above, 3 subjects at 95% or above, 2 subjects at 90% or above, and 95% in Standard Mathematics. TMUA recommended, not mandatory.",
      ib: "39 points overall, including 766 in Higher Level subjects, with 7 in Mathematics: Analysis and Approaches. Admissions test: TMUA recommended but NOT mandatory.",
      al: "A*AA, with the A* in Mathematics; where your school offers it, AS- or A-Level Further Mathematics is expected with grade A achieved. Admissions test: TMUA recommended but NOT mandatory."
    } }
  ]
},

/* ================= 5. University College London (UCL) ================= */
{
  name: "University College London (UCL)",
  short: "UCL",
  link: "https://www.ucl.ac.uk/prospective-students/undergraduate",
  living: 16465,
  livingNote: "UCL publishes NO single annual living-cost total — it states its costs page is not intended as a whole-year estimate. Figure used is the sum of UCL’s own published 2026/27 components for a 39-week year: average rent in UCL self-catered halls £12,480 (average £320/week; range £153.86 to over £455.71/week) plus other essential costs £3,985 (£102.20/week, including food at £53/week and a Zones 1–2 student travelcard).",
  english: "UCL sets an English level per course (IELTS Academic shown): Level 1 — Computer Science, Architecture: 6.5 overall, min 6.0 in each component. Level 2 — Economics: 7.0 overall, min 6.5. Level 4 — Law and Medicine: 7.5 overall, min 7.0. ✅ Indian school-English route at ALL levels, exactly as UCL states it: 85 in English Core (CBSE) or in English (compulsory, CISCE) in the Class XII examinations can meet the requirement instead of IELTS (conditions apply — verify the current wording on UCL’s page).",
  scholarships: "UCL Global Undergraduate Scholarship — open to Indian students with Overseas fee status from a low-income background, for any full-time UCL undergraduate degree. Selection is on financial need (means-tested); NO academic minimum or merit cut-off is published. For 2026/27 there are up to 33 awards: 10 × full tuition fees plus a maintenance allowance plus a fixed allowance for additional costs (e.g. Immigration Health Surcharge and visa fees); 20 × full tuition fees only; and ⚠️ 3 × full tuition fees specifically for students from India. Awards run for the standard duration of the degree. You must have submitted a full UCL admission application (an offer is not required, but fee status must be confirmed). Deadline for the 2026/27 cycle: 27 April 2026.",
  feesNote: "Fees shown are Overseas annual fees for 2026/27; requirements are for 2026 entry (UCAS deadline 14 January 2026; Medicine 15 October 2025). Resits are not accepted for the courses below.",
  holistic: "UCAS only (institution code U80) — UCL does not accept direct applications. An academic reference is required for every application and is used alongside the personal statement (which UCL calls an important part of assessment) and actual/predicted grades. On top of grades: Law — LNAT; Architecture — portfolio on invitation; Medicine — UCAT and interview (detailed official selection wording was NOT FOUND in this research pass — verify on UCL’s Selection Procedure page).",
  streams: [
    { n: "Economics BSc (Econ)", fee: 39200, req: {
      cbse: "UCL treats CBSE and CISCE as ONE qualification (‘Year 12 Indian School Certificate — CISCE or CBSE’) and publishes NO per-course India percentage for Economics. UCL’s published general minimum — for a course requiring ABB at A-Level — is five subjects at 90, 85, 85, 85, 85; Economics requires A*AA, so the actual expectation will be higher. Check the course page’s country selector. ⚠️ Admissions test: TMUA required for the 2026 cycle (a new requirement).",
      icse: "Treated together with CBSE as one qualification; no per-course ISC percentage is published. UCL’s general minimum (for an ABB course) is five subjects at 90, 85, 85, 85, 85 — Economics requires A*AA, so expect higher. ⚠️ Admissions test: TMUA required for the 2026 cycle.",
      ib: "39 points total; Higher Level total 19, including grade 7 in Mathematics and grade 6 in Economics if offered; no HL subject below 5 (Analysis & Approaches or Applications & Interpretation at HL accepted). ⚠️ Admissions test: TMUA required for the 2026 cycle.",
      al: "A*AA — A* in Mathematics required; grade A in Economics if offered. ⚠️ Admissions test: TMUA required for the 2026 cycle (all applicants, via UAT-UK)."
    } },
    { n: "Law LLB", fee: 35400, req: {
      cbse: "UCL treats CBSE and CISCE as one qualification and publishes NO per-course India percentage for Law. UCL’s published general minimum (for an ABB course) is five subjects at 90, 85, 85, 85, 85; Law requires A*AA, so expect higher. Admissions test: LNAT — all Law applicants must take it before their application is considered.",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (general ABB minimum: 90, 85, 85, 85, 85; Law requires A*AA). Admissions test: LNAT required.",
      ib: "39 points total; Higher Level total 19; no HL subject below 5. Admissions test: LNAT required.",
      al: "A*AA — no specific subjects required; at least two subjects from UCL’s preferred-subjects list. Admissions test: LNAT required for all Law applicants."
    } },
    { n: "Medicine MBBS BSc", fee: 57300, feeNote: "By far the highest of UCL’s five courses here — and the degree runs SIX years (including an integrated BSc), not three. UCAS deadline 15 October 2025 for 2026 entry.", req: {
      cbse: "UCL treats CBSE and CISCE as one qualification and publishes NO per-course India percentage for Medicine. UCL’s published general minimum (for an ABB course) is five subjects at 90, 85, 85, 85, 85; Medicine requires A*AA with Biology and Chemistry, so expect higher. Admissions test: UCAT, taken in the year of application; UCL Medicine selects by interview.",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (general ABB minimum: 90, 85, 85, 85, 85; Medicine requires A*AA). Admissions test: UCAT; interview.",
      ib: "39 points total; Higher Level total 19, including grade 7 and grade 6 in Biology and Chemistry (in either order); no HL subject below 5. Admissions test: UCAT, taken in the year of application.",
      al: "A*AA — Biology and Chemistry required, with either subject at grade A*. Admissions test: UCAT, taken in the year of application; interview."
    } },
    { n: "Computer Science BSc", fee: 46700, req: {
      cbse: "UCL treats CBSE and CISCE as one qualification and publishes NO per-course India percentage for Computer Science. UCL’s published general minimum (for an ABB course) is five subjects at 90, 85, 85, 85, 85; Computer Science requires A*A*A, so expect higher. ⚠️ Admissions test: TARA required for the 2026 cycle (a new, non-subject-specific test).",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (general ABB minimum: 90, 85, 85, 85, 85; this course requires A*A*A). ⚠️ Admissions test: TARA required for the 2026 cycle.",
      ib: "40 points total; Higher Level total 20, including grade 7 in Mathematics (Analysis & Approaches or Applications & Interpretation accepted; AA preferred). ⚠️ Admissions test: TARA required for the 2026 cycle.",
      al: "A*A*A — A* in Mathematics or Further Mathematics required. ⚠️ Admissions test: TARA required for the 2026 cycle."
    } },
    { n: "Architecture BSc", fee: 35400, req: {
      cbse: "UCL treats CBSE and CISCE as one qualification and publishes NO per-course India percentage for Architecture. UCL’s published general minimum (for an ABB course) is five subjects at 90, 85, 85, 85, 85; Architecture requires AAB. ⚠️ A comprehensive portfolio of creative work is required upon invitation, at application stage — this course is not decided on grades alone.",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (general ABB minimum: 90, 85, 85, 85, 85; this course requires AAB). Portfolio required upon invitation.",
      ib: "36 points total; Higher Level total 17; no HL subject below 5. Portfolio of creative work required upon invitation.",
      al: "AAB — no specific subjects required; at least two subjects from UCL’s preferred list. Portfolio of creative work required upon invitation."
    } }
  ]
},

/* ================= 6. King's College London (KCL) ================= */
{
  name: "King’s College London (KCL)",
  short: "King’s",
  link: "https://www.kcl.ac.uk/study/undergraduate/courses",
  living: 15930,
  livingNote: "King’s own published estimate (2026-27): £1,770 per month on average (published range £1,331–£2,342) — £15,930 for a 9-month undergraduate year on average (range £11,979–£21,078); £21,240 for 12 months. Monthly averages include accommodation £1,164, food £167, travel (Zones 1–4) £173 and personal/leisure £266.",
  english: "King’s sets an English band per course/faculty (figures correct for 2027/28 entry). Band B — Law, Medicine, Business Management, International Relations: IELTS Academic 7.0 overall, min 6.5 in each skill (PTE 69/62; TOEFL iBT 100 with 25 Writing, 23 others, for tests before 21 Jan 2026; Cambridge C1/C2 185/176). Band D — Computer Science: IELTS 6.5 overall, min 6.0 (PTE 62/59; TOEFL iBT 92; Cambridge 176/169). Tests must be taken within 2 years of the course start. ⚠️ King’s does NOT publish a CBSE/ISC English exemption — its official English page contains no India entry, so on the official evidence an Indian applicant needs one of King’s listed tests or qualifications (a sharp contrast with UCL’s 85-in-English school route).",
  scholarships: "⚠️ Currently-open undergraduate scholarships for international students at King’s: NOT FOUND on official source — no current official King’s page was found for an undergraduate international scholarship. King’s GREAT Scholarships are POSTGRADUATE only (King’s Business School taught Master’s; India is not even on that scheme’s eligible-country list), and the Vice-Chancellor’s Awards for India (£5,000) are likewise postgraduate only. The Dickson Poon Undergraduate Law Scholarships appear only in historical material (last cycle found: 2021) — their current status is NOT FOUND, so do not treat them as open.",
  feesNote: "⚠️ King’s official fee pages are JavaScript-rendered and most international fees could NOT be verified on official source — streams with fee 0 have NO officially published figure in this dataset (see feeNote) and must not be averaged or quoted. A-Level requirements and English bands are from the current course pages (September 2027 start). All King’s applications are via UCAS; transfers into these programmes are not permitted.",
  holistic: "King’s assesses the UCAS personal statement as ‘one of many factors’ on every course here, and a reference forms part of the application. Medicine: the personal statement and reference are formally assessed, work experience in a caring environment is normally expected, and NO offers are made without an interview. No interview requirement is published for Law, Business Management, Computer Science or International Relations.",
  streams: [
    { n: "Law LLB", fee: 0, feeNote: "International tuition fee: NOT FOUND on official source (the fee body of King’s official fees page could not be extracted) — check kcl.ac.uk. Do not use third-party fee figures.", req: {
      cbse: "King’s accepts ONLY the Indian High School Leaving Certificate from the CBSE or CISCE boards, treated together, and publishes NO percentages — per-course India requirements sit in each course page’s interactive selector and are NOT published on King’s official text pages. Do not rely on aggregator percentage mappings. Admissions test: LNAT required for all applicants (King’s states it must be taken by 31 December). Resits are NOT accepted for Law.",
      icse: "Treated together with CBSE: King’s accepts only the CBSE/CISCE certificate and publishes NO per-course ISC percentage (NOT FOUND on official source). Admissions test: LNAT required. Resits not accepted.",
      ib: "King’s does not publish an IB total for Law LLB on its official page (NOT FOUND on official source) — the 38-point figure circulating for ‘King’s Law’ belongs to a different degree (Politics, Philosophy & Law LLB); do not use it. Check the course page. Admissions test: LNAT required.",
      al: "A*AA. Admissions test: LNAT required for all applicants (to be taken by 31 December, per King’s UCAS listings). Resits are NOT accepted for Law."
    } },
    { n: "Medicine MBBS", fee: 0, feeNote: "International tuition fee: NOT FOUND on official source (a £56,800 figure for 2026/27 appears in non-official mirrors only and is deliberately NOT used). Five-year course (six with an optional intercalated degree).", req: {
      cbse: "King’s accepts only the CBSE or CISCE certificate, treated together, and publishes NO per-course India percentage for Medicine (NOT FOUND on official source — it sits in the course page’s interactive selector). Admissions test: UCAT for ALL applicants. No offers are made without an interview; shortlisting is initially ranked on UCAT performance, GCSE grades and widening-participation indicators.",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (NOT FOUND on official source). Admissions test: UCAT for all applicants; interview mandatory.",
      ib: "38 points overall, or an aggregate of 19 points from three Higher Level subjects, including grade 6 in HL Biology and HL Chemistry (total includes Theory of Knowledge / Extended Essay points) — per King’s official UCAS listing. Admissions test: UCAT for all applicants; interview mandatory.",
      al: "A*AA, which must include Biology and Chemistry, with grade A in both; GCSE grade 6/B in English Language and Mathematics. Admissions test: UCAT for all applicants; no offers without an interview (interviews usually December–April, held remotely)."
    } },
    { n: "Business Management BSc", fee: 38300, feeNote: "£38,300 per year (2026-27) is the official rate published on the fees page of the Business Management with Year in Industry BSc — the same programme family. The plain BSc’s own fee-page body could not be extracted; confirm the plain-BSc rate on kcl.ac.uk before quoting it as this course’s fee.", req: {
      cbse: "King’s accepts only the CBSE or CISCE certificate, treated together, and publishes NO per-course India percentage for Business Management (NOT FOUND on official source). No admission test is published. King’s looks for enthusiasm for the interdisciplinary nature of the degree; business work experience is welcomed but NOT required.",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (NOT FOUND on official source). No admission test published.",
      ib: "King’s does not publish an IB total for Business Management BSc on its official page (NOT FOUND on official source) — figures in third-party mirrors conflict (35 vs 38 points) and are deliberately NOT used. Check the course page.",
      al: "A*AA, including grade A in at least one Humanities or Social Science subject (excluding Modern Languages); GCSE Mathematics at 6/B. No admission test published."
    } },
    { n: "Computer Science BSc", fee: 0, feeNote: "International tuition fee: NOT FOUND on official source (a £40,450 figure appears in non-official mirrors only and is deliberately NOT used).", req: {
      cbse: "King’s accepts only the CBSE or CISCE certificate, treated together, and publishes NO per-course India percentage for Computer Science (NOT FOUND on official source). No admission test is published.",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (NOT FOUND on official source). No admission test published.",
      ib: "King’s does not publish an IB total for Computer Science BSc on its official page (NOT FOUND on official source); conflicting figures appear only in non-official mirrors. Check the course page.",
      al: "A*A*A, including grade A in Mathematics or Further Mathematics (current course page, September 2027 start). ⚠️ Year divergence: King’s listings in the 2025/26 cycle showed AAA for this course — always state the entry year."
    } },
    { n: "International Relations BA", fee: 0, feeNote: "International tuition fee: NOT FOUND on official source. Do NOT use £38,300 for this course — the search result carrying that figure was the fees page of the International Relations MA (postgraduate), not this BA.", req: {
      cbse: "King’s accepts only the CBSE or CISCE certificate, treated together, and publishes NO per-course India percentage for International Relations (NOT FOUND on official source). No admission test is published. Note: the King’s LLB is a different course — this BA’s department also accepts a military reference where relevant.",
      icse: "Treated together with CBSE; no per-course ISC percentage is published (NOT FOUND on official source). No admission test published.",
      ib: "King’s does not publish an IB total for International Relations BA on its official page (NOT FOUND on official source). Check the course page.",
      al: "AAA, with no compulsory subjects (the official King’s/UCAS figure — one non-official portal lists A*AA; do not use it). No admission test published."
    } }
  ]
},

/* ================= 7. University of Edinburgh ================= */
{
  name: "University of Edinburgh",
  short: "Edinburgh",
  link: "https://study.ed.ac.uk/undergraduate",
  living: 13914,
  livingNote: "Edinburgh’s own estimate (2026–27): £1,546 per month on average for a single undergraduate — £13,914 for the 39-week academic year (£18,552 for a full year). The breakdown includes accommodation plus utilities at £980/month.",
  english: "✅ Indian board waiver: Class XII English at 75% in CBSE or CISCE is on Edinburgh’s accepted-qualifications list and removes the need for IELTS/TOEFL at the standard English level. Standard level (Computer Science, Law, Economics): IELTS Academic 6.5 overall, at least 5.5 in each component (TOEFL iBT 92, at least 20 each). Business School courses are HIGHER: IELTS 7.0, at least 6.0 in each component. ⚠️ Medicine is much higher: IELTS 7.5 overall with at least 7.5 in EACH component — OR the Medicine-specific waiver of 85% in Standard XII CBSE/CISCE examinations.",
  scholarships: "Edinburgh Global Undergraduate Mathematics Scholarships — for international/EU-fee students on full-time undergraduate programmes hosted in the School of Mathematics ONLY: £5,000 each per year, paid as a contribution to living costs, for the duration of the programme subject to satisfactory progress. Competitive, on academic merit / outstanding academic performance; no specific minimum grade is published. Apply to Edinburgh via UCAS first, then the online scholarship application in EUCLID via MyEd (deadline 23:59 UK, 31 March 2027; outcome by 23 April 2027). Global Talent Fund BIG Scholarships — for international Olympiad medallists (IMO/IOI/IPhO/RMM/EGMO gold/silver) on School of Mathematics programmes, with holistic tuition and living support; funding for 2027/28 was NOT yet confirmed on the official page. ⚠️ Edinburgh’s GREAT Scholarships and India Merit Scholarships are POSTGRADUATE-taught only — NO undergraduate GREAT award for Indians exists at Edinburgh, and no general (non-Mathematics) undergraduate international scholarship is published.",
  feesNote: "Fees shown are international Year 1 fees for 2026 entry. ✅ Edinburgh fixes the full-time international fee rate for the whole duration of the programme. Requirements below are Edinburgh’s STANDARD requirements; its published ‘minimum’ requirements apply only to UK widening-access (Plus Flag) applicants permanently resident in the UK and are NOT shown. Scottish undergraduate degrees below are four-year Honours degrees (Medicine six years) — multiply the annual fee accordingly.",
  holistic: "Applications are made through UCAS with academic qualifications, a personal statement, evidence of English skills and a reference; all on-time, complete applications meeting the minimum requirements go forward into selection, and offer grades for popular subjects may be much higher than the minimum (CAHSS notes a ‘perfect or near-perfect score’ may be needed). Of the five courses below, only Medicine states an interview requirement.",
  streams: [
    { n: "Computer Science BSc (Hons)", fee: 38900, req: {
      cbse: "College of Science & Engineering rule (2026 entry): CBSE/CISCE Class XII with five subjects, overall average 80%+, and minimum 80% in all required subjects (85% where grade A at SQA Higher is required). Mathematics is required — CBSE Applied Mathematics is NOT accepted for a Mathematics requirement. Edinburgh treats CBSE and ISC identically here. No admission test stated.",
      icse: "Treated identically to CBSE (College of Science & Engineering): five subjects, overall average 80%+, minimum 80% in all required subjects (85% where SQA Higher grade A is required); Applied Mathematics not accepted for the Mathematics requirement. No admission test stated.",
      ib: "Standard range: 43 points with 777 at Higher Level down to 34 points with 665 at HL; HL Mathematics (Analysis and Approaches ONLY) at 6; SL English at 5. The mathematics qualification must be no more than two academic years old. No admission test stated.",
      al: "Standard range: A*A*A* to AAB in one set of exams, including Mathematics at A; GCSE English at C/4. No admission test stated."
    } },
    { n: "Medicine MBChB (6-year programme)", fee: 54650, feeNote: "International fee for 2026–2027, including the ACT levy. Six-year programme — budget six years of fees.", req: {
      cbse: "✅ Edinburgh DOES accept CBSE/CISCE for Medicine (2026 entry): five subjects, overall average 85%, with grades of 85%+ in English, Chemistry, plus two from Biology, Mathematics or Physics (for Medicine, CBSE Applied Mathematics IS accepted for the Mathematics requirement). ⚠️ UCAT is mandatory, sat in the same year as the UCAS application; a minimum UCAT score is required and Band 4 in Situational Judgement means the application is not considered. Interview required; all grades at first attempt.",
      icse: "Treated identically to CBSE for Medicine: five subjects, overall average 85%, 85%+ in English, Chemistry, plus two from Biology, Mathematics or Physics. ⚠️ UCAT mandatory (Band 4 SJT = not considered); interview required.",
      ib: "38 points with 666 at Higher Level; HL Chemistry plus one from Biology, Mathematics or Physics; SL Mathematics at 6, English at 6, and Biology at 6 if not taken at HL. ⚠️ UCAT mandatory; interview required.",
      al: "AAA in one sitting: Chemistry plus one from Biology/Human Biology, Mathematics/Further Mathematics or Physics; GCSE Biology, Chemistry, English and Mathematics all at A/7; all grades at FIRST attempt (resits not entered into selection except in very exceptional circumstances). ⚠️ UCAT mandatory; interview required."
    } },
    { n: "Law LLB (Hons) — Scots Law", fee: 29600, feeNote: "This is Edinburgh’s Scots-law qualifying degree (LLB Ordinary and Honours).", req: {
      cbse: "College of Arts, Humanities & Social Sciences (CAHSS) rule (2026 entry): CBSE/CISCE Standard XII overall 80% with three subjects at 75%, including English (an English Literature requirement is met with Standard XII Elective English; Functional/Core English is not accepted for it). Edinburgh treats CBSE and ISC identically. ⚠️ No LNAT requirement is published for Edinburgh Law (NOT FOUND on official source — Edinburgh does not appear to require LNAT).",
      icse: "Treated identically to CBSE (CAHSS): overall 80% with three subjects at 75%, including English. No LNAT requirement is published for Edinburgh Law.",
      ib: "Standard range: 40 points with 766 at Higher Level down to 37 points with 666 at HL; HL English at 5. No LNAT requirement is published.",
      al: "Standard range: A*A*A to A*AA, with English Literature, English Language or combined English at B. No LNAT requirement is published."
    } },
    { n: "Business with Enterprise and Innovation MA (Hons)", fee: 29600, feeNote: "Edinburgh Business School’s representative business degree; Edinburgh offers a family of ‘Business with …’ MA (Hons) degrees on the same entry pattern rather than a plain Business degree. A Scottish MA (Hons) is an undergraduate degree.", req: {
      cbse: "CAHSS rule (2026 entry): CBSE/CISCE Standard XII overall 80% with three subjects at 75%, including English. Edinburgh treats CBSE and ISC identically. No admission test stated. Note: Business School English is HIGHER than standard — IELTS 7.0 (see the university English field), though the Class XII English 75% waiver position should be checked per course on Edinburgh’s English page.",
      icse: "Treated identically to CBSE (CAHSS): overall 80% with three subjects at 75%, including English. No admission test stated.",
      ib: "Standard range: 40 points with 766 at Higher Level down to 37 points with 666 at HL; no specific subjects; SL English at 5 and Mathematics at 5. No admission test stated.",
      al: "Standard range: A*AA to AAA; no specific A-Level subjects required; GCSE Mathematics at B/6 and English at C/4. No admission test stated."
    } },
    { n: "Economics MA (Hons)", fee: 29600, feeNote: "A Scottish MA (Hons) is an undergraduate Honours degree (four years).", req: {
      cbse: "CAHSS rule (2026 entry): CBSE/CISCE Standard XII overall 80% with three subjects at 75%, including English; a Mathematics requirement at A-Level A*/A level must be met with Standard XII Mathematics, NOT Applied Mathematics. No admission test stated.",
      icse: "Treated identically to CBSE (CAHSS): overall 80% with three subjects at 75%, including English; Standard XII Mathematics (not Applied Mathematics) for the Mathematics requirement. No admission test stated.",
      ib: "Standard range: 40 points with 766 at Higher Level down to 37 points with 666 at HL; HL Mathematics at 5; SL English at 5, and Mathematics at 6 if not taken at HL. No admission test stated.",
      al: "Standard range: A*A*A* to A*AA; Mathematics at B (or AS Mathematics at A); GCSE English at C/4. No admission test stated."
    } }
  ]
},

/* ================= 8. The University of Manchester ================= */
{
  name: "The University of Manchester",
  short: "Manchester",
  link: "https://www.manchester.ac.uk/study/undergraduate/courses/",
  living: 10539,
  livingNote: "UK student visa funds requirement (a visa requirement, not a cost estimate): £1,171 per month for up to 9 months outside London = £10,539. Manchester publishes an itemised cost-of-living breakdown page as guidance, but a single headline annual total is NOT published on official source as verified.",
  english: "Manchester sets English per course, and an Indian board waiver exists only in Science & Engineering / Computer Science: ✅ 85% in India Standard XII English (NOT ‘Functional English’) from the National Boards (CBSE or ISC) is accepted there; State Board Standard XII is NOT accepted for English. Course levels: Computer Science and Mechanical Engineering — IELTS 6.5 overall with no subskill below 6.5 (TOEFL iBT 90, no subskill below 22). Law — IELTS 7.0 with minimum 6.5 in each subtest (in-person IELTS at official test centres only). Medicine — IELTS 7.0 with no less than 6.5 in any component (PTE 65/65; Cambridge 185/185; or GCSE English B/6 or IB English grade 5); NO Standard XII waiver is published for Medicine. Management — IELTS 6.5 with no less than 6 in any component (Alliance MBS builds English into its Standard XII requirement itself: the 85% average must include English).",
  scholarships: "Global Futures Scholarship — South Asia (undergraduate): for applicants domiciled in India (also Bangladesh, Pakistan, Sri Lanka) holding an offer for a full-time, on-campus course starting September 2027 — £36,000 in total (£12,000 per year over three years) as a discount on overseas tuition fees, merit-based (350+ Global Futures awards across levels for 2027). Apply via the form made available after you receive an offer. ⚠️ The detailed 2027 South Asia criteria document is NOT yet published on official source; the fully published 2026 criteria required, in addition to the course offer: A-Level AAA, IB 36 points, or Indian Standard XII 90% for national boards (95% state boards except West Bengal 85%), self-funded, direct Year 1 entry, and EXCLUDED Medicine (MBChB), Dentistry, Architecture and foundation-year courses. GREAT Scholarships at Manchester are for one-year Master’s programmes only, and India is not among Manchester’s 2027 GREAT countries — no undergraduate GREAT award exists.",
  feesNote: "Fees shown are international fees per annum for September 2027 entry. Unlike Edinburgh, Manchester does NOT fix international fees for the whole degree — the fee is set for the entry year and the University reserves the right to increase international fees (up to 7% per year is stated on its MBChB Graduate Entry page). ‘Typical offers’ below exclude Manchester’s lower contextual and care-experienced offers, which are UK widening-access schemes. Manchester publishes Standard XII requirements per faculty/school/department — there is no single university-wide CBSE/ISC table.",
  holistic: "All applications via UCAS with a personal statement and reference; applications are considered as a whole / within a structured framework, with strong examination results the main factor (Alliance MBS assesses holistically, including the statement of purpose). Interviews: mandatory for Medicine (‘We do not make any offers without interview’); not held for Mechanical Engineering; not held as a rule for Alliance MBS Management.",
  streams: [
    { n: "Computer Science BSc", fee: 39700, req: {
      cbse: "⚠️ Department-specific, higher than the faculty norm (Computer Science department page): Grade XII CBSE or ISC — average 90%, including 90% in Mathematics (not Applied Maths) and 85% in Physics or Computer Science (not Informatics Practices). CBSE and ISC are treated together. No additional aptitude test is required.",
      icse: "Treated together with CBSE on the department page: average 90%, including 90% in Mathematics (not Applied Maths) and 85% in Physics or Computer Science (not Informatics Practices). No admission test required.",
      ib: "37 points overall with 7,6,6 at Higher Level, including 7 in Mathematics: Analysis and Approaches, plus at least one science subject at HL. No admission test required.",
      al: "Typical offer A*AA, including A* in Mathematics and at least one science from Computer Science, Further Mathematics, Biology, Chemistry or Physics; at least five GCSEs including Mathematics at B/6 and English Language at C/4. No admission test required."
    } },
    { n: "Medicine MBChB", fee: 0, feeNote: "International tuition fee: NOT FOUND on official source — UCAS states ‘No fee information has been provided for this course’ and that 2027 fees are yet to be confirmed. Manchester publishes MBChB fees per programme with separate pre-clinical and clinical rates; do not substitute another programme’s fee.", req: {
      cbse: "⚠️ Manchester does NOT accept CBSE/ISC for Medicine: its country entry-requirements pages state that only A-Levels or the IB will be considered for admission to Medicine or Dentistry. No CBSE percentage for MBChB is published on any official Manchester source (contrast Edinburgh, which accepts CBSE/CISCE at 85%).",
      icse: "⚠️ NOT a published route: only A-Levels or IB are considered for Manchester Medicine. No ISC percentage is published. Admissions test: UCAT (see IB/A-Level fields).",
      ib: "36 points overall with 6,6,6 at Higher Level; HL subjects must include Chemistry or Biology, plus another science (Chemistry, Biology, Physics, Psychology or Mathematics) and one further subject. ⚠️ UCAT is mandatory, sat in the year of application: Manchester sets its threshold each year (published 2026-entry thresholds: overseas 2250 on the new UCAT scale); only Situational Judgement Band 1 or 2 are considered (Band 3 or 4 are not). Interview is mandatory — no offers without interview.",
      al: "Typical offer AAA, including Biology/Human Biology or Chemistry, and one further subject from Chemistry, Biology/Human Biology, Physics, Psychology, Mathematics or Further Mathematics; at least seven GCSEs at grade A (7) or A* (8+). ⚠️ UCAT mandatory with a yearly-set threshold and SJT Band 1 or 2 only; interview mandatory — no offers without interview."
    } },
    { n: "Law LLB", fee: 29800, req: {
      cbse: "School of Social Sciences Asia page (A*AA equivalence row): India Standard XII (CBSE/ISC national boards) — overall average 90%, with no lower than 85% in any subject, including English; plus at least 70% in Mathematics in Class X (Year 10). CBSE and ISC are treated together. ⚠️ No LNAT requirement is published for Manchester Law (NOT FOUND on official source).",
      icse: "Treated together with CBSE (School of Social Sciences): overall average 90%, no subject below 85% including English; at least 70% in Class X Mathematics. No LNAT requirement is published.",
      ib: "37 points overall with 7,6,6 at Higher Level. No LNAT requirement is published for Manchester Law.",
      al: "Typical offer A*AA, including at least one subject from the School’s published preferred list (two preferred subjects are favoured); GCSE English Language and Mathematics at grade 4/C minimum. No LNAT requirement is published."
    } },
    { n: "Mechanical Engineering BEng", fee: 37500, req: {
      cbse: "Faculty of Science & Engineering country page (applies across the Faculty’s undergraduate courses): Grade XII CBSE or ISC — average 90%, including 90% in Mathematics (not Applied Maths) and 85% in Physics or Chemistry. CBSE and ISC are treated together. No admission test stated; interviews are NOT held for this course.",
      icse: "Treated together with CBSE (Faculty of Science & Engineering): average 90%, including 90% in Mathematics (not Applied Maths) and 85% in Physics or Chemistry. No admission test; no interviews.",
      ib: "38 points overall with 7,7,6 at Higher Level, including Mathematics and Physics (both IB Mathematics options accepted). No admission test; interviews not held.",
      al: "Typical offer A*A*A, including Mathematics, Physics and one other subject; at least five GCSEs/IGCSEs at grade A*/8 to B/6 including Mathematics and a science subject, English Language minimum C/4. No admission test; interviews not held."
    } },
    { n: "Management BSc (Alliance Manchester Business School)", fee: 35300, feeNote: "Figure from the BSc Management (Accounting and Finance) entry-requirements page, read in full; Manchester’s Management degrees (BSc Management and its specialisms) share a common first year and the same published entry pattern.", req: {
      cbse: "Alliance Manchester Business School international entry requirements (standard tier, Management family): Standard XII CBSE or CISCE — no lower than 80% in any subject, with a minimum average of 85% which must include English; and a minimum of 70% in Standard X Mathematics, otherwise Mathematics must be taken as a subject in Standard XII. No admission test stated; interviews not held as a rule.",
      icse: "Treated together with CBSE (Alliance MBS standard tier): no subject below 80%, minimum average 85% including English; minimum 70% in Standard X Mathematics or Mathematics taken in Standard XII. No admission test stated.",
      ib: "36 points overall with 6,6,6 at Higher Level. No admission test stated.",
      al: "Typical offer AAA, with subjects considered against Alliance MBS’s published preferred-subjects list; at least grade 6/B in GCSE/IGCSE English Language and Mathematics. No admission test stated."
    } }
  ]
},

/* ================= 9. University of Warwick ================= */
{
  name: "University of Warwick",
  short: "Warwick",
  link: "https://warwick.ac.uk/study/undergraduate/courses/",
  living: 10539,
  livingNote: "UK student visa funds requirement (a visa requirement, not a cost estimate): £1,171 per month for up to 9 months outside London = £10,539 — this is the Home Office minimum Warwick itself quotes on its living-costs page. Warwick does NOT publish its own single annual undergraduate living-cost total on official source.",
  english: "Warwick sets one of three bands per course (IELTS overall / minimum per component): Band A — Computer Science, Mathematics: 6.0 (5.5). Band C — Economics, Law, International Management: 7.0 (6.5). (Band B, 6.5 (6.0), exists but is not used by these five courses.) ✅ Indian English waiver, exact basis: CBSE (AISSCE) or CISCE (ISC) only, in English Core, English Elective C (code 101) or English Language and Literature, AT FIRST ATTEMPT — Band A: 75%; Band B: 80%; Band C: 85%.",
  scholarships: "Warwick Undergraduate Global Excellence Scholarship (2026/2027) — for students classed as overseas for fees who applied for an undergraduate programme (or the International Foundation Programme) before 14 January 2026 and start in Autumn 2026, self-funded. Awarded to ‘exceptional students who hold an offer’ — NO numeric minimum grade is published. Previous-year tiers, given as an indication: 6 × full-fee awards, 148 × half-fee awards, 103 × 25% fee awards and 6 × £2,000 awards (2025). Application deadline was 27 February 2026. GREAT Scholarships at Warwick are for selected taught POSTGRADUATE courses only, and India is NOT among Warwick’s 2026 GREAT countries — not an undergraduate route for Indian applicants.",
  feesNote: "Fees shown are Overseas fees for 2026-27. Warwick charges two bands: Band 1 £27,870 (classroom-based, incl. Law) and Band 2 £35,530 (laboratory-based, plus Mathematics, Statistics, Economics and Warwick Business School courses). For 2027-28 the bands rise to £29,260 / £37,310. CBSE/ISC figures below follow Warwick’s own published Class XII equivalency table (across 5 subjects): A*A*A or above = 92%; A*AA = 90%; AAA = 85%; AAB = 83%; ABB = 80%. Lower ‘contextual offers’ (UK widening access) are not shown. All applications via UCAS (institution code W20).",
  holistic: "Warwick does not typically interview: ‘Offers are made based on your UCAS form which includes predicted and actual grades, your personal statement and school reference.’ Warwick Law School states the personal statement is ‘normally our only chance to hear an applicant’ and is considered as carefully as the academic profile. Computer Science and Mathematics selection also uses TMUA performance alongside GCSEs and predicted grades.",
  streams: [
    { n: "Economics BSc", fee: 35530, req: {
      cbse: "90% overall across 5 subjects (Warwick’s published A*AA equivalence, 2026 entry). CBSE and ISC are treated together; a Mathematics requirement at this level needs Standard XII Mathematics (Applied Mathematics is considered by most departments, but see Computer Science/Mathematics for exceptions). Admissions test: TMUA is optional/encouraged, NOT mandatory — the highest TMUA scores are considered for a reduced offer of AAA.",
      icse: "Treated together with CBSE: 90% overall across 5 subjects (A*AA equivalence). TMUA optional — top scores can earn a reduced AAA offer.",
      ib: "38 points, including 6 in Higher Level Mathematics (Analysis & Approaches or Applications & Interpretation). TMUA optional/encouraged, not mandatory.",
      al: "A*AA, including A in Mathematics (contextual offer AAB). TMUA optional — highest scores considered for a reduced offer of AAA."
    } },
    { n: "Computer Science BSc", fee: 35530, req: {
      cbse: "92% overall across 5 subjects (Warwick’s published A*A*A equivalence, 2026 entry). ⚠️ CBSE Applied Mathematics is NOT accepted by the Computer Science department. ⚠️ Admissions test: TMUA is REQUIRED for all 2026-27 applicants except those eligible for a contextual offer — applicants who do not take it (and are not contextual-eligible) may not be considered.",
      icse: "Treated together with CBSE: 92% overall across 5 subjects (A*A*A equivalence). ⚠️ Admissions test: TMUA REQUIRED (except contextual-offer-eligible applicants).",
      ib: "39 points, with 7, 6, 6 in three Higher Level subjects including 7 in Higher Level Mathematics (Analysis and Approaches ONLY). ⚠️ TMUA required (except contextual-eligible).",
      al: "A*A*A, including A* in Mathematics (contextual offer A*AA including A in Mathematics). ⚠️ TMUA required (except contextual-eligible)."
    } },
    { n: "International Management BSc (Warwick Business School)", fee: 35530, feeNote: "Four-year programme (Warwick Business School). The near-identical Management BSc (N200) publishes the same A*AA / IB 38 profile.", req: {
      cbse: "90% overall across 5 subjects (Warwick’s published A*AA equivalence). CBSE and ISC are treated together. No admission test is stated on the official course page.",
      icse: "Treated together with CBSE: 90% overall across 5 subjects (A*AA equivalence). No admission test stated.",
      ib: "38 points, with no further Higher Level requirements. No admission test stated.",
      al: "A*AA (contextual offer AAB); GCSE Mathematics 7/A, 7/A in at least one humanities/social-science subject, English Language 6/B. No admission test stated."
    } },
    { n: "Law LLB", fee: 27870, feeNote: "Fee Band 1 (classroom-based) — the lowest of Warwick’s two overseas bands.", req: {
      cbse: "90% overall across 5 subjects (Warwick’s published A*AA equivalence, 2026 entry). ⚠️ Admissions test: LNAT is NOT required — Warwick’s official wording: ‘Our Law programmes do not currently require the LNAT for admissions consideration’ (a sharp contrast with Bristol Law). Successful applicants typically have strong GCSEs, the majority at grade 7 (A) and 8/9 (A*).",
      icse: "Treated together with CBSE: 90% overall across 5 subjects (A*AA equivalence). LNAT NOT required.",
      ib: "38 points. LNAT NOT required.",
      al: "A*AA (contextual offer AAB); GCSE Mathematics 4/C and English Language 6/B. LNAT NOT required."
    } },
    { n: "Mathematics BSc", fee: 35530, req: {
      cbse: "92% overall across 5 subjects (Warwick’s published A*A*A equivalence). ⚠️ CBSE Applied Mathematics is NOT accepted by the Mathematics department. ⚠️ Admissions tests: TMUA is typically required (except contextual-offer-eligible applicants); Grade 2 in STEP is a requirement of the offer for applicants who have not taken TMUA, or who have not achieved the required TMUA threshold.",
      icse: "Treated together with CBSE: 92% overall across 5 subjects (A*A*A equivalence). TMUA typically required; STEP Grade 2 alternative as for CBSE.",
      ib: "39 points, with 6 in three Higher Level subjects including Mathematics (Analysis and Approaches ONLY). TMUA typically required; Grade 2 in STEP required in the offer if TMUA not taken or threshold not met.",
      al: "A*A* in Mathematics and Further Mathematics, plus A in a third subject (an A*A*A profile overall). TMUA typically required; STEP Grade 2 in the offer if TMUA not taken or threshold not met."
    } }
  ]
},

/* ================= 10. University of Bristol ================= */
{
  name: "University of Bristol",
  short: "Bristol",
  link: "http://www.bristol.ac.uk/study/undergraduate/",
  living: 12609,
  livingNote: "Bristol’s own published figure: average monthly living costs for undergraduate Bristol students were £1,401 in 2025/26. Figure used annualises this over 9 months = £12,609.",
  english: "Bristol assigns every course an English language ‘profile’ (Profile A: IELTS 7.5 overall, 7.0 in all skills; B: 7.0 overall with 7.0 in writing and 6.5 elsewhere; C: 6.5/6.5; D: 6.5 with 7.0 in reading and writing; E: 6.5, no score below 6.0; F: 6.0 with conditions; G: 6.5 with 7.0 in reading and listening). ⚠️ The per-course profile labels for Computer Science, Law, Economics and Mechanical Engineering could NOT be verified from Bristol’s official course-page text (NOT FOUND on official source) — check the course page; no profile has been substituted. Medicine requires IELTS 7.5 overall (Profile A, per Bristol’s official foundation-progression statement for Medical programmes). India-page waiver, exact wording: ‘CBSE or CISCE English at 70–80% or above can be accepted in lieu of another English test such as IELTS’ — the exact figure depends on the course’s profile, and NO per-profile CBSE/CISCE threshold table is published for the Bristol campus (figures published for Bristol’s separate Mumbai campus are not used here). You do not need to reach the required level before applying — it becomes a condition of any offer.",
  scholarships: "Think Big Scholarships (2027 entry) — Bristol’s flagship scheme for international students: up to £5 million invested. Open to applicants with overseas fee status who have applied for an eligible undergraduate course (any undergraduate course of up to four years, delivered in person; you do not need an offer before applying, but you must have applied and received an application ID). Value: £6,500 or £13,000 per year, for up to four years, towards tuition fees. Selection is on three written application questions (achievements; ambassadorial potential; studies and future plans, max 1,000 characters each) — NO numeric grade minimum is published. Applications for 2027 entry: open 27 October 2026, close 19 March 2027 (13:00 UK), outcomes early May 2027. ⚠️ Bristol’s GREAT Scholarship IS open to Indian nationals but is POSTGRADUATE only (one-year full-time Master’s, £13,000) — not available for these undergraduate courses.",
  feesNote: "Fees shown are international fees for 2027/28; requirements are for 2027 entry (UCAS institution code BRISL B78). Bristol does NOT publish a per-course CBSE/ISC percentage table: its India page publishes only the equivalence range below, described as guidance only — meeting a stated figure does not guarantee an offer.",
  holistic: "Bristol assesses primarily on academic qualifications: for Computer Science, applications are scored GCSE 20% / A-Level 80%, and the personal statement and reference are NOT normally considered (used only to differentiate applicants with identical academic scores); applicants are not routinely interviewed. Law is assessed on GCSE results, A-Level (or equivalent) results and the LNAT score, with the same personal-statement position. Medicine is the exception: shortlisting is scored 100% on UCAT and all shortlisted applicants attend Multiple Mini Interviews.",
  streams: [
    { n: "Computer Science BSc", fee: 34700, req: {
      cbse: "90% — Bristol’s published equivalence for this course’s A*AA profile: Bristol’s India page states typical CBSE and CISCE offers range from 80% (ABB equivalent) to 90% (A*AA equivalent), as an average across the best 4 subjects; CBSE and CISCE are covered by the same statement. No admission test for standard applicants.",
      icse: "Treated together with CBSE under Bristol’s single India statement: 90% for this course’s A*AA profile (range 80% ABB – 90% A*AA, best 4 subjects average). No admission test for standard applicants.",
      ib: "38 points overall with 18 at Higher Level, including 7 at Higher Level in Mathematics (Analysis & Approaches or Applications & Interpretations). No admission test for standard applicants.",
      al: "A*AA, including A* in Mathematics (contextual offer AAB including A in Mathematics). No admission test for standard applicants."
    } },
    { n: "Medicine MB ChB", fee: 47600, feeNote: "⚠️ Roughly £13,000–£21,000 more per year than Bristol’s other courses in this list (2027/28). Five-year course.", req: {
      cbse: "⚠️ A Medicine-specific Indian figure is NOT published (NOT FOUND on official source) — Bristol publishes only the general CBSE/CISCE range (typical offers 80%–90%, best-4 average). ⚠️ UCAT is REQUIRED: applicants meeting the minimum academic requirements are scored 100% on UCAT to select for interview (Multiple Mini Interviews, November–April). Applicants must be 18 or over on 1 September of the year of entry; health checks, immunisation and a DBS check also apply.",
      icse: "Treated together with CBSE: no Medicine-specific CISCE figure is published (NOT FOUND) — only the general 80%–90% range. ⚠️ UCAT required (100% of shortlisting score); MMI interview; age 18+ on 1 September of the entry year.",
      ib: "36 points overall with 18 at Higher Level, including 6, 6 at Higher Level in Chemistry and one of Biology, Physics or Mathematics. ⚠️ UCAT required — shortlisting scored 100% on UCAT; Multiple Mini Interviews; must be 18+ on 1 September of the entry year.",
      al: "AAA, including Chemistry and one of Biology, Physics, Mathematics or Further Mathematics. ⚠️ UCAT required — shortlisting scored 100% on UCAT; Multiple Mini Interviews November–April; must be 18 or over on 1 September of the entry year."
    } },
    { n: "Law LLB", fee: 26500, req: {
      cbse: "90% — Bristol’s published equivalence for this course’s A*AA profile (India-page range 80% ABB – 90% A*AA, average across the best 4 subjects; CBSE and CISCE in the same statement). ⚠️ Admissions test: LNAT is REQUIRED for ALL applicants, taken before the January deadline on the LNAT website — ‘This deadline is final and no exceptions can be made’; Bristol staff read and assess the LNAT essay. (Bristol’s LLB is recognised by the Bar Council of India.)",
      icse: "Treated together with CBSE: 90% for the A*AA profile. ⚠️ LNAT required for all applicants, before the January deadline — no exceptions.",
      ib: "38 points overall with 18 at Higher Level. ⚠️ LNAT required for all applicants.",
      al: "A*AA or A*A*B; no subject-specific requirements (contextual offer AAB). ⚠️ LNAT required for ALL applicants, taken before the January deadline — the deadline is final; the LNAT essay is assessed by Bristol staff."
    } },
    { n: "Economics BSc", fee: 29300, req: {
      cbse: "90% — Bristol’s published equivalence for this course’s A*AA profile (India-page range 80% ABB – 90% A*AA, average across the best 4 subjects). A per-course subject-specific Indian percentage (e.g. a separate Mathematics percentage) is NOT published (NOT FOUND on official source). No admission test stated.",
      icse: "Treated together with CBSE: 90% for the A*AA profile. No admission test stated.",
      ib: "38 points overall with 18 at Higher Level, including Mathematics with either 6 at Higher Level (Analysis & Approaches or Applications & Interpretations) or 7 at Standard Level (Analysis & Approaches). No admission test stated.",
      al: "A*AA, including Mathematics. No admission test stated on the official course page."
    } },
    { n: "Mechanical Engineering BEng", fee: 33600, req: {
      cbse: "90% — Bristol’s published equivalence for this course’s A*AA profile (India-page range 80% ABB – 90% A*AA, average across the best 4 subjects). No admission test for standard applicants.",
      icse: "Treated together with CBSE: 90% for the A*AA profile. No admission test for standard applicants.",
      ib: "38 points overall with 18 at Higher Level, including 7, 6 (in any order) at Higher Level in Mathematics (Analysis & Approaches or Applications & Interpretations) and one of Physics, Chemistry or Computer Science. No admission test for standard applicants.",
      al: "A*AA, including A*A (in any order) in Mathematics and any one of Further Mathematics, Physics, Chemistry, Biology or Computer Science (contextual offer AAB including AA in Mathematics and one of those subjects). No admission test for standard applicants."
    } }
  ]
}

] };
