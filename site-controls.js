(() => {
  const storageKey = 'picturebook-saved-books';
  const siteHome = 'https://maggiemkchanuk.github.io/';
  const siteName = 'Maggie M. K. Chan';

  const navigation = document.querySelector('.site-nav');
  const readingList = navigation?.querySelector('a[href="reading-lists.html"]');
  if (readingList && !navigation.querySelector('a[href="saved-books.html"]')) {
    const savedLink = document.createElement('a');
    savedLink.href = 'saved-books.html';
    savedLink.textContent = 'Visitors’ Saved Books';
    readingList.after(savedLink);
  }

  let saved = new Map();
  try {
    saved = new Map(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  } catch {
    // The list remains available for the current page if storage is disabled.
  }

  const list = document.getElementById('saved-books-list');
  const download = document.getElementById('download-saved-books');
  const print = document.getElementById('print-saved-books');
  const buttons = new Map();

  function validEntries() {
    return [...saved].filter(([href, title]) =>
      typeof href === 'string' && /^[a-z-]+\.html#[^\s]+$/.test(href) && typeof title === 'string'
    );
  }

  function updateButton(button, url) {
    const active = saved.has(url);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '♥' : '♡';
  }

  function render() {
    for (const [url, button] of buttons) updateButton(button, url);
    if (!list) return;

    const books = validEntries();
    const empty = document.getElementById('saved-books-empty');
    empty.hidden = books.length > 0;
    download.disabled = print.disabled = books.length === 0;
    list.replaceChildren();
    for (const [href, title] of books) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = href;
      link.textContent = title;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${title} from saved books`);
      remove.addEventListener('click', () => {
        saved.delete(href);
        update();
        (list.querySelector('button') || list.previousElementSibling).focus();
      });
      item.append(link, remove);
      list.append(item);
    }
  }

  function update() {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...saved]));
    } catch {
      // Keep changes in this page when local storage is unavailable.
    }
    render();
  }

  function exportList() {
    const output = document.implementation.createHTMLDocument('My saved books');
    output.documentElement.lang = 'en';
    const charset = output.createElement('meta');
    charset.setAttribute('charset', 'utf-8');
    output.head.prepend(charset);
    const style = output.createElement('style');
    style.textContent = 'body{margin:2rem auto;padding:0 1rem;max-width:50rem;font:1rem/1.6 system-ui,sans-serif}li{margin:.45rem 0}a{color:inherit}';
    output.head.append(style);
    const title = output.createElement('h1');
    title.textContent = 'My saved books';
    const credit = output.createElement('p');
    const home = output.createElement('a');
    home.href = home.textContent = siteHome;
    credit.append(`${siteName} · `, home);
    const books = output.createElement('ol');
    for (const [href, text] of validEntries()) {
      const item = output.createElement('li');
      const link = output.createElement('a');
      link.href = new URL(href, siteHome).href;
      link.textContent = text;
      item.append(link);
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

  const page = location.pathname.split('/').pop() || 'index.html';
  for (const book of document.querySelectorAll('li.book-row, article[data-category], article[data-buy-isbn], article:has(.buy-menu):not([data-buy-product])')) {
    const heading = book.querySelector('h3');
    if (!heading) continue;
    const title = heading.textContent.trim();
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
    button.setAttribute('aria-label', `Save ${title}`);
    button.addEventListener('click', () => {
      if (saved.has(href)) saved.delete(href);
      else saved.set(href, title);
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
      saved = new Map(JSON.parse(event.newValue || '[]'));
      render();
    } catch {
      // Ignore malformed storage updates.
    }
  });
  render();
})();
