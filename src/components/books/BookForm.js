import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {isDeleteRequest} from "../../Helpers";

function BookForm(){
    const location = useLocation();
    const params = location.state;

    const[bookTitle, setBookTitle] = useState(params.bookTitle ? params.bookTitle : "");
    const[authors, setAuthors] = useState(params.authors ? params.authors : []);
    const[summary, setSummary] = useState(params.summary ? params.summary : "");
    const[duration, setDuration] = useState(params.duration ? params.duration : "");
    const[genres, setGenres] = useState(params.genres ? params.genres : []);
    const[date, setDate] = useState(params.date ? params.date : "");
    const[link, setLink] = useState(params.link ? params.link : "");

    const[displayDate, setDisplayDate] = useState("");

    let[allGenres, setAllGenres] = useState([]);

    const[errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    async function sendRequest(){
        let requestOptions;
        if(isDeleteRequest(params.request)){
            requestOptions = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
                body: JSON.stringify({removed:true})
            };
        } else {
            requestOptions = {
                method: params.request.toString(),
                headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
                body: JSON.stringify({authors: authors, genres: genres, name:bookTitle, description: summary, duration:duration, publicationDate:date, link:link})
            }
        }
        const res = await fetch(params.postLink.toString(), requestOptions);
        let status = res.status;
        if (status === 400){
            setErrorMessage(await res.json());
        } else {
            if(params.request === "PATCH"){
                const res = await fetch(params.postLink);
                const book = await res.json();
                navigate(`/books/${book.name}`, {state: book});
            } else {
                navigate("/books", {state:{link: params.allBooksLink}});
            }
        }
    }

    function handleCheckGenre(event){
        let updatedList = [...allGenres];
        for(let genre of updatedList){
            if(genre.url === event.target.value){
                genre.checked = event.target.checked;
            }
        }
        setAllGenres(updatedList);
    }

    useEffect(() => {
        document.title = "audiobooks form"
       const fetchGenres = async () => {
           let tmpRes = await fetch(params.allBooksLink);
           let tmpJson = await tmpRes.json();
           tmpRes = await fetch(tmpJson.index);
           tmpJson = await tmpRes.json();
           const res = await fetch(tmpJson.genres);
           const genresJson = await res.json();
           let AGenres = [];
           for(const genreLink of genresJson.genres){
               const resGenre = await fetch(genreLink);
               const jsonGenre = await resGenre.json();
               if(genres){
                   jsonGenre.checked = genres.includes(jsonGenre.url);
               } else {
                   jsonGenre.checked = false;
               }
               AGenres.push(jsonGenre);
               setAllGenres(AGenres);
           }

       }
       fetchGenres().catch(console.error);
       if(date){
           let tmpDate = new Date(date);
           setDisplayDate(tmpDate.toISOString().split('T')[0]);
       }
    }, [date, genres, params.allBooksLink]);

    return (
        <div>
            <h1>{params.title}</h1>
            <div>
                <p id="error">{errorMessage.message}</p>
                {isDeleteRequest(params.request) ?
                    <div><p>Do you really want to delete this audiobook?</p></div> :
                    <div>
                        <label>Title:</label>
                        <input id="title" type="text" placeholder="title" name="title"
                               onChange={(e) => setBookTitle(e.target.value)}
                               value={bookTitle}/>
                        <br/>
                        <label>Authors:</label>
                        <input id="authors" type="text" placeholder="authors" name="authors"
                               onChange={(e) => setAuthors(e.target.value)}
                               value={authors}/>
                        <br/>
                        <label> Summary:</label>
                        <textarea id="summary" placeholder="summary" name="summary"
                                  onChange={(e) => setSummary(e.target.value)}
                                  value={summary}/>
                        <br/>
                        <label> Duration:</label>
                        <input id="duration" type="text" placeholder="Duration in ms" name="duration"
                               onChange={(e) => setDuration(e.target.value)}
                               value={duration}/>
                        <br/>
                        <label>Genres:</label>
                        <div>
                            {allGenres.map( (genre)=>(
                                <div key={genre.name} style={{display: "inline"}}>
                                    <input type="checkbox"  value={genre.url} checked={genre.checked}
                                           onChange={(e) => handleCheckGenre(e)}/>
                                    <label>{genre.name}</label>
                                </div>
                            ))}
                        </div>
                        <label>Publication Date:</label>
                        <input type="date" id="date" name="date" value={displayDate} onChange={(e) => setDate(e.target.value)}/>
                        <br/>
                        <label>Purchase Link:</label>
                        <input type="text" id="link" name="link" placeholder="purchase link" value={link}
                                onChange={(e) => setLink(e.target.value)}/>
                    </div>}
            </div>
            <button className="button" type="submit" onClick={() => sendRequest()}> {isDeleteRequest(params.request) ? "Delete" : "Submit"}</button>
        </div>
    )

}

export default BookForm