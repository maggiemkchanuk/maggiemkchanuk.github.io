# Picturebook website audit — 18 November 2026, batch 3

## Scope and current repository
Read current default-branch `reading-lists.html`, `academic-books.html`, `authors.html`, and `illustrators.html`, and reviewed batch-2 audit before research. This batch deliberately avoids modifying overlapping catalogue pages.

| Page | HTML image tags | Pending-cover marker occurrences | Image tags missing src |
|---|---:|---:|---:|
| reading-lists.html | 425 | 48 | 0 |
| academic-books.html | 128 | 34 | 0 |
| authors.html | 176 | 26 | 0 |
| illustrators.html | 44 | 7 | 0 |

Counts are markup diagnostics, **not** verified numbers of broken or visually defective covers. Pending marker occurrences may include styles/scripts. Repeated local image paths are not necessarily duplicates: some books legitimately occur in multiple themes.

### Source-verified international edition research: Brazilian Portuguese, but not Brazilian original
The Brazilian publisher Companhia das Letrinhas documents these Brazilian **editions** of Suzy Lee's internationally published wordless books:
- *Onda (nova edição)* — 9 June 2017; ISBN 9788574067735; Companhia das Letrinhas. Original work *Wave*; Brazilian edition, **not a Brazilian original**. https://www.companhiadasletras.com.br/9788574067735-onda--nova-edicao--7939/p
- *Sombra (nova edição)* — 19 April 2018; ISBN 9788574068121; Companhia das Letrinhas. Original *Shadow*; Brazilian edition, **not a Brazilian original**. https://www.companhiadasletras.com.br/9788574068121-sombra--nova-edicao--7340/p
- *Espelho (nova edição)* — 31 May 2021; ISBN 9788574069319; Companhia das Letrinhas. Original *Mirror*; Brazilian edition, **not a Brazilian original**. https://www.companhiadasletras.com.br/9788574069319-espelho--nova-edicao--11064/p

The publisher confirms the book gutter's role in *Onda* and the interplay of reality/reflection in *Espelho*. The visual-literary value is strong: the physical centre fold becomes part of the action rather than a passive division, and wordless sequential images carry narrative interpretation. The source labels *Onda* as a reprint/on-demand or awaiting reprint in different storefront presentations, so physical availability is **uncertain**. No title was labelled out of print.

**Editorial distinction:** these records would enrich the Brazilian *edition-language* filter but must not be counted as three original Brazilian works. The South Korean creator and the works' original publication histories need separate provenance fields. Do not insert them into a Brazilian-original category. Clean publisher cover image assets have not been separately downloaded and visually verified; therefore no entries were added.

### South African originals — further language evidence
Book Dash's *Mali's Friend* is one South African original creative work by Rujeko Moyo (writer), Ellen Heydenrych (illustrator), Rox Jaden Palmer (designer), created in Johannesburg in October 2018. In addition to the previously audited isiXhosa/isiZulu editions, official publisher records confirm:
- *Mogwera wa Mali* — Sepedi, ISBN 9781776230167: https://bookdash.org/books/mogwera-wa-mali/
- *Tsala ya ga Mali* — Setswana, ISBN 9781776230198: https://bookdash.org/books/tsala-ya-ga-mali/
- *Motswalle wa Mali* — Sesotho, ISBN 9781776230174: https://bookdash.org/books/motswalle-wa-mali/
- *Mali se maat* — Afrikaans, ISBN 9781776230150: https://bookdash.org/books/mali-se-maat/

The ISBNs are edition-specific. The creation event date is **not asserted as each edition's publication date**. All language editions belong to one original work, not separate original titles. Clean front-cover image assets remain unverified. No additions made.

### Geographical inventory caveat
A strict scan of `li class="book-row"` elements with a `data-origin-country` attribute yielded **398 attributed rows**, not a deduplicated national census. Exact standalone labels included United States 157, United Kingdom 126, Australia 28, Canada 20, New Zealand 7, Hong Kong 3, mainland China 1, South Africa 2, Malta 1, Greece 1, Spain 3. Other records include multi-country labels and other markup patterns. The earlier baseline of 423 book rows refers to a wider count, so do not conflate the two denominators. Country fields do not reliably distinguish original-language publication, translation or edition. Brazil remains without a verified standalone Brazilian-original record in this audit.

Unmet original-work priorities: Brazilian Portuguese picturebooks by Brazilian creators and publishers; original Hong Kong Traditional Chinese and mainland Simplified Chinese titles with separate provenance; Croatian and Maltese original editions; locally produced Greek, Spanish and Latin American works; original South African-language picturebooks; Australian and Aotearoa New Zealand originals.

### Covers and catalogue decisions
- Continue visual comparison of *Susan Laughs*, *Up and Down Mum*, *A Walk in the Words* and the two Croatian pending covers against edition-specific official publisher images.
- No image is marked verified merely because a JPEG exists; no image was replaced, no book was removed or downgraded.
- No evidence-backed mediocre/out-of-print classification was established in this batch.

## User decision required (next review)
1. Should international translated/republished editions appear as linked edition variants, without inflating counts of original works? Recommended: **yes**, with separate edition and original-country fields.
2. Should free Book Dash versions be offered as **Read free / Download free** alongside retail books, with no affiliate implication? Recommended: **yes**.
3. Prioritise verifying clean publisher front-cover assets before adding the Brazilian-edition and South African-language candidates; keep these as pending until checked.

## Changes
Only this new audit report was committed. **Zero** catalogue records, covers, removals or status labels changed.
