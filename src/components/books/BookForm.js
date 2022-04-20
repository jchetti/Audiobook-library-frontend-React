import {useLocation} from "react-router-dom";
import {useState} from "react";

function BookForm(){
    const location = useLocation();
    const params = location.state;

    const[title, setTitle] = useState(params.title? params.title : "")
    const[authors, setAuthors] = useState(params.authors? params.authors : [])
    const[summary, setSummary] = useState(params.summary? params.summary : "")
    const[duration, setDuration] = useState(params.duration? params.duration : "")
    const[genres, setGenres] = useState(params.genres? params.genres : [])

}

export default BookForm