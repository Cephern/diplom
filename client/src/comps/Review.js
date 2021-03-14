const Review = ({ review }) => {
  return (
    <div className="review">
      <h4>
        Отзыв от <span className="fio-span">{review.reviewer}</span>
      </h4>
      <p>{review.review}</p>
    </div>
  );
};

export default Review;
