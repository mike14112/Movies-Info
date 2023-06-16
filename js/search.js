'use strict';

////
// Elements 


const input = document.querySelector('.input'),
      btnSearch = document.querySelector('.btn--search'),
     cards =  document.querySelector('.cards--section');

const getSearchMovies = window.location.href.split('=')[1]

console.log(getSearchMovies)