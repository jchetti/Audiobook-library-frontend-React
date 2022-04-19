import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import {type} from "@testing-library/user-event/dist/type";

function Genres(){
    const [genres, setGenres] = useState(null)
    const location = useLocation()
    const params = location.state

    useEffect( () => {
        const fetchLinks = async () =>{
            const res = await fetch(params.link.genres)
            const json = await res.json()
            const genres = await json.genres
            console.log(genres);
            console.log(typeof (genres));
            for (const genre of genres){
                setGenres(genres => [...genres, genre])
            }
        }

        //fetchLinks().catch(console.error)
    })

    return(
        <div>
            {/*<ul>*/}
            {/*    {genres.map((genre) => (*/}
            {/*        <h3>genre</h3>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
}

export default Genres;