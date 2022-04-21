import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function Genre(){
    const location = useLocation();
    const genre = location.state;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        document.title = genre.name
        const fetchBooks = async () =>{
            let allBooks = [];
            for (const bookLink of genre.audiobooks){
                const resBook = await fetch(bookLink);
                const jsonBook = await resBook.json();
                allBooks.push(jsonBook);
            }
            setBooks(allBooks);
        }
        fetchBooks().catch(console.error)
    }, [genre.audiobooks]);

    return(
        <div>
            <h1>Genre: {genre.name}</h1>
            <h3> Description:</h3>
            <p>{ genre.description}</p>
            <h3>Books with this genre:</h3>
            {books.map((book) => (
                <li key={book.url}>{book.name}</li>
            ))}
            <hr/>
            <Link to="delete" state={{title: "Delete genre",request: "DELETE", postLink: genre.url, allGenresLink: genre.index}}>Delete Genre</Link>
            <br/>
            <Link to="update" state={{title: "Update genre",request: "PATCH", postLink: genre.url, allGenresLink: genre.index,
                                        genreName: genre.name, genreDescription: genre.description}}>Update Genre</Link>
        </div>
    );
}

export default Genre;