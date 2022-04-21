import {useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {isDeleteRequest} from "../../Helpers";

function UserForm(){
    const location = useLocation();
    const params = location.state;

    const [username, setUsername] = useState(params.username ? params.username : "");
    const [email, setEmail] = useState(params.email ? params.email : "");
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    useEffect( () => {
        document.title = "user form"
    }, [])

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
                body: JSON.stringify({name: username, email: email})
            };
        }
        const res = await fetch(params.postLink.toString(), requestOptions);
        let status = res.status
        if (status === 400){
            setErrorMessage(await res.json());
        } else {
            if(params.request === "PATCH"){
                const res = await fetch(params.postLink);
                const user = await res.json()
                navigate(`/users/${user.name}`, {state: user})
            } else {
                navigate("/users", {state :{link: params.allUsersLink}});
            }
        }
    }

    return (
      <div>
          <h1>{params.title}</h1>
          <div>
              <p id="error">{errorMessage.message}</p>
              {isDeleteRequest(params.request) ?
                  <div><p>Do you really want to delete this user?</p></div> :
                  <div>
                      <label>Username: </label>
                      <input id="username" type="text" placeholder="username"
                             onChange={(e) => setUsername(e.target.value)}
                             value={username}/>
                      <br/>
                      <label>Email: </label>
                      <input id="email" type="text" placeholder="email"
                             onChange={(e) => setEmail(e.target.value)}
                             value={email}/>
                      <br/>

                  </div>}
          </div>
          <button className="button" type="submit" onClick={() => sendRequest()}> {isDeleteRequest(params.request) ? "Delete" : "Submit"}</button>
      </div>
    );
}
export default UserForm;