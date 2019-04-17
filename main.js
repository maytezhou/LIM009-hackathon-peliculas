const content = document.getElementById('root');
const searchBtn = document.getElementById('search-btn');
const inputTitle = document.getElementById('input-title');
const selectGenreOptions=document.getElementById('select-genre-options');


// Creando un array con los Id de peliculas
const arrFilms = ["tt3799232", "tt3846674", "tt1817385","tt1974182", "tt0304968", "tt1951264", "tt1951265", "tt1951266",
  "tt1840309", "tt4516496", "tt5251060", "tt1201607", "tt0107048", "tt3106046", "tt0095631", "tt0093822", "tt0387808",
  "tt1119646", "tt7634968", "tt0212338", "tt0302886", "tt0032138", "tt0120737 ", " tt0241527", "tt0327597", "tt4123430", "tt5028340",
  "tt0088323", "tt3040964", "tt1587310", "tt0363771", "tt0088247", "tt0095016", "tt0093870", "tt0266697", "tt0088944", "tt4912910", "tt2406566", "tt0293662"];


  // Creando una funcion para pintar la Informacion detallada de la pelicula ( movies by default,which were obtained by ID)seleccionada por el usuario
const printMovieInfoComplete = (filmId, data, filmIdSelectedByUser) => { //  film Id , {} pelicula , Id selected By User
  if (filmId === filmIdSelectedByUser) {
    let string = '';
    string = `<div class="column">
       <div class="card">
       <img src = ${data.Poster} />
       </div>
       <p><strong>Title: </strong>${data.Title}</p> 
       <p><strong>Plot: </strong>${data.Plot}</p>
       <p><strong>Type: </strong>${data.Type}</p>
       <p><strong>Genre: </strong>${data.Genre}</p>
       <p><strong>Language: </strong>${data.Language}</p>
       <p><strong>Released: </strong>${data.Year}</p>
       <p><strong>Country: </strong>${data.Country}</p>
       <p><strong>Director: </strong>${data.Director}</p>
       </div>`
    content.innerHTML = string;
  }
  else { };
};

// Funcion que no funciona aun

const filterGenre = ( domElementValue, data) => {
  
  if (data.Genre.indexOf(domElementValue) != -1) { 
    content.innerHTML += `<div class="img-default" ><a href="#"><img id="${data.imdbID}" src="${data.Poster}"  alt=""></a></div>`; 
  };

};





const fantasyBtn = document.getElementById('fantasy-btn');

//  Obteniendo cada {} pelicula de la API por el ID
const getArrFilmsByDefault = (arrId) => {
  for (let i = 0; i < arrId.length; i++) {
    fetch(`http://www.omdbapi.com/?i=${arrId[i]}&apikey=b06dbea8`)
      .then(response => response.json())
      .then(data => {   //  Obteniendo cada {} pelicula de la API
        // console.log(data);
        content.innerHTML += `<div class="img-default" ><a href="#"><img id="${data.imdbID}" src="${data.Poster}"  alt=""></a></div>`

        content.addEventListener('click', (e) => {
          printMovieInfoComplete(data.imdbID, data, e.target.id); //  film Id , {} pelicula , Id selected By User
        })
        selectGenreOptions.addEventListener('change', (element) => {
          const genreValueSelected=element.target.value;
          console.log(element.target.value);

          filterGenre(genreValueSelected, data);
          console.log(filterGenre(genreValueSelected, data));
        })
      })
      .catch(err => err)
  }
};
getArrFilmsByDefault(arrFilms);


 // Creando una funcion para pintar la Informacion sin detalles de la pelicula ( movies by Title Input search by user)
 
const printInfoMovieWithoutDetail = (arrObj, property, valorId) => { // [{},{},{}] , property of an {}, Id of a movie selected by user 
  for (let i = 0; i < arrObj.length; i++) {
    if (arrObj[i][property] === valorId) {
      let string = '';
      string = `<div>
     <div>
     <img src = ${arrObj[i].Poster} />
     </div>
     <p><strong>Title: </strong>${arrObj[i].Title}</p> 
     <p><strong>Type: </strong>${arrObj[i].Type}</p>
     <p><strong>Year: </strong>${arrObj[i].Year}</p>
     </div>`
      content.innerHTML = string;
    }
    else { };
  }
}
 
//  Creando una funcion que obtenga  un[{},{},{}] c de la API por el title
//Imprimir by Title Filter By Title
const getArrFilms = (title) => { // title Input value
  fetch(`http://www.omdbapi.com/?s=${title}&apikey=b06dbea8`)
    .then(response => response.json())
    .then(data => {

      const arrFilms = data.Search; // [{},{},{}]
      let str = '';
      for (let i = 0; i < arrFilms.length; i++) { // [{},{}]
        str += `<div><a href="#"><img id="${arrFilms[i].imdbID}" src="${arrFilms[i].Poster}" alt=""></a></div>`
        content.innerHTML = str;
      }
      content.addEventListener('click', (e) => {
        printInfoMovieWithoutDetail(arrFilms, 'imdbID', e.target.id); // [{},{},{}], property of an {}, Id of a movie selected by user
      })
    })
    .catch(err => err);
};


//  Invocando a la función despues de un click en Buscar Button
searchBtn.addEventListener('click', () => {
  getArrFilms(inputTitle.value);
});