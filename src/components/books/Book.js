import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Reviews from "../reviews/Reviews";


function Book(){
    const location = useLocation();
    const book = location.state;
    const [genres, setGenres] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
       const fetchGenres = async () => {
           let allGenres = [];
           for(const genreLink of book.genres){
               const resGenre = await fetch(genreLink);
               const jsonGenre = await resGenre.json();
               allGenres.push(jsonGenre);
           }
           setGenres(allGenres);
       }
        const fetchReviews = async () => {
           let allReviews = [];
            for (const reviewLink of book.reviews){
                const resReview = await fetch(reviewLink);
                const jsonReview = await resReview.json();
                const resUser = await fetch(jsonReview.user);
                jsonReview.jsonUser = await resUser.json();
                jsonReview.allUsers = book.users;
                allReviews.push(jsonReview);
            }
            setReviews(allReviews);
        }
        fetchGenres().catch(console.error);
       fetchReviews().catch(console.error);
    }, [book.genres, book.reviews]);

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
            <h3>Duration:</h3>
            <p>{book["duration"] / 1000}s</p>
            <h3>Purchase link:</h3>
            <a href={`${book.link}`} target="_blank">{book.link}</a>
            <hr/>
            <Link to={"/reviews/create"} state={{title: "Write review", request: "POST", requestUrl: book.reviews,
                bookLink: book.url, usersLink: book.users}}>Write review</Link>
            <Reviews reviews={reviews}/>
        </div>
    )
}

export default Book