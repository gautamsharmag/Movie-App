import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./Components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ab4de9626f2e345c2064b6e751794ee9&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=ab4de9626f2e345c2064b6e751794ee9&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
         
          <h1>MOVIE HUB</h1>
          
          <input
            className="search"
            type="search"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>

      <div className="app">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
