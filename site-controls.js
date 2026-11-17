(() => {
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  const brand = document.querySelector('.site-brand');
  if (!brand) return;

  const storageKey = 'picturebook-saved-books';
  let saved = new Map();
  try {
    saved = new Map(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  } catch {
    // The list remains available for the current page if storage is disabled.
  }

  const open = document.createElement('button');
  open.type = 'button';
  open.className = 'saved-books-button';
  brand.append(open);

  const dialog = document.createElement('dialog');
  dialog.className = 'buy-dialog saved-books-dialog';
  dialog.setAttribute('aria-labelledby', 'saved-books-title');
  dialog.innerHTML = '<header class="buy-dialog-header"><h2 id="saved-books-title">Saved books</h2><form method="dialog"><button class="buy-dialog-close" aria-label="Close saved books">×</button></form></header><p>Your saved books are stored in this browser.</p><p class="saved-books-empty">Use the heart beside a book to save it here.</p><ol></ol>';
  document.body.append(dialog);
  const list = dialog.querySelector('ol');
  const empty = dialog.querySelector('.saved-books-empty');
  const buttons = new Map();

  function updateButton(button, url) {
    const active = saved.has(url);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '♥' : '♡';
  }

  function render() {
    open.textContent = saved.size ? `Saved books (${saved.size})` : 'Saved books';
    empty.hidden = saved.size > 0;
    list.replaceChildren();
    for (const [href, title] of saved) {
      if (typeof href !== 'string' || !/^[a-z-]+\.html#/.test(href) || typeof title !== 'string') continue;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = href;
      link.textContent = title;
      link.addEventListener('click', () => dialog.close());
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${title} from saved books`);
      remove.addEventListener('click', () => {
        saved.delete(href);
        update();
        (list.querySelector('button') || dialog.querySelector('.buy-dialog-close')).focus();
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
    for (const [url, button] of buttons) updateButton(button, url);
    render();
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
    updateButton(button, href);
    button.addEventListener('click', () => {
      if (saved.has(href)) saved.delete(href);
      else saved.set(href, title);
      update();
    });
    (book.querySelector('.book-copy') || heading.parentElement).append(button);
    buttons.set(href, button);
  }

  open.addEventListener('click', () => {
    render();
    dialog.showModal();
  });
  dialog.addEventListener('close', () => open.focus());
  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    try {
      saved = new Map(JSON.parse(event.newValue || '[]'));
      for (const [href, button] of buttons) updateButton(button, href);
      render();
    } catch {
      // Ignore malformed storage updates.
    }
  });
  render();
})();
