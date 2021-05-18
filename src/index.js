import './sass/main.scss';

import { fetchByName } from './api-service.js';

import countriesList from './tpl/countriesList.hbs';
import countryCard from './tpl/countryCard.hbs';

import debounce from 'lodash.debounce';
import { alert, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputRef = document.querySelector('.search');
const countriesRef = document.querySelector('.countries');

inputRef.addEventListener('input', debounce(getNames, 500));

function getNames(e) {
  const formRef = e.target.value;
  const inputValue = formRef.toLowerCase().trim();
  countriesRef.innerHTML = '';
  if (!inputValue) return;
  fetchByName(formRef)
    .then(user => renderCountries(user))
    .catch(error => renderError(error));
}
const renderError = error => {
  alert({ text: error });
};

const renderCountries = country => {
  if (country.length >= 2 && country.length <= 10) {
    let countriesElems = countriesList(country);
    countriesRef.innerHTML = countriesElems;
  }
  if (country.length === 1) {
    let countriesElems = countryCard(country);
    countriesRef.innerHTML = countriesElems;
  }
  if (country.length > 10) {
    alert({
      text: 'Слишком много совпадений!',
    });
  }
};
