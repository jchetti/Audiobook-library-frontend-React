import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Books from "./components/books/Books";
import Book from "./components/books/Book"
import Home from "./components/Home";
import TopBar from "./components/TopBar";
import Genres from "./components/genres/Genres";
import Genre from "./components/genres/Genre";
import GenreForm from "./components/genres/GenreForm";
import Users from "./components/users/Users";
import User from "./components/users/User";
import UserForm from "./components/users/UserForm";
import ReviewForm from "./components/reviews/ReviewForm";

function App() {
  return (
      <div className="center">
          <div className="app">
              <Router>
                  <TopBar/>
                  <Routes>
                      <Route path="books" element={<Books />} />
                      <Route path="books/:id" element={<Book/>}/>
                      <Route path="reviews/create" element={<ReviewForm/>}/>
                      <Route path="genres" element={<Genres/>}/>
                      <Route path="genres/:id/delete" element={<GenreForm/>}/>
                      <Route path="genres/:id/update" element={<GenreForm/>}/>
                      <Route path="genres/:id" element={<Genre/>}/>
                      <Route path="genres/create"  element={<GenreForm/>}/>
                      <Route path="users" element={<Users/>}/>
                      <Route path="users/:id" element={<User/>}/>
                      <Route path="users/create" element={<UserForm/>}/>
                      <Route path="users/:id/delete" element={<UserForm/>}/>
                      <Route path="users/:id/update" element={<UserForm/>}/>
                      <Route path="" element={<Home />} />
                  </Routes>
              </Router>
          </div>
      </div>
  );
}

export default App;
