'use strict';

// write your code here
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static'
  + '/api/phones.json';
const DETAILS_URL = 'https://mate-academy.github.io/phone-catalogue-static'
  + '/api/phones/';

// utility request
function request(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          throw response;
        }, 5000);
      }

      return response.json();
    });
};

// getPhones + details using utility request
function getPhones() {
  return request(BASE_URL);
};

const getPhonesDetails = (ids) => {
  ids.forEach(id => {
    const record = `${DETAILS_URL}${id}.json`;

    request(record);
  });
};

// service functions
const getData = (result) => {
  const idsNames = {};

  result.forEach(element => {
    idsNames[element.id] = element.name;
  });

  getPhonesDetails(Object.keys(idsNames));
  display(Object.values(idsNames));
};

const display = (elements) => {
  const select = document.createElement('SELECT');

  elements.forEach(element => {
    const option = document.createElement('option');

    option.append(element);
    select.append(option);
  });

  document.body.append(select);
};

// calling all above
getPhones()
  .then(result => getData(result));
