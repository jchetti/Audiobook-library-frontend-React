import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function Books() {

    const [books, setBooks] = useState([])
    const location = useLocation()
    const params = location.state

    useEffect( () => {
        const fetchLinks = async ()=>{
            const res = await fetch(params.link.audiobooks)
            const json = await res.json()
            let allBooks = []
            for (let book of json.audiobooks){
                const resBook = await fetch(book)
                const jsonBook = await resBook.json()
                allBooks.push(jsonBook)
            }
            setBooks(allBooks)
        }
        fetchLinks().catch(console.error)
    });

    return (
        <div>
            <h1>Books</h1>
            <table>
                <tbody>
                {
                    books && books.map(book =>
                        <tr>
                            <td>{book.name}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default Books;
