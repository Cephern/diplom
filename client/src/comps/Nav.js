import axios from "axios";
import { Link } from "react-router-dom";

const Nav = () => {
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

  return (
    <>
      <div className="nav-left">
        <Link to="/">Главная</Link>
        <Link to="/doctors">Врачи</Link>
        <Link to="/about">О Нас</Link>
      </div>
      <div className="nav-right">
        <span onClick={logout}>Выйти</span>
      </div>
    </>
  );
};

export default Nav;
