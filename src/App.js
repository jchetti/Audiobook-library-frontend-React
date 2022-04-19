import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Books from "./components/books/Books";
import Home from "./components/Home";
import TopBar from "./components/TopBar";
import Genres from "./components/genres/Genres";
import Genre from "./components/genres/Genre";

function App() {
  return (
      <div className="center">
          <div className="app">
              <Router>
                  <TopBar/>
                  <Routes>
                      <Route path="" element={<Home />} />
                  </Routes>
                  <Routes>
                      <Route path="books" element={<Books />} />
                  </Routes>
                  <Routes>
                      <Route path="genres" element={<Genres/>}>
                          <Route path="genre/:id" element={<Genre/>}/>
                      </Route>
                  </Routes>
              </Router>
          </div>
      </div>
  );
}

export default App;
