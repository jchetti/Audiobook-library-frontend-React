import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

function Books() {

    const [books, setBooks] = useState([])
    const location = useLocation()
    const params = location.state

    useEffect( () => {
        const fetchLinks = async () => {
            const res = await fetch(params.link.audiobooks)
            const json = await res.json()
            let allBooks = []
            for (let book of json.audiobooks){
                const resBook = await fetch(book);
                const jsonBook = await resBook.json();
                jsonBook.users = params.users;
                jsonBook.allReviews = params.link.reviews;
                allBooks.push(jsonBook)
            }
            setBooks(allBooks)
        }
        fetchLinks().catch(console.error)
    }, [params.link.audiobooks, params.link.reviews, params.users]);

    return (
        <div>
            <h1>All Audiobooks</h1>
            {books.filter((book) => !book.removed).map((book) => (
                <li key={book.url}>
                    <Link to={book.name} state={book}>{book.name}</Link>
                </li>
            ))}
        </div>
    );
}

export default Books;
