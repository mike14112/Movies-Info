"use strict"
const  cards =  document.querySelector('.cards--section'),
       input = document.querySelector('.input'),
       btnSearch = document.querySelector('.btn--search'),
       spinner = document.querySelectorAll('.spinner-grow'),
       headerTextCard = document.querySelector('.cards-text');

const  currentFilmsId  =  window.location.search.split('=')[1]


const getMovie = async  function (num) {
    const ApiKey = 'MB1SXNX-SDFM9JF-J2QYCNR-735JGAF'
    const resp = await fetch(`https://api.kinopoisk.dev/v1.3/movie?page=1&limit=${num}&type=movie&year=2022&rating.imdb=6.5-9.5 `,{
        headers:{
             'accept': 'application/json',
             'X-API-KEY':ApiKey,
        },
       
    })
    const filmsResp = await resp.json()
    const  films = filmsResp.docs
    console.log(films)

    if(resp.ok === true){
      headerTextCard.textContent = 'Фильмы 2023 Года '
  spinner.forEach(sp => {
      sp.style.display = 'none'
  })

  console.log(films[1].description)
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
    <p class="card-text  text-center about "> Описание : ${films[i].description ?`${films[i].description.substring(0,50)}...`:`Описание Отсутсвует`} </p>
    </div>
    <a href="filmsId.html?films=${films[i].id}"   class="btn btn-primary  mb-2">Описание</a>
    
    </div> 

`

}

input.addEventListener('change', (e) => {
    if(input.value !== ''){
       btnSearch.addEventListener('click', (e) => {
       e.currentTarget.setAttribute('href', `search.html?films=${input.value}`)
    //    input.value = ''
       })
    }
   
   })

     }

}
getMovie(50)