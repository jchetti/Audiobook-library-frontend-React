import {useEffect, useState} from "react";

function Reviews(props){

    // const [reviews, setReviews] = useState([])
    //console.log(props.reviewLinks);

    // useEffect( () => {
    //     const fetchReviews = async () => {
    //         let allReviews = [];
    //         for (const reviewLink of props.reviewLinks){
    //             const resReview = await fetch(reviewLink);
    //             const jsonReview = await resReview.json();
    //             allReviews.push(jsonReview);
    //         }
    //         setReviews(allReviews);
    //     }
    //     fetchReviews().catch(console.error);
    // });

    return(
        <div>
            <h3>Reviews</h3>
            {props.reviews.map((review) =>
                <div key={review.url}>
                    <p>{review.description}</p>
                </div>)}
        </div>
    );
}

export default Reviews;