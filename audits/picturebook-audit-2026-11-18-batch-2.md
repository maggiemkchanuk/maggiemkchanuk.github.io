# Picturebook website audit — 18 November 2026, batch 2

## Scope and verification
Read the current default-branch `reading-lists.html`, `academic-books.html`, `authors.html`, `illustrators.html`, and the prior batch-1 audit. Checked three existing local JPEG cover assets by fetching their GitHub file contents as base64 and parsing JPEG dimensions/end markers. This verifies **existence and basic JPEG structure**, not visual clarity, correct artwork, colour, border, or edition match. No cover replacement or title deletion was justified in this batch.

## Three cover assets: concrete file verification
| Title | Referenced asset | Actual JPEG dimensions | Approximate file size | Result |
|---|---|---:|---:|---|
| Susan Laughs | `cover-9781842709900.jpg` | 250 × 285 px | 30,618 bytes | Exists and has complete JPEG ending; unusually near-square for a front cover; visually inspect and compare against Andersen Press edition |
| A Walk in the Words | `cover-9780399548710.jpg` | 350 × 450 px | 69,565 bytes | Exists and has complete JPEG ending; visual sharpness/edition still unchecked |
| Up and Down Mum | `cover-9781786283399.jpg` | 250 × 253 px | 27,270 bytes | Exists and has complete JPEG ending; near-square image needs crop/border review against Child's Play edition |

The existing reading-list markup includes source links to:
- Susan Laughs: https://www.andersenpress.co.uk/books/susan-laughs/
- A Walk in the Words: https://www.penguinrandomhouse.com/books/548522/a-walk-in-the-words-by-hudson-talbott/
- Up and Down Mum: https://www.childs-play.com/products/9781786283399

**Do not** assume these JPEGs are clean covers because the files exist. The two near-square files are priority visual-review candidates; an illustrated book can legitimately have a square trim size, so aspect ratio alone is not evidence of an error.

## International shortlist: official edition sources rechecked
Book Dash is a South African open-picturebook publisher, offering free digital reading/download and separately arranged print copies. These are not UK/US books merely set in South Africa. The records below are **research candidates, not additions**; the edition-specific clean cover and publication year remain unverified.

| Edition | Language | ISBN-13 | Original creation event | Creators | Source |
|---|---|---|---|---|---|
| Umhlobo kaMali (Mali's Friend) | isiXhosa | 9781776230204 | Johannesburg, October 2018 | Rujeko Moyo (writer), Ellen Heydenrych (illustrator), Rox Jaden Palmer (designer) | https://bookdash.org/books/umhlobo-kamali/ |
| Umngani kaMali (Mali's Friend) | isiZulu | 9781776230211 | Johannesburg, October 2018 | Same original creative team | https://bookdash.org/books/umngani-kamali/ |
| Ndifuna! (I Want To!) | isiXhosa | 9781776230440 | Cape Town, April 2019 | Sam Wilson (writer), Mary-Anne Hampton (illustrator), Pippa Serritslev (designer) | https://bookdash.org/books/ndifuna/ |
| Ngifuna! (I Want To!) | isiZulu | 9781776230662 | Cape Town, April 2019 | Same original creative team | https://bookdash.org/books/ngifuna/ |

Two original creative works, four language editions. **Do not count these as four independent original picturebooks.** No romanisation is needed for these Latin-script languages. Publication year is deliberately **pending**; a creation-event date is not automatically the edition's publication date.

Suggested visual-literary descriptions pending direct reading of full spreads:
- *Mali's Friend*: Mali's preference for solitary play is respected as part of the friendship narrative; examine whether the illustrations distinguish welcome companionship from adult expectations of sociability.
- *I Want To!*: a young child's wishes for food, play and reading with Mum foreground everyday agency; examine the interplay of repeated verbal demands and the images of bodily action.

Official information about reading and print access: https://bookdash.org/books/ and https://bookdash.org/how-to-buy-our-books/ . Free reading must not be presented as an affiliate purchase.

## Geographical baseline and unmet gaps
Batch-1 inventory still applies to the current HTML: **423 country-labelled book rows**, including repeats across categories and mixed origin/edition strings. Major labels: United States 158, United Kingdom 136, Australia 28, Canada 20, Portugal 7, New Zealand 7, Spain 4, Hong Kong 3, Greece 3, South Africa 2, mainland China 1, Croatia 1, Malta 1, standalone Brazil 0. These are **not deduplicated national publication totals**. No country counts changed in batch 2 because no books were added.

Highest unmet research priorities: original Portuguese-language Brazilian picturebooks; original Traditional Chinese Hong Kong and Simplified Chinese mainland titles with distinct records; Maltese, Croatian and Greek local imprints; South African-language original works rather than counting translations as new works; locally published Australian and Aotearoa New Zealand books.

## Unresolved and user decision required
1. Visually inspect *Susan Laughs* and *Up and Down Mum* local assets; their near-square dimensions merit review but do not prove a faulty crop.
2. Find a source-verified edition-specific clean cover for the two Croatian titles flagged in batch 1, which currently have pending placeholders.
3. Decide whether Book Dash free-to-read editions belong alongside retail titles and whether language editions should be nested under original works. No approval is needed merely to preserve the research queue, but do not invent retail availability.
4. No titles were classified mediocre, unavailable or out-of-print without evidence; no deletions or downgrades.

## Changes
This audit file is the only new repository artifact in this batch. No existing catalogue entries or image assets were changed, avoiding conflicts with parallel website updates.
