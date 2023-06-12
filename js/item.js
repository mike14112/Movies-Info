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
      movieLengthSection = document.querySelector('.movie-length')

//  current Id
 const  currentFilmsId  =  window.location.search.slice(7)
console.log(currentFilmsId)
 const showMovie =  async function  (id){
    const apiKey = '6ZPCSH8-QRK4NTV-Q3W6R5S-Q3WXF8R'
    const resp  = await  fetch(id, {
        headers:{
         'accept': 'application/json',
          'X-API-KEY': apiKey,

        },
    })

    const filmsResp = await resp.json()
    console.log(filmsResp)


    //   отображение   Элжментов 

    titleSection.textContent = 'Название: ' +   filmsResp.name
    sloganSection.textContent =  filmsResp.slogan ?`Слоган:  ${filmsResp.slogan}`  : ' Слоган: Отсутствует'
    ageRatingSection.textContent = `${filmsResp.ageRating}+`
    ratingSection.textContent =  'Рейтинг: '  + filmsResp.rating.imdb
    imgPosterSection.setAttribute('src',  `${filmsResp.poster.url}`) 
    movieLengthSection.textContent  += `${filmsResp.movieLength} мин.`
    

    //  отображение   Бюджета
   if(filmsResp.budget === {} ){
    budgetSection.textContent = 'Бюджет: Нет Информации'
    
   }else if( filmsResp.budget.value && filmsResp.budget.currency){
    // console.log( typeof filmsResp.budget.value)
    budgetSection.textContent =  `Бюджет: ${filmsResp.budget.currency}  ${filmsResp.budget.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`

   } 
   
   // отображение   стран производства
    // filmsResp.audience.forEach(cn => {
    //    countrySection.textContent += ` ${cn.country} `
    // });

      // отображение  жанра 

    filmsResp.genres.forEach(gn => {
       genresSection.textContent += ` ${gn.name} `
    });
    
    btnTreiler.setAttribute('href', `${filmsResp.videos.trailers[0].url}`)


    premierSection.textContent += `${filmsResp.premiere.world.substring(0, 10)}`

    // создание списка   Актеров  Главных 
for(let i = 0; i < 10; i++){
  console.log(filmsResp.persons[i].name)

 actorsSection.innerHTML +=` <span> ${filmsResp.persons[i].name}. </span>`

// описание фильма

aboutSection.textContent = ` ${filmsResp.description}`





}








    }

   
   
    showMovie(`https://api.kinopoisk.dev/v1.3/movie/${currentFilmsId}`)