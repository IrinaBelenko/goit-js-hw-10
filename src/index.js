import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { createMarkupList, createMarkupCard } from './cardTemplate';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box');
const listCountriesEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const name = e.target.value.trim();
  cleanMarkup();

  if (!name) {
    return;
  }

  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countries.length >= 2) {
        listCountriesEl.insertAdjacentHTML(
          'beforeend',
          createMarkupList(countries)
        );
        return;
      }

      if ((countries.length = 1)) {
        countryInfoEl.insertAdjacentHTML(
          'afterbegin',
          createMarkupCard(countries[0])
        );
      }
    })
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}

function cleanMarkup() {
  listCountriesEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
