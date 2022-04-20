import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {isDeleteRequest} from "../../Helpers";

function ReviewForm(){
    const location = useLocation();
    const params = location.state;

    const [currentUserUrl, setCurrentUserUrl] = useState("");
    const [users, setUsers] = useState([]);
    //const [username, setUsername] = useState(params.username ? params.username : "");
    const [score, setScore] = useState(params.score ? params.score : 1);
    const [description, setDescription] = useState(params.description ? params.description : "");
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    async function sendReviewRequest(){
        // const resUser = await fetch(currentUserUrl);
        // const jsonUser = await resUser.json();
        console.log(currentUserUrl);
        let requestOptions = {
            method: params.request.toString(),
            headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
            body: JSON.stringify({user: currentUserUrl, audiobook: params.bookLink, description: description, score: score})
        }
        const res = await fetch(params.requestUrl.toString(), requestOptions);
        let status = res.status;
        if (status === 400){
            setErrorMessage(await res.json());
        } else {
            const res = await fetch(params.bookLink);
            const book = await res.json()
            navigate(`/books/${book.name}`, {state: book})
        }
    }

    useEffect( () => {
        const fetchUsers = async () => {
            const res = await fetch(params.usersLink);
            const json = await res.json();
            let allUsers = [];
            for (const user of json.users){
                const resUser = await fetch(user);
                const jsonUser = await resUser.json();
                allUsers.push(jsonUser);
            }
            setUsers(allUsers);
        }
        fetchUsers().catch(console.error);
    });

    return (
        <div>
            <h1>{params.title}</h1>
            <p id="error">{errorMessage.message}</p>
            <label>User: </label>
            <select id="dropDownUser" name="user" onChange={(e) => setCurrentUserUrl(e.target.value)}>
                {users.map((user) => (
                    <option value={user.url}>{user.name}</option>
                ))}
            </select>
            <label>Score: </label>
            <select id="dropDownScore" name="score" onChange={(e) => setScore(e.target.value)}>
                {[1,2,3,4,5,6,7,8,9,10].map((s) => (
                    <option defaultValue={score}>{s}</option>
                ))}
            </select>
            <div>
                <textarea id="review"
                          onChange={(e) => {setDescription(e.target.value)}}
                          value={description}/>
            </div>
            <button className="button" type="submit" onClick={() => sendReviewRequest()}>Submit</button>
            {isDeleteRequest(params.request) ?
                <button className="button" type="submit" onClick={() => sendReviewRequest()}>Submit</button> :
            <br/>}
        </div>
    );
}

export default ReviewForm;