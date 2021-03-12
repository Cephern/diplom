const Question = ({ name, body, asw1, asw2, asw3, asw4, handleAnswers }) => {
  const select = (e) => {
    if (e.target.classList[0] !== "question-input") {
      e.target.parentElement.parentElement
        .querySelectorAll(".selector")
        .forEach((selector) => selector.classList.remove("active"));
      e.target.parentElement.querySelector(".selector").classList.add("active");
    }
  };

  const handleMouseEnter = (e) => {
    e.target.parentElement.querySelector(".selector").classList.add("hovered");
  };

  const handleMouseLeave = (e) => {
    e.target.parentElement
      .querySelector(".selector")
      .classList.remove("hovered");
  };

  const handleClick = async (e) => {
    const ans = {
      name,
      num: e.target.dataset.num,
    };
    handleAnswers(ans);
    select(e);
  };

  return (
    <li className="question">
      <p>{body}:</p>
      <div className="question-input">
        <div className="selector"></div>
        <p
          data-num="1"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {asw1}
        </p>
      </div>
      <div className="question-input" onClick={handleClick}>
        <div className="selector"></div>
        <p
          data-num="2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {asw2}
        </p>
      </div>
      <div className="question-input" onClick={handleClick}>
        <div className="selector"></div>
        <p
          data-num="3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {asw3}
        </p>
      </div>
      <div className="question-input" onClick={handleClick}>
        <div className="selector"></div>
        <p
          data-num="4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {asw4}
        </p>
      </div>
    </li>
  );
};

export default Question;
