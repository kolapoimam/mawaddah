# Contributing to Mawaddah

JazakAllahu khairan for wanting to help. Mawaddah grows when developers, designers, writers, students of knowledge and marriage counsellors pitch in. Every contribution counts, from fixing a typo to building a whole feature.

## Ways to help

| You are a... | You can help by |
| --- | --- |
| Developer | Fixing bugs, improving accessibility, building features from the roadmap |
| Designer | Improving layouts, the report design, illustrations and dark mode |
| Student of knowledge | Reviewing questions, ayat and hadith references for accuracy |
| Marriage counsellor | Suggesting better questions, scoring and guidance for each area |
| Writer or translator | Improving copy, or adding a new language |

Not sure where to start? Look for issues labelled `good first issue` or `help wanted`.

## Getting set up

You need Node.js 18 or newer and npm.

```sh
git clone https://github.com/kolapoimam/mawaddah.git
cd mawaddah
npm install
npm run dev
```

The app runs at http://localhost:8080.

Before you open a pull request, make sure these pass.

```sh
npm run lint
npm run build
```

## Project map

| Path | What lives there |
| --- | --- |
| `src/data/assessmentQuestions.ts` | Every assessment question, its answers and points |
| `src/data/categories.ts` | The six areas, guidance for each score band, and the Quran or hadith reminder |
| `src/data/faq.ts` | FAQ answers (home page, FAQ page, structured data and llms-full.txt) |
| `src/data/testimonials.ts` | Testimonials shown on the home page |
| `src/data/images.ts` | Photos used on the site, with their Pexels source links |
| `src/lib/scoring.ts` | How answers become scores |
| `src/lib/exportReport.ts` | PNG and PDF download logic |
| `src/components/assessment/` | The assessment form, results page and downloadable report |
| `src/seo/routes.ts` | Page titles, descriptions and crawler summaries |
| `scripts/seo-build.mjs` | Builds sitemap, llms.txt, llms-full.txt and prerendered pages |
| `scripts/generate-avatars.mjs` | Builds the DiceBear avatars for testimonials |

## Common changes

### Adding or editing a question

1. Open `src/data/assessmentQuestions.ts`.
2. Give the question a unique `id` and one of the six categories (`communication`, `spiritual`, `conflict`, `goals`, `emotional`, `financial`).
3. Use `answerType: "scale"` for Always, Sometimes, Rarely questions, or `"options"` with your own answers and `points` (5 for the healthiest answer, 3 for the middle, 1 for the lowest).
4. To only ask a question after a certain answer, add `showIf: { questionId, value }`.

Questions in the `demographics` category are not scored.

### Editing guidance or reminders

Each area in `src/data/categories.ts` has an insight and two actions for each score band, plus one reminder. If you add or change an ayah or hadith, include the exact reference, for example `Quran 30:21` or `Sahih al-Bukhari 6116`, and mention your source in the pull request.

### Adding a testimonial

Add it to `src/data/testimonials.ts`, then run `npm run avatars` to generate the DiceBear avatars for both names.

### Changing photos

Photos come from Pexels and are listed in `src/data/images.ts`. Keep the Pexels page link in the comment above each one. If a photo fails to load, the site shows a solid green panel instead of a broken image.

## Design rules

- Keep the existing look: Montserrat for text, Scheherazade New for headings, and the green, gold and pink palette in `tailwind.config.ts`.
- Use solid colours only. No gradients.
- Every change should work on mobile and in dark mode.

## Pull request checklist

- [ ] The change is focused on one thing
- [ ] `npm run lint` and `npm run build` pass
- [ ] UI changes include a before and after screenshot
- [ ] It works on mobile and in dark mode
- [ ] Religious content includes a source
- [ ] No assessment answers are stored or sent anywhere

## Code of conduct

By taking part you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Be kind, be honest and assume good intentions.
