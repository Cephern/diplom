import { useState, useContext } from "react";
import { doctorsContext } from "../context/doctorsContext";
import { userContext } from "../context/userContext";

import Question from "./Question";
import DoctorsInput from "./DoctorsInput";
import Nav from "./Nav";

import axios from "axios";

const Home = () => {
  const user = useContext(userContext);
  const doctors = useContext(doctorsContext);

  const [questions, setQuestions] = useState([
    {
      id: 0,
      name: "character",
      body: "Опишите характер боли",
      asw1: "не болит",
      asw2: "боль после еды",
      asw3: "боль после холодного",
      asw4: "боль после горячего",
    },
    {
      id: 1,
      name: "duration",
      body: "Опишите длительность боли",
      asw1: "не болит",
      asw2: "проходит почти сразу, после устранения причины",
      asw3: "не более 5 минут",
      asw4: "длится часами",
    },
    {
      id: 2,
      name: "regularity",
      body: "Опишите регулярность возникновения боли",
      asw1: "не болит",
      asw2: "болит после приема пищи/питья",
      asw3: "болит само по себе, несколько раз в день, чаще ночью",
      asw4: "болит при накусывании на зуб",
    },
    {
      id: 3,
      name: "intesity",
      body: "Опишите интенсивность боли",
      asw1: "не болит",
      asw2: "боль жмущая, ноющая, больше раздражает, чем болит",
      asw3: "болит умеренно, проходит после приема обезболивающего",
      asw4: "болит сильно, боль распирающая, резкая, длительная",
    },
    {
      id: 4,
      name: "localisation",
      body: "Опишите локализацию боли",
      asw1: "не болит",
      asw2: "болит в зубе, могу указать зуб",
      asw3: "болит в зубе, не могу указать конкретный зуб",
      asw4: "болит в челюсти",
    },
    {
      id: 5,
      name: "color",
      body: "Опишите цвет беспокоящего зуба",
      asw1: "зуб отсутствует",
      asw2: "в цвете изменен, серый",
      asw3: "в цвете изменен, желтый",
      asw4: "в цвете не изменен",
    },
    {
      id: 6,
      name: "plaque",
      body: "Есть ли налет на зубах",
      asw1: "нет",
      asw2: "налет черного цвета в придесневой области",
      asw3: "налет черный на всей поверхности зуба",
      asw4: "есть зубные камни",
    },
    {
      id: 7,
      name: "bleeding",
      body: "Есть ли кровоточивость при чистке зубов",
      asw1: "нет",
      asw2: "есть около одного зуба",
      asw3: "есть около 2-3 зубов",
      asw4: "есть в области всех зубов",
    },
    {
      id: 8,
      name: "condition",
      body: "Опишите состояние беспокоящего зуба",
      asw1: "зуб цел",
      asw2: "есть кариозные полости",
      asw3: "зуб наполовину разрушен",
      asw4: "зуб полностью разрушен/есть только корень",
    },
    {
      id: 9,
      name: "length",
      body: "Как давно зуб начал беспокоить",
      asw1: "день назад",
      asw2: "меньше недели",
      asw3: "меньше года",
      asw4: "больше года",
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [answers, setAnswers] = useState([]);
  const [fio, setFio] = useState(user.fio);

  const handleAnswers = async (answer) => {
    if (answers.find((ans) => answer.name === ans.name)) {
      answers.map((ans) => {
        if (ans.name === answer.name) {
          ans.num = answer.num;
        }
        return ans;
      });
      setAnswers(answers);
    } else {
      setAnswers([...answers, answer]);
    }
    console.log(answers);
  };

  const handleChange = (e) => {
    setFio(e.target.value);
  };

  const [result, setResult] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answers.length < 10) {
      setIsOpen(true);
      setTimeout(setIsOpen, 1000, false);
      return;
    } else {
      axios
        .post("https://nano-doc.herokuapp.com/api/form", {
          answers,
          selectedDoctor,
          fio,
        })
        .then((res) => setResult(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div id="home">
      <Nav />
      <form onSubmit={handleSubmit}>
        <div className="upper">
          <div className="fio-wrap">
            <label htmlFor="name" id="fioLabel">
              Ваше ФИО
            </label>
            <input type="text" id="fio" onChange={handleChange} value={fio} />
          </div>
          <h3>Ваш Врач</h3>
          <div className="doctors-inputs">
            {doctors ? (
              doctors.map((doctor) => (
                <DoctorsInput
                  doctorName={doctor.name}
                  setSelectedDoctor={setSelectedDoctor}
                  key={doctor._id}
                />
              ))
            ) : (
              <div className="loading">Loading...</div>
            )}
          </div>
        </div>

        <div className="form">
          <h2>Форма</h2>
          <ul className="form-inputs">
            {questions.map((question) => (
              <Question
                key={question.id}
                name={question.name}
                body={question.body}
                asw1={question.asw1}
                asw2={question.asw2}
                asw3={question.asw3}
                asw4={question.asw4}
                handleAnswers={handleAnswers}
              />
            ))}
          </ul>
        </div>
        <button>Отправить</button>
      </form>

      <div className="result">
        {isOpen ? <div>Нужно ответить на все вопросы</div> : ""}
        {result ? (
          <div className="result-inner">
            <p>
              {result.fio
                ? `Результаты для: ${result.fio}`
                : "Результаты для: Аноним"}
            </p>
            <p>
              {result.selectedDoctor
                ? `Ваш врач: ${result.selectedDoctor}`
                : `Ваш врач: еще не выбран`}
            </p>
            <p>{`Ваш предварительный диагноз: ${result.diagnos}`}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
