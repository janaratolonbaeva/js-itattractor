'use strict';
$(() => {
  const form = $('#form');
  const country = $('#country');
  const url = 'https://restcountries.eu/rest/v2/all?fields';

  $.getJSON(url, (countries) => {
    const options = {
      data: countries,
      getValue: 'name',
      theme: 'square',
      list: {
        match: {
          enabled: true,
        },
      },
      template: {
        type: 'iconLeft',
        fields: {
          iconSrc: 'flag',
        },
      },
    };
    $(country).easyAutocomplete(options);
  });

  const dictionary = {
    name: 'Название',
    topLevelDomain: 'Домен верхнего уровня',
    alpha2Code: 'Двухзначный код',
    alpha3Code: 'Трехзначный код',
    callingCodes: 'Коды страны',
    capital: 'Столица',
    altSpellings: 'Альтернативные наименования',
    region: 'Регион',
    subregion: 'Субрегион',
    population: 'Население',
    latlng: 'Координаты',
    demonym: 'Демоним',
    area: 'Площадь',
    gini: 'ВВП',
    timezones: 'Временная зона',
    borders: 'Границы',
    nativeName: 'Родное название',
    numericCode: 'Числовой код',
    currencies: 'Валюта',
    languages: 'Языки',
    translations: 'В переводе',
    flag: 'Флаг',
    regionalBlocs: 'Состоит в союзах',
    cioc: 'ЦИОК',
  };

  const createData = (key, value) => {
    const div = $('<div class="item"></div>');
    const title = $('<span class="title"></span>');
    title.html(dictionary[key] + ': ');
    let data = $('<span class="text"></span>');

    if (key === 'flag') {
      data = $('<img class="img"/>').attr('src', value);
    }

    if (Array.isArray(value)) {
      for (let item of value) {
        if (typeof item === 'string') {
          const textArr = $(`<span>${item}, </span>`);
          data = data.append(textArr);
        } else {
          const row = $('<div class="row"></div>');
          for (let key in item) {
            const col = $('<div class="col"></div>');
            const span1 = $('<span class="col-item"></span>');
            const span2 = $('<span class="col-item"></span>');
            span1.html(key);
            span2.html(item[key]);
            col.append(span1, span2);
            row.append(col);
          }
          data.append(row);
        }
      }
    } else {
      data.html(value);
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const row = $('<div class="row"></div>');
      for (let key in value) {
        const col = $('<div class="col"></div>');
        const span1 = $('<span class="col-item"></span>');
        const span2 = $('<span class="col-item"></span>');
        span1.html(key);
        span2.html(value[key]);
        col.append(span1, span2);
        row.append(col);
      }
      data.append(row);
    }

    if (key === 'latlng') {
      data = $('<div id="map" style="width: 600px; height: 400px"></div>');
      ymaps.ready(init);
      function init() {
        var myMap = new ymaps.Map('map', {
          center: value,
          zoom: 7,
        });
      }
    }

    $(div).append(title);
    $(div).append(data);
    $('.container').append(div);
  };

  const printCountry = (response) => {
    const country = response[0];
    for (let index in country) {
      createData(index, country[index]);
    }
  };

  $(form).on('submit', (e) => {
    e.preventDefault();

    const countryVal = $(country).val();
    const url = 'https://restcountries.eu/rest/v2/name/' + countryVal;
    console.log(url);

    $.ajax({
      method: 'GET',
      url: url,
      success: printCountry,
    });
  });
});
