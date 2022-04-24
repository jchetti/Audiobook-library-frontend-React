import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function Genres(){
    const [genres, setGenres] = useState([]);
    const location = useLocation();
    const params = location.state;

    useEffect( () => {
        document.title = "genres"
        const fetchLinks = async () =>{
            const res = await fetch(params.link);
            const json = await res.json();
            let allGenres = [];
            for (const genre of json.genres){
                const resGenre = await fetch(genre);
                const jsonGenre = await resGenre.json();
                allGenres.push(jsonGenre);
            }
            setGenres(allGenres);
        }

        fetchLinks().catch(console.error);
    }, [params.link]);

    return(
        <div>
            <h1>Genres</h1>
            {genres.map((genre) => (
                <li id={genre.url} key={genre.url}>
                    <Link to={genre.name} state={genre}>{genre.name}</Link>
                </li>
            ))}
        </div>
    );
}

export default Genres;