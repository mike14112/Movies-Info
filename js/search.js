'use strict';

////
// Elements 


const input = document.querySelector('.input'),
      btnSearch = document.querySelector('.btn--search'),
     cards =  document.querySelector('.cards--section');

const getSearchMovies = window.location.href.split('=')[1]

console.log(getSearchMovies)


const getMovie = async  function (value) {
     const ApiKey = '6ZPCSH8-QRK4NTV-Q3W6R5S-Q3WXF8R'
     const resp = await fetch(`https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=10&query=${value}`,{
         headers:{
              'accept': 'application/json',
              'X-API-KEY':ApiKey,
         },
        
     })
     const filmsResp = await resp.json()
     const  films = filmsResp.docs
     console.log(films)
  for(let i = 0; i < films.length; i++){
 
 
if(films[i].rating >= 5 && films[i].poster !== null){
   
     cards.innerHTML += `
     <div class="card col-4 mt-5  " style="width: 18rem;">
     <img src="${films[i].poster}" class="card-img-top" alt="...">
     <div class="card-body">
     <h5 class="card-title film-name text-center ">${films[i].name}</h5>
     <p class="card-text  text-center ">Страна: ${films[i].countries[0]}.</p>
     <p class="card-text  text-center raiting">Рейтинг: <span class="text-danger"> ${films[i].rating.toFixed(1)}</span></p>
     <p class="card-text  text-center year">Год: ${films[i].year}</p>
     <p class="card-text  text-center genre"> Жанр: ${films[i].genres[0]}</p>
     
     <p class="card-text  text-center about "> Описание : ${films[i].description.substring(0,200)}... </p>
     </div>
     <a href="/html/filmsId.html?films=${films[i].id}"   class="btn btn-primary  mb-2">Перейти куда-нибудь</a>
     
     </div> 
     
     `
}
 
 
 
 
      }
 
 input.addEventListener('change', (e) => {
  if(input.value !== ''){
     btnSearch.addEventListener('click', (e) => {
          e.currentTarget.setAttribute('href', `/html/search.html?films=${input.value}`)
     })
  }
 
 })
 
 
 
 }
 getMovie(getSearchMovies)