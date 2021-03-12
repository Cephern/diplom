const Review = ({ review }) => {
  return (
    <div className="review">
      <h4>Review by {review.reviewer}</h4>
      <p>{review.review}</p>
    </div>
  );
};

export default Review;
