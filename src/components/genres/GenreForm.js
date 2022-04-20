import {useLocation} from "react-router-dom";
import {useState} from "react";

function GenreForm(){
    const location = useLocation();
    const params = location.state;

    const [genreName, setGenreName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <h1>{params.title}</h1>
            <div>
                <label>Genre name:</label>
                <input id="name" type="text" placeholder="Fantasy, Poetry etc."
                       onChange={(e) => setGenreName(e.target.value)}
                       value={params.genreData ? params.genreData.name : genreName}/>
                <br/>
                <label> Description: </label>
                <input id="description" type="text" placeholder="Put the description here"
                       onChange={(e) => setDescription(e.target.value)}
                       value={params.genreData ? params.genreData.description : description}/>
            </div>

            <button className="button" type="submit" onClick={() => {}}> {params.request === "DELETE" ? "Delete" : "Submit"}</button>
        </div>
    )
}

export default GenreForm