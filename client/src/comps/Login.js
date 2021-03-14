import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const login = () => {
    if (!username || !password) {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 1000);
      return;
    }

    axios
      .post(
        "https://nano-doc.herokuapp.com/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log(res.status);
        console.log(typeof res.status);
        if (res.status === "401") {
          document.querySelector("p.error").innerText =
            "Неверный логин или пароль";
        }
        if (res.data === "success") {
          window.location.href = "/";
        }
      });
  };

  return (
    <div id="login">
      <div className="login">
        <h1>Вход</h1>
        <input
          type="text"
          placeholder="логин"
          onChange={(e) => setUsername(e.target.value)}
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
        <button onClick={login}>Войти</button>

        <Link to="/register">К Регистрации</Link>
      </div>
    </div>
  );
};

export default Login;
