# Picturebook website audit — 18 November 2026, batch 1

## Scope and limitations
Read current default-branch HTML for reading-lists.html, academic-books.html, authors.html, and illustrators.html. Counts below describe markup, not a visual/browser validation. A `cover-pending` fallback does not prove an image is missing; it signals that the template has an explicit fallback. No cover URLs have been replaced because the available evidence did not verify an edition-specific clean replacement and image quality.

## Cover inventory
| Page | Cover-labelled image elements | External image URLs | `cover-pending` string occurrences |
|---|---:|---:|---:|
| reading-lists.html | 424 | 67 | 48 |
| academic-books.html | 127 | 20 | 34 |
| authors.html | 173 | 13 | 26 |
| illustrators.html | 44 | 5 | 7 |

All cover-labelled `img` tags inspected have `src` attributes. This does **not** establish that local files exist, remote URLs work, or that images are sharp and correctly cropped.

### Small follow-up cover batch
1. *Susan Laughs* — reading list uses `cover-9781842709900.jpg` and an explicit fallback; inspect actual local file, edition and visual quality.
2. *A Walk in the Words* — `cover-9780399548710.jpg`; verify file and front-cover crop against Nancy Paulsen Books 2021 edition.
3. *Up and Down Mum* — `cover-9781786283399.jpg`; verify against Child's Play 2019 edition.
4. *Kućna čudovišta: ilustrirani priručnik* — illustrator page shows pending without a cover image; edition metadata lists Sipar, Zagreb, 1997. Seek publisher/author-controlled image, not a generic substitute.
5. *Enciklopedija čovjeka – pisana rukom čudovišta* — illustrator page shows pending without a cover image; edition metadata lists Sipar, Zagreb, 2009. Seek publisher/author-controlled image.

## Original-work origin inventory — reading-list HTML
423 `data-origin-country` labels, counting combined-origin strings as single records. These are **entry counts**, not distinct titles, editions or creators; duplicated cross-category titles may be counted repeatedly.

| Origin label | Entries |
|---|---:|
| United States | 158 |
| United Kingdom | 136 |
| Australia | 28 |
| Canada | 20 |
| France | 8 |
| Portugal | 7 |
| New Zealand | 7 |
| India | 6 |
| Switzerland | 5 |
| Spain | 4 |
| Hong Kong | 3 |
| Greece | 3 |
| South Africa | 2 |
| Mexico | 2 |
| Singapore | 2 |
| South Korea | 2 |
| China | 1 |
| Croatia | 1 |
| Malta | 1 |
| Brazil | 0 as a standalone label |
| All other and combined labels | 28 |

Note: country counts must be interpreted cautiously. In particular, `Poland / English translation`, `United Kingdom edition`, and `China / Taiwan` mix edition and original-work fields and require separate, source-grounded origin and edition attributes.

## Verified international candidates — **research queue, not yet added**
Official publisher/creator records, checked 18 Nov 2026:
- **Umhlobo kaMali** (*Mali's Friend*), isiXhosa edition, Book Dash, ISBN **9781776230204**. Original Book Dash creation at Jozi, October **2018**. Writer **Rujeko Moyo**, illustrator **Ellen Heydenrych**, designer Rox Jaden Palmer, editor Margot Bertelsmann. Story: Mali prefers solitary play until Lesedi arrives; strong candidate for friendship, personal space and non-prescriptive social belonging. Source: https://bookdash.org/books/umhlobo-kamali/ . Do not confuse original creation date with a separately verified publication date of the isiXhosa edition. A verified clean cover URL is still needed.
- **Ndifuna!** (*I Want To!*), isiXhosa edition, Book Dash, ISBN **9781776230440**. Created Cape Town April **2019**. Writer **Sam Wilson**, illustrator **Mary-Anne Hampton**; editor Robert Plummer and designer Pippa Serritslev. Child's wishes for food, play and reading with Mum; candidate for bodies, routines and family agency. Source: https://bookdash.org/books/ndifuna/ . Publication date of this particular edition and suitable cover URL need confirmation.
- **Ngifuna!**, isiZulu edition of the same work, Book Dash, ISBN **9781776230662**; same creators and creation date. Source: https://bookdash.org/books/ngifuna/ . Treat as a separate language/edition record, not a distinct original picturebook.
- **Te Pohū**, te reo Māori translation of *The Bomb* by Sasha Cotter and Josh Morgan, translated by Kawata Teepa. Gecko Press's curated 9 September **2019** list establishes it is a translation, not an originally Māori-language story. Source: https://geckopress.com/book-list-celebrating-books-published-in-te-reo-maori/ . ISBN, imprint and cover need edition-specific verification.

## User decision required
- Whether to feature free, Creative Commons Book Dash editions alongside commercially sold picturebooks, clearly marking free-to-read/download rather than inventing affiliate links.
- Whether multiple language editions of one original work should appear as linked edition records under one work, rather than inflating distinct-book totals.
- No removal or downgrading of existing titles is proposed; image appearance, availability and literary suitability remain unverified until evidence is obtained.

## Next safe actions
Validate local cover files and dimensions, inspect full-resolution cover quality, and replace only when the edition matches an authoritative publisher source. Add the strongest Book Dash work only after obtaining a clean edition-specific cover and distinguishing creation year from edition publication year. Prioritise Brazil, mainland Chinese-language originals, Malta, Croatia, Greece and local-language South African originals, then reassess the geographic distribution.
