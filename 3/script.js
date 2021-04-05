// I chose the Fast&Furious movie
// In the movie URL we have : the base of the URL, our API key, the language of the movie and finaly our query
// The URL to access to the data of the movie

// ---------------- API KEY --------------------
// 6a4186d0dae704bbc8f5752cfb09903d
let formValue;
let actor;
let guess_id;

var valid = false;
var valid2 = false;
var res;
var res2;
var dataCast;
var movie;
var image;
var guessInfo;
var imageURL
var guessMovieInfo; //dftgbyhnju,kioujyhtbgrfec
var isItActor = false;

const movieData = "https://api.themoviedb.org/3/search/movie?api_key=6a4186d0dae704bbc8f5752cfb09903d&language=en-US&query=fast+and+furious&page=1";
const castData = "https://api.themoviedb.org/3/movie/385687/credits?api_key=6a4186d0dae704bbc8f5752cfb09903d&language=en-US";


//-------Fetch functions --------
// Displaying movie info : title , image and release date of the movie
function fetchMovieData() {
  fetch(movieData).then(function (result) {
    return result.json();
  }).then(function (data) {
    document.getElementById("movieData").innerHTML += "<img src='https://image.tmdb.org/t/p/w185/" + data.results[2].poster_path + "'></img> ";
    document.getElementById("movieData").innerHTML += data.results[2].original_title + "<br>";
    document.getElementById("movieData").innerHTML += "<br>Movie description : " + data.results[2].overview + "<br>";
    document.getElementById("movieData").innerHTML += "<br>Release date : " + data.results[2].release_date + "<br>";
  })
}

// Collect the actors and director of the movie
function fetchMovieCast() {
  fetch(castData).then(function (result) {
    return result.json();
  }).then(function (data) {
    dataCast = data;
  })
};

function fetchGuessImage() {
  fetch(imageURL).then(function (result) {
    return result.json();
  }).then(function (guessImage) {
    // Displaying the image of the person guessed
    document.getElementById("img_form2").innerHTML = "<img src='https://image.tmdb.org/t/p/w185/" + guessImage.profile_path + "'></img> ";
  })
};

function fetchGuessInfo() {
  fetch(guessInfo).then(function (result) {
    return result.json();
  }).then(getGuessMovieInfo)
};

function getGuessMovieInfo(response) {
  guessMovieInfo = response;
  displayGuessQuizz(guessMovieInfo);
}

// ---------------------- Functions ------------------

function GuessImage() {
  valid = true;
  imageURL = "https://api.themoviedb.org/3/person/" + guess_id + "?api_key=6a4186d0dae704bbc8f5752cfb09903d";
  fetchGuessImage()
}

function GuessInfo() {
  valid = true;
  guessInfo = "https://api.themoviedb.org/3/person/" + guess_id + "/movie_credits?api_key=6a4186d0dae704bbc8f5752cfb09903d";
  fetchGuessInfo()
  // Displaying the result
  document.getElementById("displayResult").innerHTML = "Nice Guess!";
}

function verifyFormValue() {
  // Collecting the value of the form 
  formValue = document.getElementById("formValue").value.toLowerCase();
  // we go through all the actors and cast
  for (let i = 0; i < 9; i++) {
    //if the user guess the director, we fetch the info about him
    if (formValue == dataCast.crew[i].original_name.toLowerCase() && dataCast.crew[i].job == 'Director') {
      guess_id = dataCast.cast[i].id;
      GuessImage()
      GuessInfo()
    }
    //if the user guess an actor, we fetch the info about him
    if (formValue == dataCast.cast[i].original_name.toLowerCase()) {
      guess_id = dataCast.cast[i].id;
      isItActor = true;
      GuessImage()
      GuessInfo()
    }
    // otherwise, we inform the user that he didn't guess correctly
    else {
      if (valid == false && i == 8) {
        res = "Nice try !";
        document.getElementById("displayResult").innerHTML = res.fontcolor("red");
      }
    }
  }
};

function displayGuessQuizz(movieInfo2) {
  document.getElementById("form2").innerHTML = "<label for=\"formValue2\">Give the name of a movie where this person was actor or director:</label><br>";
  document.getElementById("form2").innerHTML += "<input type=\"search\" id=\"formValue2\"></input><br>";
  document.getElementById("form2").innerHTML += "<button class=\"btn btn-default\" id=\"formSubmit2\" onclick='verifyQuizz2(); return false;'>Submit</button><br>";
}

function verifyQuizz2() {
  // Collecting the value of the second form
  res2 = document.getElementById("formValue2").value.toLowerCase();
  if (isItActor == true) {
    for (let i = 0; i < guessMovieInfo.cast.length; i++) {
      if (res2 == guessMovieInfo.cast[i].original_title.toLowerCase()) {
        document.getElementById("displayResult2").innerHTML = "Movie title you guessed :" + guessMovieInfo.cast[i].original_title + "<br>";
        document.getElementById("displayResult2").innerHTML += "Movie title you guessed :" + guessMovieInfo.cast[i].release_date + "<br>";
        valid2 = true;
        document.getElementById("reload").innerHTML = "<button class=\"btn btn-default\"  onclick='document.location.reload();'>Go back to the begining</button><br>";
      }
    }
  }
  if (isItActor == false) {
    for (let i = 0; i < guessMovieInfo.crew.length; i++) {
      if (res2 == guessMovieInfo.crew[i].original_title.toLowerCase()) {
        document.getElementById("displayResult2").innerHTML = "Movie title you guessed :" + guessMovieInfo.crew[i].original_title;
        document.getElementById("displayResult2").innerHTML += "Movie title you guessed :" + guessMovieInfo.crew[i].release_date;
        valid2 = true;
        // Return to the beginning 
        document.getElementById("reload").innerHTML = "<button class=\"btn btn-default\"  onclick='document.location.reload();'>Go back to the begining</button><br>";
      }
    }
  }
  if (valid2 == false) {
    //If the answer is wrong display a message in red near the submit button
    var res = "Nice try !";
    document.getElementById("displayResult2").innerHTML = res.fontcolor("red");
  }
};

fetchMovieData();
fetchMovieCast();







