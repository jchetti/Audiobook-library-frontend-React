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
import BookForm from "./components/books/BookForm";
import ReviewForm from "./components/reviews/ReviewForm";
import PlaybackForm from "./components/playbacks/PlaybackForm";
import {useEffect} from "react";

function App() {

  return (
      <div className="center">
          <div className="app">
              <Router>
                  <TopBar/>
                  <Routes>
                      <Route path="books" element={<Books />} />
                      <Route path="books/:id" element={<Book/>}/>
                      <Route path="books/:id/delete" element={<BookForm/>}/>
                      <Route path="books/:id/update" element={<BookForm/>}/>
                      <Route path="books/create" element={<BookForm/>}/>
                      <Route path="books/:id/reviews/update" element={<ReviewForm/>}/>

                      <Route path="reviews/create" element={<ReviewForm/>}/>

                      <Route path="playbacks/create" element={<PlaybackForm/>}/>

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
                      <Route path="users/:id/playbacks/update" element={<PlaybackForm/>}/>
                      <Route path="users/:id/playbacks/delete" element={<PlaybackForm/>}/>
                      <Route path="" element={<Home />} />
                  </Routes>
              </Router>
          </div>
      </div>
  );
}

export default App;
