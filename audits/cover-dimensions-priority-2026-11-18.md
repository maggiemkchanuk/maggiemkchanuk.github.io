# Cover-image dimension audit — 18 November 2026

Scope: user-nominated picturebooks on `reading-lists.html`. Dimensions below were **decoded from actual JPEG files in the GitHub repository**, not inferred from HTML width/height attributes. Small, square or landscape files warrant a visual check; pixel dimensions alone do not establish a wrong cover or an unacceptable crop.

| Book | Existing file | Actual JPEG pixels | Priority |
|---|---|---:|---|
| This Book Just Ate My Dog! | catalogue-cover-10166055.jpg | 57 × 58 | CRITICAL: extremely small |
| Rescue & Jessica | extended-cover-9780763696047.jpg | 180 × 94 | CRITICAL: unusually wide/short; verify image content |
| This Is Our House | catalogue-cover-3814768.jpg | 128 × 152 | HIGH: small |
| The Heart and the Bottle | catalogue-cover-12180320.jpg | 180 × 187 | HIGH: near-square, small |
| Stepping Stones | migration-9781459814905.jpg | 180 × 154 | HIGH: short aspect ratio |
| Mommy, Mama, and Me | cover-9781582462639.jpg | 180 × 177 | HIGH: near-square |
| The Shape Game | catalogue-cover-11712609.jpg | 235 × 242 | MEDIUM: near-square |
| Pool | cover-9781452142944.jpg | 180 × 240 | MEDIUM: small portrait |
| Mum’s Jumper | cover-9781911496137.jpg | 300 × 300 | MEDIUM: square |
| Out to Sea | publisher-cover-ac12e2c19c58.jpg | 450 × 450 | MEDIUM: square; check front-cover crop |

Other user-nominated entries use external image URLs and require fetching/visual inspection: *King Stork*, *The Juniper Tree*, *Flower Fairy Tales*. The user also named *Lunba and Pebble*, which was not found by that exact title in the reading-list HTML. Do not assume a spelling or add an unverified work.

## Safe replacement requirements
1. Identify publisher/edition ISBN and official publisher front-cover image; confirm the cover's printed title/edition matches the catalogue record.
2. Verify actual image pixels, aspect ratio and sharpness, including mobile rendering.
3. Replace the relevant image file/URL only after visual verification; keep existing record and source details.
4. Re-read committed HTML and new image resource. Do not call any cover fixed solely because an audit exists.

## Bibliographic fixes completed in parallel
Commit `c7c71da` updated verified edition metadata for *Pool*, *This Is Our House*, *The Heart and the Bottle*, *King Stork* and *Out to Sea*. This audit does not claim a cover replacement.
