# SMART PAMANA Journey — Independent Question Fix and Deeper Cultural Learning

## Reported blocker
After the first correct answer, Journey immediately selected the next unanswered question while keeping global `feedback='correct'`. Its multiple-choice buttons used `disabled={...||feedback==='correct'}` and became disabled on the *new* question. The user could see progress but could not answer any more questions.

## Implemented quiz fix
- `activeQuestionIndex()` and `nextUnansweredIndex()` provide explicit state rules. The question currently showing success remains visible until the user presses **Next question**.
- Success feedback is tied to the exact question ID, not a global flag. **Check this answer** saves only the current correct question, explains *why*, and offers **Next question**. An incorrect answer offers a retry and references **without automatically revealing the correct option**. Each next question has fresh enabled answer buttons and an independent selection.
- A 1–11 question progress strip distinguishes saved answers, current question and unanswered questions. Correct answers persist through app restarts via existing `pamana.journey.v1` storage.
- All options are deterministically rotated using the town and question ID, so the right answer is not always A and the order is stable offline.
- All 11 correct answers are needed for new hometown-challenge completion; unrelated game results still do not count. Prior earned stamps remain intact.
- Regression tests cover feedback staying on the right question until Next, next unanswered after restart, and no premature finish screen.

## Expanded content coverage beyond festivals
The **Tuklas (Step 1)** reader for each of 15 hometowns now contains:
- The prior four public festival-background reading sections.
- Two NEW location-specific source-backed cultural/history/livelihood/heritage sections.
- Three NEW province-wide cultural sections that introduce distinct Mangyan groups, living poetry/scripts and archival transmission, and community consent/FPIC.

Every chapter therefore has at least **nine substantial Tuklas reading sections**, with the **full existing linked Matuto article** plus a hometown-specific introductory reading in Step 2. The user can mark each section read and retain offline progress.

The eleven challenge questions combine the actual official festival facts (3), linked Matuto concepts (3), local cultural topics (2), and wider Mangyan/community ethics (3), drawing directly from the new material. New local questions ask evidence-based, sometimes situational, comparisons about heritage institutions, livelihoods, history and consent.

### Research and cultural safeguards
Sources newly added to `src/data/content.ts` include:
- Oriental Mindoro Provincial Tourism Office: [History](https://www.travelorientalmindoro.ph/page/history), [Historical & Cultural Sites](https://www.travelorientalmindoro.ph/category/historical-cultural), [Heritage Museum (Calapan)](https://www.travelorientalmindoro.ph/place/oriental-mindoro-heritage-museum), [Heritage & Cultural Center (Mansalay)](https://www.travelorientalmindoro.ph/place/oriental-mindoro-heritage-and-cultural-center), [Mangyan Villages (Mansalay)](https://www.travelorientalmindoro.ph/place/mangyan-villages).
- NCCA: [Ginaw Bilog](https://ncca.gov.ph/about-culture-and-arts/culture-profile/gamaba/national-living-treasures-ginaw-bilog/), previously bundled [Mangyan ethnolinguistic profile](https://ncca.gov.ph/about-culture-and-arts/culture-profile/glimpses-peoples-of-the-philippines/mangyan/).
- Library of Congress: [Mangyan background](https://guides.loc.gov/mangyan-bamboo-collection/background) and [Collection](https://guides.loc.gov/mangyan-bamboo-collection).
- Ramsar: [Naujan Lake site information sheet](https://rsis.ramsar.org/RISapp/files/RISrep/PH1008RIS.pdf).
- Mangyan Heritage Center: [Community-consent policy](https://mangyanheritage.odoo.com/about).

Source IDs are attached directly to the relevant reading sections and question feedback. Text is freshly written educational interpretation grounded in these sources, NOT reproduced webpage prose. Where the public source does not substantiate a custom, ancestral belief, precise local group affiliation, or ritual, the text explicitly avoids making it up and explains the cultural review requirement. An Indigenous cultural tradition is not a public-domain game asset merely because a portal lists a public event. **Community review and consent remain required for further community-authored content.**

## Migration and offline safety
- No version or storage key changes; `festivalReadSections` sanitizer now retains expanded section indices beyond the old 4. Previously earned stamps and source content remain available.
- Existing festival-first and Matuto complete records are not revoked. New sections are readable on revisits.
- The chapter challenge uses saved unique question IDs and stores correct answers only. The free-play Quest library remains untouched.
- All data for these steps is bundled locally; web links are for optional reference verification and are not loaded to run the lesson or quiz.

## QA checklist and remaining limitations
- Automated tests: all 15 town culture packs, distinct documented references, minimum reading depth, 11 unique questions, correct answer mappings, nonidentical correct answer placements, quiz cursor reset/Next, and reading/stamp persistence.
- Run TypeScript/Vitest/Vite, Android debug APK workflow and verify artifact.
- Manual Android QA: tap first correct option, observe explanation, tap Next, answer Q2 through Q11, retry wrong answers, pause/resume app mid-quiz, finish stamp, verify local saved reading status and offline airplane mode.
- Need community and educator validation of local cultural summaries and translations before public release; the historical/context sources do **not** justify inventing religious beliefs, protected ritual details or claims about every resident.
