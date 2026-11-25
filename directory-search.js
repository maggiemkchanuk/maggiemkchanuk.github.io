(() => {
  const search = document.querySelector('#directory-search');
  if (!search) return;
  const status = document.querySelector('#directory-search-status');
  const normalise = text => text.toLocaleLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  const groups = Array.from(document.querySelectorAll('main > section'), section => ({
    section,
    heading: normalise(section.querySelector('h2')?.textContent || ''),
    entries: Array.from(section.querySelectorAll('article'), article => ({
      article, text: normalise(article.textContent)
    })),
    links: Array.from(section.querySelectorAll(':scope > p'), link => ({
      link, text: normalise(link.textContent)
    }))
  }));

  function filterDirectory() {
    const terms = normalise(search.value).trim().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const { section, heading, entries, links } of groups) {
      let matches = 0;
      for (const { article, text } of entries) {
        article.hidden = !terms.every(term => (heading + ' ' + text).includes(term));
        if (!article.hidden) matches++;
      }
      for (const { link, text } of links) {
        link.hidden = !terms.every(term => (heading + ' ' + text).includes(term));
        if (!link.hidden) matches++;
      }
      section.hidden = terms.length > 0 && matches === 0;
      count += matches;
    }
    status.textContent = !terms.length ? '' : count ? `${count} matching ${count === 1 ? 'result' : 'results'}` : 'No matches. Try a different search.';
  }
  document.querySelector('#directory-search-controls').hidden = false;
  search.addEventListener('input', filterDirectory);
  filterDirectory();
})();
