import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Books from "./components/books/Books";
import Home from "./components/Home";
import TopBar from "./components/TopBar";
import Genres from "./components/genres/Genres";
import Genre from "./components/genres/Genre";
import GenreForm from "./components/genres/GenreForm";

function App() {
  return (
      <div className="center">
          <div className="app">
              <Router>
                  <TopBar/>
                  <Routes>
                      <Route path="books" element={<Books />} />
                      <Route path="genres" element={<Genres/>}/>
                      <Route path="genres/:id/delete" element={<GenreForm/>}/>
                      <Route path="genres/:id/update" element={<GenreForm/>}/>
                      <Route path="genres/:id" element={<Genre/>}/>
                      <Route path="genres/create"  element={<GenreForm/>}/>
                      <Route path="genres/delete"  element={<GenreForm/>}/>
                      <Route path="" element={<Home />} />
                  </Routes>
              </Router>
          </div>
      </div>
  );
}

export default App;
