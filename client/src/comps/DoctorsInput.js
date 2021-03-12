const DoctorsInput = ({ doctorName, setSelectedDoctor }) => {
  const handleClick = (e) => {
    setSelectedDoctor(doctorName);
    if (e.target.nodeName === "DIV") {
      e.target.parentElement
        .querySelectorAll(".doctors-input")
        .forEach((doctorInput) => doctorInput.classList.remove("selected"));
      e.target.classList.add("selected");
    } else if (e.target.nodeName === "P") {
      e.target.parentElement.parentElement
        .querySelectorAll(".doctors-input")
        .forEach((doctorInput) => doctorInput.classList.remove("selected"));
      e.target.parentElement.classList.add("selected");
    }
  };

  return (
    <div className="doctors-input" onClick={handleClick}>
      <p>{doctorName}</p>
    </div>
  );
};

export default DoctorsInput;
