const content = document.getElementById('root')
const searchBtn = document.getElementById('search-btn')
const inputTitle = document.getElementById('input-title')

const arrFilms = ["tt3799232", "tt3846674", "tt1817385","tt1974182", "tt0304968", "tt1951264", "tt1951265", "tt1951266",
  "tt1840309", "tt4516496", "tt5251060", "tt1201607", "tt0107048", "tt3106046", "tt0095631", "tt0093822", "tt0387808",
  "tt1119646", "tt7634968", "tt0212338", "tt0302886", "tt0032138", "tt0120737 ", " tt0241527", "tt0327597", "tt4123430", "tt5028340",
  "tt0088323", "tt3040964", "tt1587310", "tt0363771", "tt0088247", "tt0095016", "tt0093870", "tt0266697", "tt0088944", "tt4912910", "tt2406566", "tt0293662"];

const pintarObjMovie = (dataProper, data, valorId) => {
  if (dataProper === valorId) {
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
}

const filterGenre = ( domElementValue, data) => {
  debugger
  if (data.Genre.indexOf(domElementValue) != -1) { 
    content.innerHTML += `<div class="img-default" ><a href="#"><img id="${data.imdbID}" src="${data.Poster}"  alt=""></a></div>`; 
  };

};





const fantasyBtn = document.getElementById('fantasy-btn');
const getArrFilmsByDefault = (arrId) => {
  for (let i = 0; i < arrId.length; i++) {
    fetch(`http://www.omdbapi.com/?i=${arrId[i]}&apikey=b06dbea8`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        content.innerHTML += `<div class="img-default" ><a href="#"><img id="${data.imdbID}" src="${data.Poster}"  alt=""></a></div>`

        content.addEventListener('click', (e) => {
          pintarObjMovie(data.imdbID, data, e.target.id);
        })
        fantasyBtn.addEventListener('click', () => {
          console.log(fantasyBtn.value)
          filterGenre(fantasyBtn.value, data);
          console.log(filterGenre(fantasyBtn.value, data));
        })
      })
      .catch(err => err)
  }
};
getArrFilmsByDefault(arrFilms);



const pintarOneMovie = (arr, propiedad, valorId) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][propiedad] === valorId) {
      let string = '';
      string = `<div>
     <div>
     <img src = ${arr[i].Poster} />
     </div>
     <p><strong>Title: </strong>${arr[i].Title}</p> 
     <p><strong>Type: </strong>${arr[i].Type}</p>
     <p><strong>Year: </strong>${arr[i].Year}</p>
     </div>`
      content.innerHTML = string;
    }
    else { };
  }
}

//Imprimir by Title Filter By Title
const getArrFilms = (title) => {
  fetch(`http://www.omdbapi.com/?s=${title}&apikey=b06dbea8`)
    .then(response => response.json())
    .then(data => {

      const arrFilms = data.Search;
      let str = '';
      for (let i = 0; i < arrFilms.length; i++) { // [{},{}]
        str += `<div><a href="#"><img id="${arrFilms[i].imdbID}" src="${arrFilms[i].Poster}" alt=""></a></div>`
        content.innerHTML = str;
      }
      content.addEventListener('click', (e) => {
        pintarOneMovie(arrFilms, 'imdbID', e.target.id);
      })
    })
    .catch(err => err);
};

searchBtn.addEventListener('click', () => {
  getArrFilms(inputTitle.value);
});