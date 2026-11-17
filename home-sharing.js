(() => {
  const link = document.getElementById('share-url');
  const status = document.getElementById('share-status');

  async function copyLink(forInstagram) {
    try {
      await navigator.clipboard.writeText(link.value);
      status.textContent = forInstagram ? 'Link copied. Paste it in Instagram.' : 'Website link copied.';
      link.hidden = true;
    } catch {
      link.hidden = false;
      link.focus();
      link.select();
      status.textContent = forInstagram ? 'Copy this link to paste in Instagram.' : 'Copy the selected website link.';
    }
  }

  document.getElementById('share-instagram').addEventListener('click', () => copyLink(true));
  document.getElementById('share-copy').addEventListener('click', () => copyLink(false));
})();
