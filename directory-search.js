(() => {
  const search = document.querySelector('#directory-search');
  if (!search) return;
  const status = document.querySelector('#directory-search-status');
  const normalise = text => text.toLocaleLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  const topic = document.querySelector('#directory-topic');
  const country = document.querySelector('#directory-country');
  const searchLocations = search.hasAttribute('data-location-search');
  const locationAliases = /\b(united kingdom|great britain|united states(?: of america)?|usa|u\.?s\.?a?\.?|u\.?k\.?)\b/g;
  const countryLabels = { UK: 'United Kingdom', US: 'United States' };
  const countriesFor = label => {
    if (label === 'Australia and New Zealand') return ['Australia', 'New Zealand'];
    return label.split(', ').filter(Boolean).map(place => countryLabels[place] || place);
  };
  const groups = Array.from(document.querySelectorAll('main > section'), section => ({
    section,
    heading: normalise(section.querySelector('h2')?.textContent || ''),
    entries: Array.from(section.querySelectorAll('article'), article => ({
      article, text: normalise(`${article.textContent} ${article.getAttribute('data-search-aliases') || ''}`),
      location: normalise(article.querySelector('.organisation-location')?.textContent || '').split(/[^a-z]+/),
      countries: country ? countriesFor(article.querySelector('.organisation-location')?.textContent.trim() || '') : []
    })),
    links: Array.from(section.querySelectorAll(':scope > p'), link => ({
      link, text: normalise(link.textContent)
    }))
  }));

  if (country) {
    const places = [...new Set(groups.flatMap(({ entries }) => entries.flatMap(entry => entry.countries)))];
    places.sort((a, b) => a.localeCompare(b, 'en'));
    for (const place of places) country.add(new Option(place, place));
  }

  function filterDirectory() {
    const place = country?.value || '';
    const selectedTopic = topic?.value || '';
    const query = normalise(search.value);
    const searchText = searchLocations ? query.replace(/\b(u\.?s\.?a?\.?|u\.?k\.?)\.(?=\s|$)/g, '$1').replace(locationAliases, match =>
      /kingdom|britain|^u\.?k/i.test(match) ? 'uk' : 'us'
    ) : query;
    const terms = searchText.trim().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const { section, heading, entries, links } of groups) {
      if (selectedTopic && section.id !== selectedTopic) {
        section.hidden = true;
        continue;
      }
      let matches = 0;
      for (const { article, text, location, countries } of entries) {
        article.hidden = (place !== '' && !countries.includes(place)) || !terms.every(term => searchLocations && (term === 'uk' || term === 'us')
          ? location.includes(term)
          : (heading + ' ' + text).includes(term));
        if (!article.hidden) matches++;
      }
      for (const { link, text } of links) {
        link.hidden = place !== '' || !terms.every(term => (heading + ' ' + text).includes(term));
        if (!link.hidden) matches++;
      }
      section.hidden = (terms.length > 0 || place !== '' || selectedTopic !== '') && matches === 0;
      count += matches;
    }
    status.textContent = !terms.length && !place && !selectedTopic ? '' : count ? `${count} matching ${count === 1 ? 'result' : 'results'}` : 'No matches. Try a different search.';
  }
  document.querySelector('#directory-search-controls').hidden = false;
  search.addEventListener('input', filterDirectory);
  topic?.addEventListener('change', filterDirectory);
  country?.addEventListener('change', filterDirectory);
  filterDirectory();
})();
