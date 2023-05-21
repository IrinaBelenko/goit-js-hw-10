function createMarkupList(countries) {
  return countries
    .map(
      ({ name, flags }) =>
        `<li class="list-item">
        <img src="${flags.svg}" width="50" height="32" alt="${name.common}">
         ${name.common}
        </li>`
    )
    .join('');
}

function createMarkupCard(country) {
  const { name, capital, population, flags, languages } = country;
  const languagesString = Object.values(languages).join(', ');

  return `<p class="country-name">
          <img
            src="${flags.svg}"
            width="50"
            height="32"
            alt="${name.common}"
          />
          <span>${name.common}</span>
        </p>
        <p><span class="description">Capital: </span>${capital[0]}</p>
        <p><span class="description">Population: </span>${population}</p>
        <p><span class="description">Languages: </span>${languagesString}</p>`;
}

export { createMarkupList, createMarkupCard };
