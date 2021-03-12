import { useContext, useState } from "react";
import axios from "axios";

import Review from "./Review";
import Nav from "./Nav";

import { reviewsContext } from "../context/reviewsContext";

const About = () => {
  const reviews = useContext(reviewsContext);
  const [fio, setFio] = useState();
  const [review, setReview] = useState();

  const handleSubmit = (e) => {
    axios
      .post("https://nano-doc.herokuapp.com/api/reviews", { fio, review })
      .catch((err) => console.log(err));
  };

  return (
    <div id="about">
      <Nav />
      <main>
        <h2>О Сервисе</h2>

        <div className="description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            quod distinctio, aliquam libero sed necessitatibus. Laudantium
            facilis laborum ratione cumque cum ducimus ad voluptatibus est,
            necessitatibus culpa aspernatur. Commodi enim dolorum eum officiis?
            Quod enim quidem natus, ut numquam maiores, voluptate debitis
            dignissimos voluptatum hic, quibusdam repellat corrupti delectus
            tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Autem, ipsam. At eaque exercitationem quae ad nobis pariatur
            architecto. Possimus ratione a repellat quae impedit expedita! Error
            dolores, similique et sint autem nemo minus fuga culpa sapiente.
            Deleniti magnam sed commodi aperiam numquam, laudantium, id
            repudiandae, accusantium eligendi blanditiis quo non. Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Vero quibusdam deleniti
            ipsum officiis officia et culpa consectetur, atque recusandae. Ipsum
            nobis consectetur voluptatem temporibus cum aspernatur, eos
            molestias, repellendus provident quo magnam incidunt dignissimos
            illo dolor praesentium eligendi culpa expedita consequatur dolorem
            eaque beatae sint? Eius officiis labore illo consequuntur.
          </p>
        </div>

        <div className="reviews">
          <h3>Отзывы</h3>

          <div className="reviews-inner">
            {reviews ? (
              reviews
                .slice(0, 4)
                .map((review) => <Review review={review} key={review._id} />)
            ) : (
              <div>Пока что тут пусто...</div>
            )}
          </div>
        </div>
        <form className="submit-review" onSubmit={handleSubmit}>
          <label htmlFor="fio">Отзыв от:</label>
          <input
            type="text"
            value={fio}
            onChange={(e) => setFio(e.target.value)}
          />
          <label htmlFor="review">Отзыв:</label>
          <textarea
            id="review"
            cols="30"
            rows="10"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button>Отправить</button>
        </form>
      </main>
    </div>
  );
};

export default About;
