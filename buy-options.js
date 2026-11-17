(() => {
  const amazonTag = 'maggiemkchanu-21';

  function addRetailer(list, name, href, action, sponsored) {
    const link = document.createElement('a');
    link.className = 'buy-retailer';
    link.href = href;
    link.target = '_blank';
    link.rel = sponsored ? 'sponsored noopener' : 'noopener';
    const retailer = document.createElement('span');
    retailer.className = 'buy-retailer-name';
    retailer.textContent = name;
    const label = document.createElement('span');
    label.className = 'buy-retailer-price';
    label.textContent = action;
    link.append(retailer, label);
    list.append(link);
  }

  for (const origin of document.querySelectorAll('.book-origin')) {
    if (origin.textContent.startsWith('Original publication: ')) {
      origin.textContent = origin.textContent.slice('Original publication: '.length);
    }
  }

  const items = document.querySelectorAll('li.book-row, article[data-category], article[data-buy-isbn], article[data-buy-product]');
  for (const book of items) {
    const title = book.querySelector('h3')?.textContent.trim();
    if (!title) continue;
    let menu = book.querySelector('.buy-menu');
    if (!menu) {
      const wrapper = document.createElement('div');
      wrapper.className = 'affiliate-purchases';
      wrapper.innerHTML = '<details class="buy-options"><summary>Buy <span class="buy-chevron" aria-hidden="true">▾</span></summary><div class="buy-menu"><div class="buy-retailers"></div><p class="buy-commission"></p></div></details>';
      wrapper.querySelector('summary').setAttribute('aria-label', `Buy ${title}`);
      (book.querySelector('.book-copy') || book.querySelector('h3').parentElement).append(wrapper);
      menu = wrapper.querySelector('.buy-menu');
    }
    menu.dataset.bookTitle = title;
  }

  for (const menu of document.querySelectorAll('.buy-menu')) {
    const retailers = menu.querySelector('.buy-retailers');
    if (!retailers) continue;
    const bookshop = retailers.querySelector('a[href*="bookshop.org/"]');
    const book = menu.closest('li.book-row, article');
    const product = book?.hasAttribute('data-buy-product');
    const isbn = bookshop?.pathname.match(/\/(97[89]\d{10})\/?$/)?.[1]
      || book?.dataset.buyIsbn || book?.querySelector('.meta')?.textContent.match(/ISBN:?\s+(97[89]\d{10})/)?.[1];
    const title = menu.dataset.bookTitle || book?.querySelector('h3')?.textContent.trim();
    const creator = book?.querySelector('.credit')?.textContent.trim();
    const search = isbn || [title, creator].filter(Boolean).join(' ');
    if (!search) continue;

    if (!product && !bookshop && title) {
      const bookshopSearch = new URL('https://uk.bookshop.org/search');
      bookshopSearch.searchParams.set('keywords', isbn || title);
      addRetailer(retailers, 'Bookshop.org UK', bookshopSearch, 'Search catalogue ↗', false);
    }
    const amazonProduct = product && book.querySelector('a[href*="amazon.co.uk/dp/"]');
    if (amazonProduct) {
      addRetailer(retailers, 'Amazon UK', amazonProduct.href, 'View current price (Ad) ↗', true);
      amazonProduct.closest('p').remove();
    } else if (!retailers.querySelector('a[href*="amazon.co.uk/"]')) {
      const amazonSearch = new URL('https://www.amazon.co.uk/s');
      amazonSearch.searchParams.set('k', search);
      if (!product) amazonSearch.searchParams.set('i', 'stripbooks');
      amazonSearch.searchParams.set('tag', amazonTag);
      addRetailer(retailers, 'Amazon UK', amazonSearch, isbn ? 'Search by ISBN (Ad) ↗' : 'Search by title (Ad) ↗', true);
    }
    const commission = menu.querySelector('.buy-commission');
    if (commission) commission.innerHTML = 'I may earn a commission on qualifying purchases. <a href="affiliate-disclosure.html">Affiliate disclosure</a>';
  }

  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'buy-dialog';
  dialog.setAttribute('aria-labelledby', 'buy-dialog-title');
  dialog.innerHTML = '<header class="buy-dialog-header"><h2 id="buy-dialog-title">Buy</h2><button type="button" class="buy-dialog-close" aria-label="Close buying options">×</button></header><div class="buy-dialog-content"></div>';
  document.body.append(dialog);
  let trigger;

  document.querySelectorAll('.buy-options > summary').forEach(summary => {
    summary.setAttribute('aria-haspopup', 'dialog');
  });

  document.addEventListener('click', event => {
    const summary = event.target.closest('.buy-options > summary');
    if (!summary) return;
    const menu = summary.parentElement.querySelector('.buy-menu');
    if (!menu) return;
    event.preventDefault();
    trigger = summary;
    const book = summary.closest('li.book-row, article');
    const title = book?.querySelector('h3')?.textContent.trim();
    dialog.querySelector('h2').textContent = title ? `Buy ${title}` : 'Buying options';
    dialog.querySelector('.buy-dialog-content').replaceChildren(...Array.from(menu.children, node => node.cloneNode(true)));
    dialog.showModal();
  });

  dialog.querySelector('.buy-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => trigger?.focus());
})();
