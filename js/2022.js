"use strict"
const  cards =  document.querySelector('.cards--section')

const  currentFilmsId  =  window.location.search.split('=')[1]


const getMovie = async  function (num) {
    const ApiKey = '6ZPCSH8-QRK4NTV-Q3W6R5S-Q3WXF8R'
    const resp = await fetch(`https://api.kinopoisk.dev/v1.3/movie?page=1&limit=${num}&type=movie`,{
        headers:{
             'accept': 'application/json',
             'X-API-KEY':ApiKey,
        },
       
    })
    const filmsResp = await resp.json()
    const  films = filmsResp.docs
    console.log(films[0])
 for(let i = 0; i < films.length; i++){

    cards.innerHTML += `
    <div class="card col-4 mt-3  " style="width: 18rem;">
    <img src="${films[i].poster.url}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title film-name text-center ">${films[i].name}</h5>
    <p class="card-text  text-center ">Страна: ${films[i].countries[0].name}.</p>
    <p class="card-text  text-center raiting">Рейтинг: <span class="text-danger"> ${films[i].rating.imdb}</span></p>
    <p class="card-text  text-center year">Год: ${films[i].year}</p>
    <p class="card-text  text-center genre"> Жанр :${films[i].genres[0].name}</p>
    <p class="card-text  text-center about "> Описание : ${films[i].description.substring(0,200)}... </p>
    </div>
    <a href="/html/filmsId.html?films=${films[i].id}"   class="btn btn-primary  mb-2">Перейти куда-нибудь</a>
    
    </div> 

`
input.addEventListener('change', (e) => {
    if(input.value !== ''){
       btnSearch.addEventListener('click', (e) => {
       e.currentTarget.setAttribute('href', `/html/search.html?films=${input.value}`)
       input.value = ''
       })
    }
   
   })


     }

}
getMovie('https://api.kinopoisk.dev/v1.3/movie?page=1&limit=50&year=2022')