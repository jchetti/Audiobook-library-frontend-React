import {useEffect, useState} from "react";

function Reviews(props){

    const [reviews, setReviews] = useState([])

    useEffect( () => {
        const fetchReviews = async () => {
            let allReviews = [];
            for (const reviewLink of props.reviewLinks){
                const resReview = await fetch(reviewLink);
                const jsonReview = await resReview.json();
                allReviews.push(jsonReview);
            }
            setReviews(allReviews);
        }
        fetchReviews().catch(console.error);
        console.log(reviews);
    })

    return(
        <div>
            <h3>Reviews</h3>
        </div>
    );
}

export default Reviews;