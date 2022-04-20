import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function Genre(){
    const [genre, setGenre] = useState({});
    const [books, setBooks] = useState([]);
    const location = useLocation();
    const params = location.state;
    useEffect(() => {
        const fetchBooks = async () =>{
            let allBooks = [];
            for (const bookLink of genre.audiobooks){
                const resBook = await fetch(bookLink);
                const jsonBook = await resBook.json();
                allBooks.push(jsonBook);
            }
            setBooks(allBooks);
        }
        setGenre(params);
        fetchBooks().catch(console.error)
    }, [books, genre.audiobooks, params])

    return(
        <div>
            <h1>Genre: {genre.name}</h1>
            <h3> Description:</h3>
            <p>{ genre.description}</p>
            <h3>Books with this genre:</h3>
            {books.map((book) => (
                <li>{book.name}</li>
            ))}
            <hr/>
            <Link to="delete">Delete Genre</Link>
            <br/>
            <Link to="update">Update Genre</Link>
        </div>
    );
}

export default Genre;