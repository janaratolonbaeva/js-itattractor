'use strict';
$(() => {
  const form = $('#form');
  const country = $('#country');
  const url = 'https://restcountries.eu/rest/v2/all?fields';
  const arrCountryInfo = [];

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

  const addArr = (item, obj, nameItem) => {
    const divRow = $('<div class="item"></div>');
    const value = obj[item];
    const arrVal = value.join(', ');
    item = nameItem;
    const info = item + ': ' + arrVal;
    $(divRow).html(info);
    $('.container').find('.items').append(divRow);
  };

  const addObj = (item, obj, nameItem) => {
    const divRow = $('<div class="item"></div>');
    const nameValue = $('<div class="item-name"></div>');
    const row = $('<div class="row"></div>');

    const value = obj[item];
    item = nameItem;
    $(nameValue).html(item + ': ');
    $(divRow).append(nameValue);

    value.forEach((index) => {
      for (let i in index) {
        const table = $('<div class="col"></div>');
        const tableItem1 = $('<div class="col-item"></div>');
        const tableItem2 = $('<div class="col-item"></div>');
        $(table).append(tableItem1);
        $(table).append(tableItem2);
        $(tableItem1).html(i);
        $(tableItem2).html(index[i]);
        $(row).append(table);
      }
    });
    $(divRow).append(row);
    $('.container').find('.items').append(divRow);
  };

  const addDiv = (item, obj, nameItem) => {
    const divRow = $('<div class="item"></div>');
    $('.container').find('.items').append(divRow);

    const value = obj[item];
    item = nameItem;
    const info = item + ': ' + value;
    divRow.html(info);
  };

  const printCountry = (response) => {
    const obj = response[0];

    for (let item in obj) {
      if (item === 'name') {
        addDiv(item, obj, 'Название');
      }
      if (item === 'topLevelDomain') {
        addArr(item, obj, 'Домен верхнего уровня');
      }
      if (item === 'alpha2Code') {
        addDiv(item, obj, 'Двузначный код');
      }
      if (item === 'alpha3Code') {
        addDiv(item, obj, 'Трехзначный код');
      }
      if (item === 'callingCodes') {
        addArr(item, obj, 'Код страны телефонного номера');
      }
      if (item === 'capital') {
        addDiv(item, obj, 'Bishkek');
      }
      if (item === 'altSpellings') {
        addArr(item, obj, 'Альтернативные варианты написания');
      }
      if (item === 'region') {
        addDiv(item, obj, 'Регион');
      }
      if (item === 'subregion') {
        addDiv(item, obj, 'Субрегион');
      }
      if (item === 'population') {
        addDiv(item, obj, 'Население');
      }
      if (item === 'latlng') {
        addArr(item, obj, 'Широта');
      }
      if (item === 'demonym') {
        addDiv(item, obj, 'Демоним');
      }
      if (item === 'area') {
        addDiv(item, obj, 'Площадь');
      }
      if (item === 'gini') {
        addDiv(item, obj, 'Коэффициент Джини');
      }
      if (item === 'timezones') {
        addArr(item, obj, 'Часовой пояс');
      }
      if (item === 'borders') {
        addArr(item, obj, 'Границы');
      }
      if (item === 'nativeName') {
        addDiv(item, obj, 'Родное название');
      }
      if (item === 'numericCode') {
        addDiv(item, obj, 'Числовой код');
      }
      if (item === 'currencies') {
        addObj(item, obj, 'Валюты');
      }
      if (item === 'languages') {
        addObj(item, obj, 'Языки');
      }
      if (item === 'translations') {
        addObj(item, obj, 'Перевод страны на другие языки');
      }
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
