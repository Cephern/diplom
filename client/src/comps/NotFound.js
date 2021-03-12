import Nav from "./Nav";

const NotFound = () => {
  return (
    <div id="not-found">
      <Nav />
      <h1>404</h1>
      <p>
        Страница не найдена, используйте навигационное меню слева для
        перемещения по сайту
      </p>
    </div>
  );
};

export default NotFound;
