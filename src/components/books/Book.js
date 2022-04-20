import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


function Book(){
    const location = useLocation();
    let book = location.state;
    const [genres, setGenres] = useState([])
    const [dateDisp, setDateDisp] = useState("")

    useEffect(() => {

        setDateDisp(formatDate(book.publicationDate))

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
    }, [book, book.genres, formatDate]);



    function formatDate(d) {
        let date = new Date(d);
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    return(
        <div>
            <h1>{book.name}</h1>
            <h3>Authors:</h3>
            {book.authors.map( (author) => (
                <p key={author}>{author}</p>
            ))}
            <h3>Genres:</h3>
            {genres.map( (genre) =>(
                <div key={genre.name} style={{display: "inline"}}>
                    <Link to={`/genres/${genre.name}`} state={genre}>{genre.name}</Link> |
                </div>
            ))}
            <h3>Summary:</h3>
            <p>{book.description}</p>
            <h3>Publication Date:</h3>
            <p>{dateDisp}</p>
            <h3>Duration:</h3>
            <p>{book["duration"] / 1000}s</p>
            <h3>Purchase link:</h3>
            <a href={`${book.link}`} target="_blank">{book.link}</a>
            <hr/>
            <Link to="delete" state={{title: "Delete audiobook", request:"DELETE", postLink: book.url, allBooksLink: book.index}}>Delete audiobook</Link>
            <br/>
            <Link to="update" state={{title: "Update audiobook", request:"PATCH", postLink: book.url, allBooksLink: book.index,
                                      bookTitle: book.name, authors: book.authors, summary: book.description, duration: book.duration,
                                      genres: book.genres, date: book.publicationDate, link: book.link}}>Update audiobook</Link>
        </div>
    )
}

export default Book