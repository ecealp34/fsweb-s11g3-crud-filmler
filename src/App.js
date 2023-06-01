import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from "./components/EditMovieForm";
import axios from 'axios';
import { defineLocale } from "moment/moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddMovieForm from "./components/AddMovieForm";
import DarkModeToggle from "./DarkModeToggle";

const App = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const history = useHistory()
 

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios
    .delete(`http://localhost:9000/api/movies/${id}`)
    .then(res => {
      setMovies(res.data);
      history.push("/movies");
    })
    .catch(err => {
      console.log(err);
    });
}

  const addToFavorites = (movie) => {
    console.log("movie", movie)
    if(!favoriteMovies.find((favMovie) => favMovie.id === movie.id)) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  }

  return (
    <div className={`${darkMode ? 'dark' : 'light'} mode-container`}>
         <div style={{margin: "10px" }}>
       <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader/>
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
            <EditMovieForm setMovies={setMovies}/>
            </Route>
            
            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}  />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
      </div>
    </div>
  );
};


export default App;

