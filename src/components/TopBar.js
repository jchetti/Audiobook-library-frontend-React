import React, {useEffect , useState} from 'react';
import {  Link } from "react-router-dom";
function TopBar() {
    const [links, setLinks] = useState(undefined)

    useEffect( () => {
        const fetchLinks = async () =>{
            const res = await fetch("https://groep34.webdev.ilabt.imec.be/");
            const json = await res.json()
            setLinks(json)
        }
        fetchLinks().catch(console.error)
    })
    return (
        <div className="topnav">
            <Link to="/">Home</Link>
            <Link to="/books" state={{link: links}}>All books</Link>
            <Link to="/genres" state={{link: links}}>All genres</Link>
        </div>
    );
}
export default TopBar;