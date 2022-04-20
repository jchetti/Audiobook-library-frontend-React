import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


function Book(){
    const location = useLocation();
    const book = location.state;
    const [genres, setGenres] = useState([])

    useEffect(() => {
       const fetchGenres = async () => {
           let allGenres = []
           for(const genreLink of book.genres){
               const resGenre = await fetch(genreLink);
               const jsonGenre = await resGenre.json();
               allGenres.push(jsonGenre);
           }
           setGenres(allGenres)
       }
       fetchGenres().catch(console.error)
    });

    return(
        <div>
            <h1>{book.name}</h1>
            <h3>Authors:</h3>
            {book.authors.map( (author) => (
                <p>{author}</p>
            ))}
            <h3>Genres:</h3>
            {genres.map( (genre) =>(
                <div style={{display: "inline"}}>
                    <Link to={`/genres/${genre.name}`} state={genre}>{genre.name}</Link> |
                </div>
            ))}
            <h3>Summary:</h3>
            <p>{book.description}</p>
            <h3>Duration:</h3>
            <p>{book["duration"] / 1000}s</p>
            <h3>Purchase link:</h3>
            <a href={`${book.link}`} target="_blank">{book.link}</a>

        </div>
    )
}

export default Book