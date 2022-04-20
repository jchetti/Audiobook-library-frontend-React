import {Link} from "react-router-dom";

function Reviews(props){
    return(
        //TODO wss key toevoegen aan deze div
        <div>
            <h3>Reviews</h3>
            {props.reviews.map((review) =>
                <div key={review.url}>
                    <hr/>
                    <div style={{display: "inline"}}>
                        <label className="data">User: </label>
                        <Link to={`/users/${review.jsonUser.name}`} state={review.jsonUser}>{review.jsonUser.name}</Link>
                        <label className="data"> | Score: {review.score} | </label>
                        <Link to="reviews/update" state={{title: "Update review", request: "PATCH", requestUrl: review.url, bookLink: review.audiobook,
                                usersLink: review.allUsers, score: review.score, username: review.jsonUser.name,
                                description: review.description, currentUserUrl: review.jsonUser.url,
                                allReviews: review.index}}>edit</Link>
                    </div>
                    <p>{review.description}</p>
                </div>)}
        </div>
    );
}

export default Reviews;