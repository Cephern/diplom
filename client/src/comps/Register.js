import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fio, setFio] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const register = () => {
    if (!username || !fio || !password) {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 1000);
      return;
    }

    axios
      .post(
        "https://nano-doc.netlify.app/register",
        {
          username,
          fio,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "error") {
          document.querySelector("p.error").innerText =
            "Логин уже занят, выберите другой";
        } else {
          window.location.href = "/";
        }
      });
  };
  return (
    <div id="register">
      <div className="login">
        <h1>Регистрация</h1>
        <input
          type="text"
          placeholder="логин"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Имя и Фамилия"
          onChange={(e) => setFio(e.target.value)}
        />
        <input
          type="text"
          placeholder="пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error"></p>
        <div
          className="err-message"
          style={isOpen ? { opacity: 1 } : { opacity: 0 }}
        >
          <p>
            Все поля должны быть заполнены <span>!</span>
          </p>
        </div>

        <button onClick={register}>Регистрация</button>
        <Link to="/">К Логину</Link>
      </div>
    </div>
  );
};

export default Register;
