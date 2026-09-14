# DESIGN.md — Edna Dias Podologia

Recorded from the built page, not from intention. Everything below is what
`assets/css/styles.css` and `index.html` actually do.

## The world

A conventional clinic-landing arrangement, executed at the finish level of a premium
clinic brand. This form was chosen deliberately by the user over a dealt alternative
direction, and the quality bar was set at premium clinic websites.

The one thing this world refuses is the pastel mint-spa rendition the category defaults
to. Green here is **committed, not decorative**: `#0b3b32` owns whole regions of the
page — the hero, the diabetic-foot section, the final call to action, the footer — while
cool white and a pale green band carry the reading passages between them. There are no
mint gradients standing in for design, and no coloured tabs on cards.

## Colour

Strategy: **committed**. One saturated green carries roughly half the surface as full
regions, not as accents scattered over neutral.

| Token | Value | Role |
|---|---|---|
| `--green-900` | `#0b3b32` | The deep field. Hero, diabetic section, final CTA. |
| `--green-800` | `#0f4b40` | Photo plates on dark, footer mark. |
| `--green-700` | `#145c52` | Links inside the spec sheet. |
| `--green-600` | `#17705e` | Links and small text on light — 5.0:1 on white. |
| `--green-400` | `#4d9d89` | List marks, hero and diabetic light sources, placeholder captions. |
| `--green-200` | `#a9d9ce` | Secondary text **on dark grounds**. Never grey on green. |
| `--green-100` | `#d5ece4` | Light photo plates. |
| `--green-50` | `#edf6f2` | The soft band that separates sections. |
| `--paper` | `#fbfaf7` | Page ground. |
| `--surface` | `#ffffff` | Cards, trust strip. |
| `--ink` | `#14201d` | Body text — 15.5:1 on paper. |
| `--ink-muted` | `#566d68` | Secondary text on light — 5.4:1. |
| `--border` / `--border-strong` | `#e2e8e5` / `#cbd8d4` | Hairlines and structural rules. |
| `--clay` | `#b5613c` | The one warm accent. Tagline rule and step numerals. 4.4:1 on the soft band. |
| `--clay-soft` | `#e0a184` | Decorative weight only — never text, it measures 1.99:1. |
| `--whatsapp` | `#25d366` | The action colour, and only that. |
| `--star` | `#e8a33d` | Rating stars. |

Two rules the page keeps:

1. **WhatsApp green is never the brand.** It appears only where the action is. Every
   primary WhatsApp button uses it; nothing else does. That is what makes it read as
   "press this" rather than as decoration.
2. **Secondary text on a green ground is tinted from the green**, never grey.
3. **The clay is spent, not stockpiled.** It marks the two moments where Edna is
   personally present — her tagline and the three steps to reach her — and appears
   nowhere else. It is what keeps the light half of the page from settling into one hue.

Light was chosen from the use scene, not from category habit: someone at home, at night,
on a phone, already uncomfortable. A dark page would read as clinical and cold; the deep
green regions give weight without dimming the reading passages.

## Type

**Manrope alone**, variable weight 400–800, self-hosted as two `woff2` subsets
(latin 24.8 KB, latin-ext 15.1 KB) with `unicode-range` so only what is needed loads.
The latin subset is preloaded. No second family: the scale and weight do the work.

| Token | Value |
|---|---|
| `--text-display` | `clamp(2.5rem, 6.4vw, 5rem)` — hero and final CTA |
| `--text-h1` | `clamp(2.25rem, 5.6vw, 4rem)` |
| `--text-h2` | `clamp(1.875rem, 3.9vw, 3rem)` |
| `--text-h3` | `clamp(1.1875rem, 1.9vw, 1.5rem)` |
| `--text-body-lg` | `clamp(1.0625rem, 1.35vw, 1.1875rem)` |
| `--text-body` | `1.0625rem` |
| `--text-small` | `0.9375rem` |
| `--text-label` | `0.8125rem` |

Display sizes track at `-0.038em`, headings at `-0.032em` — tight enough to feel set
rather than typed, above the `-0.04em` floor. Headings use `text-wrap: balance`, body
uses `text-wrap: pretty`. Measure is capped per context (`46ch` on leads, `52ch` on
section intros, `34ch` on step copy) so nothing runs past a comfortable line.

**Never used:** all-caps labels, kicker/eyebrow lines above headings, gradient text,
a single accented word inside a headline. A heading carries its own weight.

## Space

Scale: `4 8 12 16 24 32 48 64 80 96 128` as `--sp-1` … `--sp-32`.
Section rhythm: `--section-y: clamp(4rem, 9vw, 7.5rem)`, gutters `clamp(1.25rem, 4vw, 2.5rem)`,
container `1200px`. More space above a heading than below it, throughout.

## Shape and depth

Radii: `8 / 14 / 24 / 32 / pill`. Buttons are pills; cards are `24px`; photo plates
`32px`. Shadows always carry an offset **and** a blur, tinted with the brand green
rather than black:

```
--shadow-subtle:  0 1px 2px rgba(11,59,50,.05), 0 4px 14px rgba(11,59,50,.05)
--shadow-medium:  0 2px 4px rgba(11,59,50,.06), 0 14px 36px rgba(11,59,50,.10)
--shadow-lifted:  0 3px 6px rgba(11,59,50,.07), 0 22px 52px rgba(11,59,50,.13)
```

No zero-offset halos, no hard block shadows, no coloured side-tabs.

## Composition — how the page avoids stacked blocks

Each section is shaped by its content, not poured into the same container:

- **Hero** — asymmetric split, text `1.08fr` against portrait `0.92fr`, on the deep field.
  One radial light source at top-right gives the section physical direction.
- **Trust strip** — three proofs on a thin white band, divided by vertical hairlines.
  None of them restates the hero meta, and none is a card.
- **Symptoms** — editorial two-column: heading and lead left, a bordered two-up list right.
- **Services** — the lead service is a dark card spanning **2 columns × 2 rows**, so the
  six services fill a 3×3 field exactly. No orphan tile, and not six identical boxes.
  The five secondary cards carry no icons: at 26px they read as ambiguous marks and the
  headings already said it.
- **Diabetic foot** — full-bleed green, text against a stretched photo plate, points
  separated by rules rather than boxed.
- **About** — photo left, text right, closing on a pull quote set under a 56px rule.
- **Steps** — a real three-part sequence, so numerals are legitimate. One numeral each,
  large, in clay, above a top rule.
- **Reviews** — the heading *is* the proof (`5,0 no Google, em 33 avaliações`); the body
  says outright that no comment was copied over. No metric tile, no invented cards.
- **Gallery** — an asymmetric mosaic (one tall, one wide, two square), not equal thumbnails.
  On `.section--framed`: white ground with hairlines, so it separates from the section
  above by material rather than by another green band.
- **Location** — a label/value spec sheet against the map.
- **FAQ** — native `<details>`, full-width rules, zero JS, no cards.
- **Final CTA** — the only centred section on the page, which is what makes it land.

## Motion

**One authored moment.** The hero's four blocks rise in sequence (20ms → 230ms delays,
`cubic-bezier(.22, 1, .36, 1)`), and the portrait fades in beside them. The text never
starts invisible — only `translateY` animates, so the headline and the CTA are legible on
first paint. A person in pain should not wait on an easing curve.
Nothing else animates on scroll — no per-section entrances, which is both the honest
choice and the fastest one. Interactive elements transition on hover, focus and open.

`prefers-reduced-motion: reduce` collapses every animation and transition to `0.001ms`
and disables smooth scrolling. Content is visible by default in every case.

## Accessibility floor

Semantic landmarks; one `h1`; skip link; `:focus-visible` at 3px, switching to
`--green-200` inside `.on-dark`; every interactive target at least 44px tall except
inline prose links, which sit at 39–41px; `alt` on every image; the map iframe titled;
state never signalled by colour alone. All body text meets WCAG AA, verified by
computed-style audit rather than by eye.

## The WhatsApp message is part of the design

Every button opens a prefilled message, and the message matches what the button promised.
A control that says *Falar sobre o meu caso* must not open *gostaria de saber os horários*.

Five variants, all opening `Olá, vim pelo site da Edna Dias Podologia` so the voice is one:
the general booking message on the hero, header, sticky bar, closing CTA, footer, steps,
location, FAQ and about; and contextual ones for the symptom list, the ingrown-nail card,
the "describe your case" link, and the diabetic-foot section.

The message that lands in Edna's inbox is the conversion artifact. It is worth designing.

## Photography

The page ships with **designed photo slots**, not stock. Edna's photographs were never
supplied and could not be retrieved from her public profiles. Each slot renders as a
green plate carrying a camera mark, the shot it wants, and the exact filename and
dimensions — intentional while empty, and replaced by one `<img>` when the real file
lands. `assets/img/LEIA-ME.md` is the manifest.

No stock person may ever stand in for Edna. The whole page rests on her being real.

## What this world will not accept

Identical cards as the page's structure · three cards per section · kicker labels above
headings · all-caps labels · gradient text · emoji or Unicode glyphs as icons · coloured
side-tab borders · zero-offset shadow halos · mint pastel as the primary green ·
WhatsApp green used as brand colour · invented facts of any kind.
