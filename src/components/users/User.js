import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function User(){
    const location = useLocation();
    const user = location.state;
    const [playbacks, setPlaybacks] = useState([]);

    useEffect(() => {
        document.title = user.name
       const fetchPlaybacks = async () => {
           let allPlaybacks = [];
           for (const playbackLink of user.playbacks){
               const resPlayback = await fetch(playbackLink);
               const jsonPlayback = await resPlayback.json();
               const resBook = await fetch(jsonPlayback.audiobook);
               jsonPlayback.jsonBook = await resBook.json();
               jsonPlayback.jsonBook.users = user.index;
               const resUserLinks = await fetch(user.index);
               const jsonUserLinks = await resUserLinks.json();
               const resAllLinks = await fetch(jsonUserLinks.index);
               const jsonAllLinks = await resAllLinks.json()
               jsonPlayback.jsonBook.allReviews = jsonAllLinks.reviews;
               allPlaybacks.push(jsonPlayback);
               setPlaybacks(allPlaybacks)
           }
           setPlaybacks(allPlaybacks);
           
       }
       fetchPlaybacks().catch(console.error);
    }, [user.index, user.name, user.playbacks]);

    return(
      <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <Link to="delete" state={{title: "Delete user", request: "DELETE", postLink: user.url, allUsersLink: user.index}}>Delete User</Link>
          <br/>
          <Link to="update" state={{title: "Update user", request: "PATCH", postLink: user.url, allUsersLink: user.index, username: user.name,
                                    email: user.email}}>Update User</Link>
          <hr/>
          <h2>Playbacks: </h2>
          {playbacks.map((playback) => (
              <div key={playback.url}>
                  <hr/>
                  <Link to={`/books/${playback.jsonBook.name}`} state={playback.jsonBook}>{playback.jsonBook.name}</Link>
                  <br/>
                  <div style={{display: "inline"}}>
                      <label>Position: </label>
                      <label> {playback.position / 1000}s / {playback.jsonBook.duration / 1000}s | </label>
                      <Link to={`/users/${playback.jsonBook.name}/playbacks/update`}
                            state={{title: "Update playback", request: "PATCH", allUsersLink: user.index, user:user,
                                selectedBook: playback.jsonBook.url, position: playback.position, requestUrl: playback.url}}>
                          Update Playback</Link>
                      <label> | </label>
                      <Link to={`/users/${playback.jsonBook.name}/playbacks/delete`}
                            state={{title: "Delete playback", request:"DELETE", allUsersLink: user.index, user:user, requestUrl: playback.url}}>
                          Delete Playback</Link>
                  </div>
              </div>
          ))}
          <hr/>
          <Link to="/playbacks/create" state={{title: "Create playback", request: "POST", allUsersLink: user.index, user:user}}>Add playback position</Link>
      </div>
    );
}

export default User;