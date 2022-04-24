import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {isDeleteRequest} from "../../Helpers";

function PlaybackForm(){
    const location = useLocation();
    const params = location.state;

    const user = params.user;
    const [requestUrl, setRequestUrl] = useState(params.requestUrl ? params.requestUrl : "");
    const [currentBookUrl, setCurrentBookUrl] = useState(params.selectedBook? params.selectedBook : "");
    const [currentPosition, setCurrentPosition] = useState(params.position? params.position : 0);
    const [allBooks, setAllBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    useEffect( () => {
        document.title = "playback form"
        const fetchShit = async () => {
            const usersRes = await fetch(params.allUsersLink);
            const userJson = await usersRes.json();
            const homeRes = await fetch(userJson.index);
            const homeJson = await homeRes.json();
            if(requestUrl === "")
                setRequestUrl(homeJson.playbacks);
            const booksRes = await fetch(homeJson.audiobooks);
            const booksJson = await booksRes.json();
            let books = [];
            for(let book of booksJson.audiobooks){
                const bookRes = await fetch(book);
                const bookJson = await bookRes.json();
                books.push(bookJson);
            }
            setAllBooks(books);

        }
        fetchShit().catch(console.error);
    });

    async function sendRequest(){
        let requestOptions;
        if (isDeleteRequest(params.request)){
            requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'}
            };
        } else {
            requestOptions = {
                method: params.request.toString(),
                headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
                body: JSON.stringify({user: user.url, audiobook: currentBookUrl, position: currentPosition})
            }
        }
        const res = await fetch(requestUrl, requestOptions);
        let status = res.status;
        if(status === 400){
            setErrorMessage(await res.json())
        } else {
            const userRes = await fetch(user.url);
            const userJson = await userRes.json();
            navigate(`/users/${user.name}`, {state:userJson});
        }
    }

    return(
      <div>
          <h1>{params.title}</h1>
          <p id="error">{errorMessage.message}</p>
          {isDeleteRequest(params.request) ?
              <div><p>Do you really want to delete this playback?</p></div> :
            <div>
              <label>Audiobook: </label>
              <select id="dropDownBook" name="book" onChange={(e) => setCurrentBookUrl(e.target.value)}>
                  {allBooks.map( (book) => (
                      <option key={book.url} value={book.url} selected={book.url === currentBookUrl}>{book.name}</option>
                  ))}
              </select>
              <br/>
              <label>Position: </label>
              <input id="progress" type="number" placeholder="position in book" value={currentPosition}
                        onChange={(e) => setCurrentPosition(e.target.value)}/>

            </div>}
          <br/>
          <button className="button" type="submit" onClick={() => sendRequest()}> {isDeleteRequest(params.request) ? "Delete" : "Submit"}</button>
      </div>
    );
}

export default PlaybackForm