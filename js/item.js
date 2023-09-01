///////////////////////////////////////////////
///////// elements 

const CurrentSection = document.querySelector('.card--section'),
      titleSection = document.querySelector('.card-title'),
      sloganSection = document.querySelector('.slogan'),
      ageRatingSection = document.querySelector('.age-rating'),
      ratingSection = document.querySelector('.raiting'),
      countrySection = document.querySelector('.country'),
      genresSection  = document.querySelector('.genres'),
      actorsSection = document.querySelector('.actors'),
      budgetSection  = document.querySelector('.budget'),
      premierSection = document.querySelector('.premier'),
      aboutSection = document.querySelector('.card-text'),
      treilerSection = document.querySelector('.treiler'),
      imgPosterSection = document.querySelector(".img-poster"),
      btnTreiler = document.querySelector('.btn-treiler'),
      movieLengthSection = document.querySelector('.movie--length'),
       rootMovieLength = document.querySelector('.root-mv-length')
      sliderSection = document.querySelector('.mySwiper'),
      sliderSectionFacts = document.querySelector('.mySwiperFacts'),
      input = document.querySelector('.input'),
      btnSearch = document.querySelector('.btn--search');
     const   factHeader = document.querySelector('.fact--header'),
      personsId = document.querySelectorAll('.all');

      const  currentFilmsId  =  window.location.search.split('=')[1]





// console.log(getSearchMovies)

// new films function 

const newFilmsGet   = async function(num){


  const apiKey = 'MB1SXNX-SDFM9JF-J2QYCNR-735JGAF'

  const resp  = await  fetch(num, {
      headers:{
       'accept': 'application/json',
        'X-API-KEY': apiKey,

      },
  })
  
  const filmsResp = await  resp.json()
//  console.log(filmsResp.docs)


//  отображение Слайдера 
 filmsResp.docs.forEach(film => {
//  console.log(film)
 sliderSection.innerHTML += `
 <swiper-slide>
 <a href="filmsId.html?film=${film.id}"><img src=" ${film.poster.url}"/></a>
 </swiper-slide>
 `
 
 })

}


newFilmsGet( 'https://api.kinopoisk.dev/v1.3/movie?page=1&limit=50&rating.imdb=8.5')


//  current Id

// console.log(currentFilmsId)
 const showMovie =  async function  (id){
 const apiKey = '6ZPCSH8-QRK4NTV-Q3W6R5S-Q3WXF8R'

    const resp  = await  fetch(id, {
        headers:{
         'accept': 'application/json',
          'X-API-KEY': apiKey,
        },
    })





    const filmsResp = await resp.json()


    //   отображение   Элжментов 
console.log(filmsResp)
    titleSection.textContent = 'Название: ' +   filmsResp.name
    sloganSection.textContent =  filmsResp.slogan ?`Слоган:  ${filmsResp.slogan}`  : ' Слоган: Отсутствует'
    ageRatingSection.textContent = filmsResp.ageRating ? `${filmsResp.ageRating}+`: 'Отствует Возрастной Рейтинг ' 
    ratingSection.textContent =  'Рейтинг: '  + filmsResp.rating.imdb
    imgPosterSection.setAttribute('src',  `${filmsResp.poster.url}`) 
     


     
    rootMovieLength.textContent?'Продолжительность':'Количество Серии'

    if(filmsResp.movieLength === null){

      movieLengthSection.textContent +=    ` ${filmsResp.seriesLength} `
    }else{
   movieLengthSection.textContent  += ` ${filmsResp.movieLength} мин.`
    }
    

    //  отображение   Бюджета
   if(filmsResp.budget === {} ){
    budgetSection.textContent = 'Бюджет: Нет Информации'
    
   }else if( filmsResp.budget.value && filmsResp.budget.currency){
    budgetSection.textContent =  `Бюджет: ${filmsResp.budget.currency}  ${filmsResp.budget.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`

   } 
   
  //  отображение   стран производства
    filmsResp.countries.forEach(cn => {
      // let countries =  cn.name
       countrySection.textContent += ` ${cn.name} `
    });

      // отображение  жанра 
 

    filmsResp.genres.forEach(gn => {
       genresSection.textContent += ` ${gn.name} `
    });
    
    // btnTreiler.setAttribute('href', `${filmsResp.videos.trailers[0].url}`)

if(filmsResp.videos.trailers <= 0  ){
  btnTreiler.textContent = 'Трейлер  Отствует'
  btnTreiler.classList.add('disabled')

}else{
  btnTreiler.setAttribute('href', `${filmsResp.videos.trailers[0].url}`)
}

    premierSection.textContent += `${filmsResp.year}`

    // создание списка   Актеров  Главных 
for(let i = 0; i < 10; i++){
  // console.log(filmsResp.persons[i].name)

 actorsSection.innerHTML +=` <span> ${filmsResp.persons[i].name}. </span>`

// описание фильма
if(filmsResp.description === null &&filmsResp.shortDescription ){
  aboutSection.textContent = 'Описание Отствует ! '
}

aboutSection.textContent = filmsResp.description?`${filmsResp.description}`:`${filmsResp.shortDescription}`




}


/// Отображение Фактов

if(filmsResp.facts.length >= 0 && filmsResp.facts !== [] ){
  for(let i = 1; i < filmsResp.facts.length; i++){
    factHeader.textContent = 'Факты'
    sliderSectionFacts.innerHTML += `
    <swiper-slide ${i} >
    <h5 class="text-light text-center">Факт ${i}</h5>
   <span class="text-light text-facts">${filmsResp.facts[i].value}</span>
    </swiper-slide>
    `
    
  }
  }
 const p = document.querySelectorAll('.all')
 p.forEach( per => {
  per.classList.add('btn', 'btn-sm', 'disabled')
 })
personsId.forEach(per => {
})

input.addEventListener('change', (e) => {
  if(input.value !== ''){
     btnSearch.addEventListener('click', (e) => {
     e.currentTarget.setAttribute('href', `search.html?films=${input.value}`)
     })
  }
 
 })






    }

   
   
    showMovie(`https://api.kinopoisk.dev/v1.3/movie/${currentFilmsId}`)