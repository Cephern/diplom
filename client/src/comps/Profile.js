import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import axios from "axios";
import ProfileInner from "./ProfileInner";

const Profile = () => {
  const user = useContext(userContext);
  const [forms, setForms] = useState("");
  const [decrypt, setDecrypt] = useState({
    character: {
      body: "Опишите характер боли",
      1: "не болит",
      2: "боль после еды",
      3: "боль после холодного",
      4: "боль после горячего",
    },
    duration: {
      body: "Опишите длительность боли",
      1: "не болит",
      2: "проходит почти сразу, после устранения причины",
      3: "не более 5 минут",
      4: "длится часами",
    },
    regularity: {
      body: "Опишите регулярность возникновения боли",
      1: "не болит",
      2: "болит после приема пищи/питья",
      3: "болит само по себе, несколько раз в день, чаще ночью",
      4: "болит при накусывании на зуб",
    },
    intesity: {
      body: "Опишите интенсивность боли",
      1: "не болит",
      2: "боль жмущая, ноющая, больше раздражает, чем болит",
      3: "болит умеренно, проходит после приема обезболивающего",
      4: "болит сильно, боль распирающая, резкая, длительная",
    },
    localisation: {
      body: "Опишите локализацию боли",
      1: "не болит",
      2: "болит в зубе, могу указать зуб",
      3: "болит в зубе, не могу указать конкретный зуб",
      4: "болит в челюсти",
    },
    color: {
      body: "Опишите цвет беспокоящего зуба",
      1: "зуб отсутствует",
      2: "в цвете изменен, серый",
      3: "в цвете изменен, желтый",
      4: "в цвете не изменен",
    },
    plaque: {
      body: "Есть ли налет на зубах",
      1: "нет",
      2: "налет черного цвета в придесневой области",
      3: "налет черный на всей поверхности зуба",
      4: "есть зубные камни",
    },
    bleeding: {
      body: "Есть ли кровоточивость при чистке зубов",
      1: "нет",
      2: "есть около одного зуба",
      3: "есть около 2-3 зубов",
      4: "есть в области всех зубов",
    },
    condition: {
      body: "Опишите состояние беспокоящего зуба",
      1: "зуб цел",
      2: "есть кариозные полости",
      3: "зуб наполовину разрушен",
      4: "зуб полностью разрушен/есть только корень",
    },
    length: {
      body: "Как давно зуб начал беспокоить",
      1: "день назад",
      2: "меньше недели",
      3: "меньше года",
      4: "больше года",
    },
  });

  useEffect(() => {
    axios
      .get("https://nano-doc.netlify.app/api/form", { withCredentials: true })
      .then((res) => setForms(res.data));
  }, []);

  const logout = () => {
    axios
      .get("https://nano-doc.netlify.app/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "success") {
          window.location.href = "/";
        }
      });
  };

  console.log(forms);

  return (
    <div id="profile">
      <div className="nav-right">
        <span onClick={logout}>Выйти</span>
      </div>
      <h2>Добро пожаловать,</h2>
      <p className="user-fio">{user.fio}</p>
      {forms ? (
        forms.map((form) => {
          return (
            <div className="profile-form">
              <p>Пациент: {form.fio}</p>
              <p>Диагноз: {form.diagnosis}</p>
              <div className="profile-inner">
                <ProfileInner form={form} decrypt={decrypt} key={form["_id"]} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="">Пока что здесь пусто...</div>
      )}
    </div>
  );
};

export default Profile;
