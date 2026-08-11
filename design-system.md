# schurrsound.com: design system and architecture

Standing reference. Claude Code should read this before any change to layout,
type, colour or page structure. Ande should read Part 1 and Part 5 only.

Last updated: 4 August 2026

---

# PART 1: The assessment, in plain terms

## What is good

The visual identity is genuinely strong and does not need redesigning. Deep green,
gold, cream, Cormorant Garamond for display, Inter for text. It reads as
considered and expensive without shouting, which is correct for a head of
department selling judgment rather than gear. Keep all of it.

## What is broken

**Two sources of truth for the design.** `index.html` and `press.html` each carry
their own inline `<style>` block. The pages added in August use
`assets/site.css`. The same colour is defined in three files. The same button is
defined in three files. Nothing checks them against each other, which is exactly
how a 17px paragraph size ended up shipping against a 16px site without anyone
noticing.

**Six copies of the nav.** Every page has the nav and footer pasted into it by
hand. Adding "Field Notes" to the menu currently means editing six files. By
October, with the landing pages and monthly articles, it means editing fifteen.
One of them will get missed, and it will be the one a producer lands on.

**No defined scale.** Font sizes in the CSS include 11.5, 12, 12.5, 13, 13.5,
14, 14.5, 15, 15.5, 16, 16.5, 17, 18 and 22px, plus five different `clamp()`
expressions. Most of those distinctions are invisible and none of them were
chosen deliberately. This is what makes a site feel subtly amateur even when
every individual page looks fine.

**Spacing is ad hoc.** Section padding appears as 84px, 76px, 72px, 70px, 66px
and 64px in different places. No reader can tell those apart. They exist because
each was typed separately.

## What it costs if ignored

Nothing dramatic, and nothing urgent this week. The cost is that every future
change gets slower and riskier, and inconsistencies accumulate faster than they
get caught. The site will not break. It will just stop feeling designed.

---

# PART 2: The scales (adopt these, stop inventing numbers)

## Type scale

Every font size in the site must come from this table. No exceptions, no
in-between values, no half-pixels.

| Token | Size | Use |
|---|---|---|
| `--fs-micro` | 11.5px | Sub-nav links, tags |
| `--fs-label` | 12.5px | Eyebrows, meta lines, footer fine print, captions |
| `--fs-nav` | 13.5px | Nav links |
| `--fs-small` | 14.5px | Fact grid body, credit sub-lines |
| `--fs-body` | 16px | **All body text, everywhere, including articles** |
| `--fs-lead` | 18px | Hero lead paragraphs, standfirst |
| `--fs-h3` | `clamp(19px, 2vw, 22px)` | Card titles, minor headings |
| `--fs-h2` | `clamp(24px, 2.8vw, 30px)` | Section headings, article subheads |
| `--fs-h1` | `clamp(30px, 4.2vw, 44px)` | Page titles |
| `--fs-hero` | `clamp(38px, 5.6vw, 58px)` | Homepage hero only |
| `--fs-ui` | 14px | Buttons, wordmark, UI chrome |
| `--fs-display-sm` | `clamp(20px, 2.2vw, 22px)` | Pull quotes, year columns, hero subs |
| `--fs-display-lg` | `clamp(22px, 2.6vw, 26px)` | Full-width quote bands |

Line heights: body 1.75, leads 1.6, headings 1.2.

## Spacing scale

| Token | Value | Use |
|---|---|---|
| `--sp-1` | 8px | Tight gaps |
| `--sp-2` | 16px | Paragraph spacing |
| `--sp-3` | 24px | Gutters, small gaps between blocks |
| `--sp-4` | 40px | Heading top margin |
| `--sp-5` | 64px | Section padding, compact |
| `--sp-6` | 80px | Section padding, standard |

## Measure

| Container | Width | Chars per line at 16px |
|---|---|---|
| `.wrap` | 1060px | Layout container, not for prose |
| `.rd` | **680px** | All long-form reading. Currently 720, change it |

## Colour

Already correct. Do not add colours. The existing six tokens plus `--line` are
the entire palette and that constraint is doing real work.

Two deliberate additions since, both encoding data rather than decorating:

- `--status-shooting`, `--status-prep`, `--status-hearing`: production status on
  the map and its homepage preview.
- `--blue`, `--blue-deep`, `--blue-tint`: wayfinding. The map is the only blue
  thing on the site, in the nav button and on the Stages layer, so "blue means
  map" is learnable. Added 11 August 2026 at Ande's request.

Anything further needs the same test: is it carrying information, or is it
decoration? Decoration does not get a token.

---

# PART 3: The phased plan

## Phase 1: Single stylesheet (DONE, 4 August 2026)

**Goal:** one file defines the design. Roughly two hours with Claude Code.

1. Add the type and spacing tokens above to `:root` in `assets/site.css`
2. Refactor `site.css` to use the tokens instead of literal values
3. Move the inline `<style>` block from `index.html` into `site.css`, merging
   duplicates rather than appending. Homepage-only rules go under a
   `body.home` class
4. Same for `press.html` and the `wild-track/*.html` pages
5. Every page now carries only `<link rel="stylesheet" href="/assets/site.css">`
6. Visually diff every page before and after. The intended change is zero

**Acceptance test:** `grep -c "<style>" *.html wild-track/*.html notes/*.html`
returns 0 for every file except `wild-track/ep1-email.html`, which is a
MailerLite template and must keep its inline styles.

Done 4 August 2026. Body classes in use: `body.home`, `body.press`,
`body.wild-track` (four issue and archive pages) and `body.map` (the
interactive map, which needed its own namespace).

## Phase 2: Single source for nav and footer (September, after the ceremony)

The right tool is a static site generator. **Eleventy** is the correct choice:
it takes plain HTML with a layout wrapper, has no framework to learn, builds to
static files, and drops straight into the existing Cloudflare Pages setup with a
build command. Astro and Next are both more than this site needs.

What it buys:
- Nav and footer defined once, in `_includes/layout.njk`
- Articles written in Markdown instead of hand-written HTML with pasted nav
- Sitemap generated automatically from the pages that exist, so it can never
  drift out of sync again
- New article = one Markdown file, nothing else

Half a day with Claude Code. Do it after 6 September, not before. Migrating
mid-campaign is how sites go down in the week that matters.

**Until Phase 2 is done**, any nav or footer change must be applied to every page
in the same commit, and verified with:

```bash
grep -L 'href="/notes/"' *.html wild-track/*.html notes/*.html
```

Any filename that prints is missing the link.

## Phase 3: Content model (October onward)

Once Eleventy is in: articles become Markdown with front matter (title,
description, date, tags). The Field Notes index, the sitemap, the JSON-LD and
the RSS feed all generate from that front matter. Publishing becomes writing.

---

# PART 4: Information architecture

## The Field Notes / Wild Track overlap

There is a real risk here and it is worth naming.

`/wild-track/ep1` contains condensed versions of topics that Field Notes articles
will cover at length. Google sees two pages from one site on the same subject and
has to choose. If it picks the newsletter issue, a producer lands on a page
designed to make them subscribe rather than the page designed to demonstrate
expertise.

**The rule that prevents this:**

| | The Wild Track | Field Notes |
|---|---|---|
| Purpose | Subscribe, stay in mind | Rank, get cited, demonstrate expertise |
| Content | Pointers and headlines | The full argument |
| Length | Short by design | 1,200 to 2,000 words |
| Depth | Never the whole story | Always the whole story |
| Linking | **Always links out to the article** | Links back to subscribe |

A Wild Track item must never be a complete treatment of a topic. If it is,
Field Notes has nothing left to say and the two pages compete.

**Retrofit for ep1:** add a link from each ep1 item to the corresponding Field
Notes article as those publish. The waterfall item should link to
`/notes/dialogue-beside-a-waterfall` now.

## URL conventions

| Rule | Example |
|---|---|
| Lowercase, hyphens, no dates in URLs | `/notes/dialogue-beside-a-waterfall` |
| Descriptive, not clever | `/dry-hire` not `/kit` |
| Landing pages at root, articles under `/notes/` | `/production-sound-mixer-singapore` |
| Never change a published URL | If it must change, 301 in `_redirects` |

Dates stay out of URLs deliberately. An article without a date in the path can be
updated and re-dated without losing its accumulated authority.

## Planned page set

| URL | Status |
|---|---|
| `/` | Live |
| `/credits` | Batch 2, awaiting push |
| `/production-sound-mixer-singapore` | Batch 2, awaiting push |
| `/notes/` | Batch 2, awaiting push |
| `/notes/dialogue-beside-a-waterfall` | Batch 2, awaiting push |
| `/press` | Live |
| `/wild-track` + archive + map | Live |
| `/production-sound-mixer-australia` | Batch 3 |
| `/sound-recordist-asia` | Batch 3 |
| `/documentary-sound-mixer` | Batch 3 |
| `/dry-hire` | Batch 3 |
| `/event-audio-singapore` | Batch 3 |
| `/about` | Batch 3 |

Twelve to fifteen pages is the natural ceiling for this site. Beyond that it
becomes a content site rather than a portfolio, which is not the goal.

---

# PART 5: Standing rules

Applies to every change, by anyone, forever.

This file lives in the repo. Read it before any change to layout, type,
colour or page structure.

1. **No inline `<style>` blocks.** All styling lives in `assets/site.css`
2. **No font size outside the type scale.** If a new size seems necessary, the
   scale is wrong and should be revised deliberately, not bypassed
3. **No em dashes in any output.** Commas, colons or parentheses
4. **Every page needs:** `<title>`, meta description, canonical, og tags,
   exactly one `<h1>`, and JSON-LD appropriate to its type
5. **Every new page goes into `sitemap.xml`** in the same commit
6. **Nav and footer changes apply to all pages** in the same commit, verified
   with the grep above, until Phase 2 removes the problem
7. **Body text is 16px everywhere,** including articles. Reading comfort comes
   from line-height and measure, not from size
8. **Never change a published URL** without a 301 in `_redirects`
9. **A Wild Track item never tells the whole story.** It links to the article
   that does
10. **Commit and push are different things.** Work is not done until
    `git log origin/main..HEAD` is empty

---

# PART 6: Immediate task list for Claude Code

In order. Do not push until all are complete.

1. Apply the type and spacing tokens to `:root` in `assets/site.css`
2. `.prose p` → 16px, line-height 1.75
3. `.prose li` → 16px
4. `.rd` max-width → 680px
5. `.prose h2` → `clamp(24px, 2.8vw, 30px)`
6. Replace the coffee line in the EDIT 6 callout with:
   `Ask me on the floor, not in an email. I answer faster and I am more useful.`
7. Add `<li><a href="/notes/">Field Notes</a></li>` to the nav in `index.html`,
   `press.html`, and every `wild-track/*.html` page, between Credits and Press
8. Add a link from the waterfall item in `wild-track/ep1.html` to
   `/notes/dialogue-beside-a-waterfall`
9. Run the acceptance checks below
10. Commit everything as one commit, then push

## Acceptance checks

```bash
cd ~/websites/schurrsound.com

# no page missing the Field Notes nav link
grep -L 'href="/notes/"' *.html wild-track/*.html notes/*.html

# no em dashes anywhere
grep -rl "$(printf '\u2014')" --include="*.html" --include="*.css" --include="*.md" .
echo "(empty above is correct)"

# one h1 per page
for f in *.html notes/*.html; do echo "$(grep -c '<h1' "$f") $f"; done

# json-ld parses everywhere
python3 - <<'PY'
import re,json,glob
for f in glob.glob('*.html')+glob.glob('notes/*.html')+glob.glob('wild-track/*.html'):
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>',open(f).read(),re.S):
        try: json.loads(b)
        except Exception as e: print("FAIL",f,e)
print("json-ld check done")
PY

# nothing left uncommitted or unpushed
git status --short
git log --oneline origin/main..HEAD
```

The last two commands must both return nothing before the work is considered done.
