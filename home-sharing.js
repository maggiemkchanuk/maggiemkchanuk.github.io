(() => {
  const link = document.getElementById('share-url');
  const status = document.getElementById('share-status');

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link.value);
      status.textContent = 'Website link copied. You can paste it into Instagram or another app.';
      link.hidden = true;
    } catch {
      link.hidden = false;
      link.focus();
      link.select();
      status.textContent = 'Copy the selected website link.';
    }
  }

  document.getElementById('share-copy').addEventListener('click', copyLink);
})();
