(() => {
  const storageKey = 'picturebook-saved-books';
  const siteHome = 'https://maggiemkchan.com/';
  const siteName = 'Maggie M. K. Chan';

  // Keep affiliate disclosures consistent on every page using this shared script.
  // Only replace the short disclosure copy, never catalogue descriptions or links.
  const affiliateCopy = 'As an Amazon Associate and an affiliate of Bookshop.org UK, I may earn a commission from qualifying purchases through affiliate links. This is at no additional cost to you.';
  for (const element of document.querySelectorAll('p, div, small')) {
    if (element.children.length && ![...element.children].every(child => child.tagName === 'A' || child.tagName === 'SPAN')) continue;
    const raw = element.textContent.trim();
    if (!/^As an Amazon Associate I earn from qualifying purchases\./i.test(raw)) continue;
    const link = element.querySelector('a[href*="affiliate-disclosure"], a[href*="affiliate"]');
    element.replaceChildren(document.createTextNode(affiliateCopy + ' '));
    if (link) element.append(link);
  }

  // Keep every Buy control attached to its own book's metadata, rather than
  // leaving it stranded after a long review or unrelated spacing.
  const attachBookPurchases = root => {
    const rows = root.querySelectorAll ? root.querySelectorAll('li.book-row, article.book-row, .book-row') : [];
    for (const row of rows) {
      const copy = row.querySelector(':scope > .book-copy');
      const purchase = copy?.querySelector(':scope > .affiliate-purchases');
      // Use the last metadata element in document order, not the first selector
      // match: querySelector() otherwise often puts Buy above the book title.
      const metadata = copy ? [...copy.children].filter(el =>
        el.matches('h3, .credit, .edition, .book-origin, .book-meta, .publication-details')
      ) : [];
      const anchor = metadata.at(-1);
      if (purchase && anchor && anchor.nextElementSibling !== purchase) anchor.after(purchase);
    }
  };
  attachBookPurchases(document);
  // Managed catalogue entries may be added after the initial page load.
  const catalogueObserver = new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType === 1 && (node.matches?.('.book-row') || node.querySelector?.('.book-row'))) {
        attachBookPurchases(node.matches?.('.book-row') ? node.parentElement : node);
      }
    }
  });
  catalogueObserver.observe(document.body, {childList:true,subtree:true});

  const navigation = document.querySelector('.accessible-nav');
  const mobileToggle = document.querySelector('.site-mobile-menu-toggle');
  if (navigation && mobileToggle) {
    const groups = [...navigation.querySelectorAll(':scope > details')];
    const mobileViewport = window.matchMedia('(max-width: 700px)');

    function setMobileMenu(open) {
      navigation.classList.toggle('mobile-open', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      mobileToggle.textContent = open ? '× MENU' : '☰ MENU';
      if (!open) for (const group of groups) group.open = false;
    }

    mobileToggle.addEventListener('click', () => setMobileMenu(!navigation.classList.contains('mobile-open')));
    mobileViewport.addEventListener('change', () => setMobileMenu(false));
    // Keep the current menu visible until a cross-page navigation replaces it.
    navigation.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!mobileViewport.matches || !link || !link.hash) return;
      const destination = new URL(link.href);
      if (destination.origin === location.origin && destination.pathname === location.pathname &&
          destination.search === location.search) {
        setMobileMenu(false);
      }
    });
    window.addEventListener('pageshow', event => {
      if (event.persisted && mobileViewport.matches) setMobileMenu(false);
    });
    navigation.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const group = event.target.closest('details[open]');
      if (group) {
        group.open = false;
        group.querySelector('summary').focus();
      } else if (navigation.classList.contains('mobile-open')) {
        setMobileMenu(false);
        mobileToggle.focus();
      }
    });
    document.addEventListener('click', event => {
      for (const group of groups) if (!group.contains(event.target)) group.open = false;
    });
    for (const group of groups) {
      group.addEventListener('toggle', () => {
        if (group.open) for (const other of groups) if (other !== group) other.open = false;
      });
    }
  }

  // A saved record retains its source location and verified bibliographic details.
  // Older saved lists contained titles only; migrate them without losing a selection.
  const clean = value => (value || '').replace(/\s+/g, ' ').trim();
  const validHref = href => typeof href === 'string' && /^[a-z-]+\.html#[^\s]+$/.test(href);
  const normaliseRecord = value => {
    if (typeof value === 'string') return {title: value, year: '', publisher: '', description: '', creators: ''};
    if (!value || typeof value !== 'object') return null;
    return {
      title: clean(value.title),
      year: /^(?:18|19|20)\d{2}$/.test(String(value.year || '')) ? String(value.year) : '',
      publisher: clean(value.publisher),
      description: clean(value.description),
      creators: clean(value.creators)
    };
  };
  let saved = new Map();
  const loadSaved = raw => {
    try {
      return new Map(JSON.parse(raw || '[]').map(([href, value]) => [href, normaliseRecord(value)])
        .filter(([href, value]) => validHref(href) && value?.title));
    } catch { return new Map(); }
  };
  try { saved = loadSaved(localStorage.getItem(storageKey)); } catch { /* Storage unavailable. */ }

  const list = document.getElementById('saved-books-list');
  const download = document.getElementById('download-saved-books');
  const print = document.getElementById('print-saved-books');
  const buttons = new Map();
  const validEntries = () => [...saved].filter(([href, value]) => validHref(href) && value?.title);

  // ISBNs are 13 digits; never mistake their internal digits for a publication year.
  function readYear(text) {
    const withoutISBN = clean(text).replace(/\bISBN(?:-13)?\s*:?\s*97[89][\d -]{10,17}/gi, '');
    const match = withoutISBN.match(/(?:^|[^\d])((?:18|19|20)\d{2})(?!\d)/);
    return match ? match[1] : '';
  }
  function bookRecord(book) {
    const title = clean(book.querySelector('h3')?.textContent);
    const details = clean(book.querySelector('.edition')?.textContent || book.querySelector('.meta')?.textContent);
    const year = book.dataset.year || readYear(details);
    let publisher = clean(book.dataset.publisher);
    if (!publisher && details) {
      const pieces = details.replace(/\bISBN(?:-13)?\s*:?\s*97[89][\d -]{10,17}/gi, '')
        .split(/[·|]/).map(clean).filter(Boolean);
      const excluded = /^(?:18|19|20)\d{2}$|^(?:english|french|spanish|chinese|portuguese|greek|croatian|japanese|korean|wordless|paperback|hardback|hardcover|board book|first published|revised edition|specialist tactile edition|publisher under review|edition under review)$/i;
      publisher = pieces.find(piece => !excluded.test(piece) &&
        !/^\b(?:ISBN|edition|originally|listed edition|language|translation|translated)\b/i.test(piece) &&
        /[A-Za-zÀ-ÿ]{3}/.test(piece)) || '';
      // Dates and formats can appear before a genuine imprint: prefer a stated publisher.
      if (publisher && /^(?:\d{1,2}\s+\w+|format\b)/i.test(publisher)) publisher = '';
    }
    const copy = book.querySelector('.book-copy') || book;
    const paragraphs = [...copy.querySelectorAll(':scope > p')];
    const description = clean(book.dataset.description ||
      paragraphs.find(p => !p.className &&
        !p.closest('.affiliate-purchases') &&
        clean(p.textContent).length > 35)?.textContent || '');
    const creators = clean(book.dataset.creators || copy.querySelector(':scope > .credit')?.textContent || book.querySelector('.credit')?.textContent || '');
    return {title, year: /^(?:18|19|20)\d{2}$/.test(year) ? year : '', publisher, description, creators};
  }

  function updateButton(button, url) {
    const active = saved.has(url);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '♥' : '♡';
    button.setAttribute('aria-label', (active ? 'Remove ' : 'Save ') + (saved.get(url)?.title || button.dataset.bookTitle || 'book'));
  }

  function appendBookDetails(doc, item, record) {
    const meta = doc.createElement('p');
    meta.className = 'saved-book-meta';
    meta.textContent = 'Year: ' + (record.year || 'Not verified') +
      ' · Publisher: ' + (record.publisher || 'Not verified');
    const description = doc.createElement('p');
    description.className = 'saved-book-description';
    description.textContent = record.description || 'Description not available in the source entry.';
    const creators = doc.createElement('p');
    creators.className = 'saved-book-creators';
    creators.textContent = 'Author / illustrator credits: ' + (record.creators || 'Not listed in the source entry');
    item.append(creators, meta, description);
  }

  function render() {
    for (const [url, button] of buttons) updateButton(button, url);
    if (!list) return;
    const books = validEntries();
    const empty = document.getElementById('saved-books-empty');
    if (empty) empty.hidden = books.length > 0;
    if (download) download.disabled = books.length === 0;
    if (print) print.disabled = books.length === 0;
    list.replaceChildren();
    for (const [href, record] of books) {
      const item = document.createElement('li');
      item.className = 'saved-book-entry';
      const row = document.createElement('div');
      row.className = 'saved-book-heading';
      const link = document.createElement('a');
      link.href = href;
      link.textContent = record.title;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', 'Remove ' + record.title + ' from saved books');
      remove.addEventListener('click', () => {
        saved.delete(href);
        update();
        (list.querySelector('button') || list.previousElementSibling)?.focus();
      });
      row.append(link, remove);
      item.append(row);
      appendBookDetails(document, item, record);
      list.append(item);
    }
  }

  function update() {
    try { localStorage.setItem(storageKey, JSON.stringify([...saved])); }
    catch { /* Continue without persistent storage. */ }
    render();
  }

  function exportList() {
    const output = document.implementation.createHTMLDocument('My saved books');
    output.documentElement.lang = 'en-GB';
    const charset = output.createElement('meta');
    charset.setAttribute('charset', 'utf-8');
    output.head.prepend(charset);
    const style = output.createElement('style');
    style.textContent = 'body{margin:2rem auto;padding:0 1rem;max-width:50rem;font:1rem/1.55 system-ui,sans-serif}li{padding:.65rem 0;border-bottom:1px solid #ddd}li>a{font-weight:650}a{color:#18352a}.saved-book-meta{color:#465b52;font-size:.91rem}.saved-book-description{margin:.35rem 0}';
    output.head.append(style);
    const title = output.createElement('h1');
    title.textContent = 'My saved books';
    const credit = output.createElement('p');
    const home = output.createElement('a');
    home.href = home.textContent = siteHome;
    credit.append(siteName + ' · ', home);
    const books = output.createElement('ol');
    for (const [href, record] of validEntries()) {
      const item = output.createElement('li');
      const link = output.createElement('a');
      link.href = new URL(href, siteHome).href;
      link.textContent = record.title;
      item.append(link);
      appendBookDetails(output, item, record);
      books.append(item);
    }
    output.body.append(title, credit, books);
    const blob = new Blob(['<!doctype html>\n', output.documentElement.outerHTML], {type: 'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const file = document.createElement('a');
    file.href = url;
    file.download = 'saved-books-maggie-m-k-chan.html';
    document.body.append(file);
    file.click();
    file.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Refresh old title-only records from their original catalogue pages.
  // One fetch per distinct page; no third-party services or personal data transfer.
  async function refreshSavedMetadata() {
    if (!list || !validEntries().length) return;
    const byPage = new Map();
    for (const [href] of validEntries()) {
      const [filename, hash] = href.split('#');
      if (!filename || !hash) continue;
      if (!byPage.has(filename)) byPage.set(filename, []);
      byPage.get(filename).push([href, hash]);
    }
    let changed = false;
    await Promise.all([...byPage].map(async ([filename, entries]) => {
      try {
        const response = await fetch(filename, {credentials: 'same-origin'});
        if (!response.ok) return;
        const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
        for (const [href, encodedId] of entries) {
          const node = parsed.getElementById(decodeURIComponent(encodedId));
          if (!node) continue;
          const fresh = bookRecord(node);
          const old = saved.get(href);
          if (!old) continue;
          // Preserve known data when a source entry is incomplete.
          const next = {title: fresh.title || old.title,
            year: fresh.year || old.year,
            publisher: fresh.publisher || old.publisher,
            description: fresh.description || old.description,
            creators: fresh.creators || old.creators};
          if (JSON.stringify(next) !== JSON.stringify(old)) {
            saved.set(href, next);
            changed = true;
          }
        }
      } catch { /* Existing saved books remain accessible while offline. */ }
    }));
    if (changed) update();
  }
  const page = location.pathname.split('/').pop() || 'index.html';
  for (const book of document.querySelectorAll('li.book-row, article[data-category], article[data-buy-isbn], article:has(.buy-menu):not([data-buy-product])')) {
    const heading = book.querySelector('h3');
    if (!heading) continue;
    const record = bookRecord(book);
    const title = record.title;
    if (!book.id) {
      const base = 'saved-' + title.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      let id = base;
      let suffix = 2;
      while (document.getElementById(id)) id = `${base}-${suffix++}`;
      book.id = id;
    }
    const href = `${page}#${encodeURIComponent(book.id)}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'save-book-button';
    button.dataset.bookTitle = title;
    button.setAttribute('aria-label', `Save ${title}`);
    button.addEventListener('click', () => {
      if (saved.has(href)) saved.delete(href);
      else saved.set(href, record);
      update();
    });
    const titleRow = document.createElement('div');
    titleRow.className = 'book-title-row';
    heading.before(titleRow);
    titleRow.append(heading, button);
    buttons.set(href, button);
  }

  download?.addEventListener('click', exportList);
  print?.addEventListener('click', () => window.print());
  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    try {
      saved = loadSaved(event.newValue);
      render();
    } catch {
      // Ignore malformed storage updates.
    }
  });
  render();
  refreshSavedMetadata();
})();
