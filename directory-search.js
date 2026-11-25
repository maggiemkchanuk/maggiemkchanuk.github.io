(() => {
  const search = document.querySelector('#directory-search');
  if (!search) return;
  const status = document.querySelector('#directory-search-status');
  const normalise = text => text.toLocaleLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  const searchLocations = search.hasAttribute('data-location-search');
  const locationAliases = /\b(united kingdom|great britain|united states(?: of america)?|usa|u\.?s\.?a?\.?|u\.?k\.?)\b/g;
  const groups = Array.from(document.querySelectorAll('main > section'), section => ({
    section,
    heading: normalise(section.querySelector('h2')?.textContent || ''),
    entries: Array.from(section.querySelectorAll('article'), article => ({
      article, text: normalise(article.textContent),
      location: normalise(article.querySelector('.organisation-location')?.textContent || '').split(/[^a-z]+/)
    })),
    links: Array.from(section.querySelectorAll(':scope > p'), link => ({
      link, text: normalise(link.textContent)
    }))
  }));

  function filterDirectory() {
    const query = normalise(search.value);
    const searchText = searchLocations ? query.replace(/\b(u\.?s\.?a?\.?|u\.?k\.?)\.(?=\s|$)/g, '$1').replace(locationAliases, match =>
      /kingdom|britain|^u\.?k/i.test(match) ? 'uk' : 'us'
    ) : query;
    const terms = searchText.trim().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const { section, heading, entries, links } of groups) {
      let matches = 0;
      for (const { article, text, location } of entries) {
        article.hidden = !terms.every(term => searchLocations && (term === 'uk' || term === 'us')
          ? location.includes(term)
          : (heading + ' ' + text).includes(term));
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
