import { useContext, useState } from "react";
import axios from "axios";

import Review from "./Review";
import Nav from "./Nav";

import { reviewsContext } from "../context/reviewsContext";
import { userContext } from "../context/userContext";

const About = () => {
  const reviews = useContext(reviewsContext);
  const user = useContext(userContext);
  const [fio, setFio] = useState(user.fio);
  const [review, setReview] = useState();

  const handleSubmit = (e) => {
    axios
      .post("https://nano-doc.netlify.app/api/reviews", { fio, review })
      .catch((err) => console.log(err));
  };

  return (
    <div id="about">
      <Nav />
      <main>
        <h2>О Сервисе</h2>

        <div className="description">
          <p>
            Здравствуйте и спасибо за выбор сервиса “NanoDoc”. Цель нашего
            сервиса – предоставить Вам предварительный диагноз
            стоматологического заболевания. Все что нужно сделать – заполнить
            форму на главной странице, ответив на 10 коротких вопросов. Для
            получения результата обязательно ответить на все вопросы. Если вы
            хотите, чтобы вашу заявку и диагноз рассмотрел врач – выберите его
            из списка в верхней части страницы. Для облегчения выбора врача мы
            предоставляем страницу “Врачи”, которая поможет сделать Вам
            правильный выбор. После нажатия кнопки “Отправить” на Главной
            странице, врачу поступят данные о Вас (ФИО), а также Ваши ответы на
            вопросы формы. Если у Вас остались какие-то вопросы, пожелания и
            предложения, или же Вы хотите поделиться своим опытом использования
            приложения, тогда стоит оставить отзыв, заполнив форму внизу
            страницы. Будем рады Вашим комментариям!
          </p>
        </div>

        <div className="reviews">
          <h3>Отзывы</h3>

          <div className="reviews-inner">
            {reviews ? (
              reviews
                .slice(0, 6)
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
