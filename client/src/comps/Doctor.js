const Doctor = ({ doctor }) => {
  const img = require(`../images/doctors/${doctor.img}.jpg`);

  return (
    <div className="doctor">
      <div className="doctor-left">
        <img src={img.default} alt={doctor.name} />
        <p>{doctor.name}</p>
      </div>
      <div className="doctor-right">
        <p>О себе: {doctor.desc}</p>
      </div>
    </div>
  );
};

export default Doctor;
