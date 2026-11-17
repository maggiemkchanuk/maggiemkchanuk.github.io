(() => {
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
