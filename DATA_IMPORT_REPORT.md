# PAMANA official data import report

Prepared from the public pages of the Mangyan Heritage Center and Travel Oriental Mindoro during the October 2026 data review.

## Purpose

This import adds a small, source-linked offline learning layer. It does not mirror either website, copy user accounts or reviews, or publish protected cultural material.

## Imported and visible offline

- Public historical/cultural place names from the Travel Oriental Mindoro directory.
- Three featured Bulalacao destinations shown by the tourism portal.
- The 18 annual festival names, municipalities, and calendar dates shown by the official festival directory.
- Selected public descriptions for Mangyan Villages, the Oriental Mindoro Heritage and Cultural Center, Kapakyanan Festival, Kaaldawan-Iraya Festival, Mangyan Festival, Pandang Gitab, and Fiesta MAHAL TANA.
- Source-linked lessons and quest questions that teach learners to verify current access and event details.

## Staged, not published as cultural fact

- Mangyan ethnolinguistic group profiles.
- Ambahan text, translations, archive records, and audio.
- Craft images, designs, and community photographs.
- Any personal contact information for community leaders.

These records remain represented in the review/permission queue and require community approval, rights documentation, and appropriate attribution before publication.

## Dynamic data intentionally excluded

Ferry schedules, weather, travel advisories, emergency information, accommodation availability, business listings, reviews, check-ins, and other operational records are not bundled as authoritative offline data. They require a maintained feed or a fresh verification flow.

## Implementation

- Curated records live in `src/data/official-heritage.ts`.
- Existing source, place, lesson, story, collection, and quest modules consume the records through the existing data layer.
- Explore now includes an official festival calendar with a verification reminder.
- Existing source chips and attribution links remain the canonical provenance UI.
