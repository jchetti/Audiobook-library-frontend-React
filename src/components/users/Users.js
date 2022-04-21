import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";

function Users(){
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const params = location.state;

    useEffect( () => {
        document.title = "users"

        const fetchLinks = async () => {
            const res = await fetch(params.link);
            const json = await res.json();
            let allUsers = [];
            for (const user of json.users){
                const resUser = await fetch(user);
                const jsonUser = await resUser.json();
                allUsers.push(jsonUser);
                setUsers(allUsers);
            }

        }
        fetchLinks().catch(console.error);
    }, [params.link]);

    return(
        <div>
            <h1>Users</h1>
            {users.map((user) => (
                <li id={user.url} key={user.url}>
                    <Link to={user.name} state={user}>{user.name}</Link>
                </li>
            ))}
        </div>
    );
}

export default Users;