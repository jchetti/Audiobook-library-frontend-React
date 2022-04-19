import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import {type} from "@testing-library/user-event/dist/type";

function Genres(){
    const [genres, setGenres] = useState(null)
    const location = useLocation()
    const params = location.state

    useEffect( () => {
        const fetchLinks = async () =>{
            const res = await fetch(params.link.genres);
            const json = await res.json();
            let allGenres = []
            for (const genre of json.genres){
                const resGenre = await fetch(genre)
                const jsonGenre = await resGenre.json()
                allGenres.push(jsonGenre)
            }
            setGenres(allGenres)
        }

        fetchLinks().catch(console.error);
    });

    return(
        <div>
            <ul>
                {genres.map((genre) => (
                    <li>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Genres;