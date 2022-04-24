import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {isDeleteRequest} from "../../Helpers";

function GenreForm(){

    useEffect( () => {
        document.title = "genre form"
    }, [])

    const location = useLocation();
    const params = location.state;

    const [genreName, setGenreName] = useState(params.genreName ? params.genreName : "");
    const [description, setDescription] = useState(params.genreDescription ? params.genreDescription : "");
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
            if(params.request === "PATCH"){
                const res = await fetch(params.postLink);
                const genre = await res.json();
                navigate(`/genres/${genre.name}`, {state: genre});
            } else {
                navigate("/genres", {state :{link: params.allGenresLink}});
            }
        }
    }

    return (
        <div>
            <h1>{params.title}</h1>
            <div>
                <p id="error">{errorMessage.message}</p>
                {isDeleteRequest(params.request) ?
                    <div><p>Do you really want to delete this genre?</p></div> :
                    <div>
                        <label>Genre name:</label>
                        <input id="name" type="text" placeholder="Fantasy, Poetry etc."
                               onChange={(e) => setGenreName(e.target.value)}
                               value={genreName}/>
                        <br/>
                        <label> Description: </label>
                        <textarea id="description" placeholder="Put the description here"
                                  onChange={(e) => setDescription(e.target.value)}
                                  value={description}/>
                    </div>}

            </div>
            <button className="button" type="submit" onClick={() => sendRequest()}> {isDeleteRequest(params.request) ? "Delete" : "Submit"}</button>
        </div>
    )
}

export default GenreForm