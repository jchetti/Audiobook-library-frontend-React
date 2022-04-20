import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {isDeleteRequest} from "../../Helpers";

function GenreForm(){
    const location = useLocation();
    const params = location.state;

    const [genreName, setGenreName] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    async function sendRequest(){
        let requestOptions;
        if (isDeleteRequest(params.request)) {
            requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'}
            };
        } else {
            requestOptions = {
                method: params.request.toString(),
                headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
                body: JSON.stringify({name: genreName, description: description})
            };
        }
        const res = await fetch(params.postLink.toString(), requestOptions);
        let status = res.status;
        if (status === 400){
            setErrorMessage(await res.json());
        } else {
            navigate("/genres", {link: params.allGenresLink});
        }
    }

    return (
        <div>
            <h1>{params.title}</h1>
            <div>
                <p id="error">{errorMessage.message}</p>
                <label>Genre name:</label>
                <input id="name" type="text" placeholder="Fantasy, Poetry etc."
                       onChange={(e) => setGenreName(e.target.value)}
                       value={params.genreData ? params.genreData.name : genreName}/>
                <br/>
                <label> Description: </label>
                <textarea id="description" placeholder="Put the description here"
                       onChange={(e) => setDescription(e.target.value)}
                       value={params.genreData ? params.genreData.description : description}/>
            </div>
            <button className="button" type="submit" onClick={() => sendRequest()}> {isDeleteRequest(params.request) ? "Delete" : "Submit"}</button>
        </div>
    )
}

export default GenreForm