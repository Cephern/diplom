import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const doctorsContext = createContext();

const DoctorsContextProvider = (props) => {
  const [doctors, setDoctors] = useState();

  useEffect(() => {
    axios
      .get("https://nano-doc.netlify.app/api/doctors")
      .then((res) => setDoctors(res.data));
  }, []);

  return (
    <doctorsContext.Provider value={doctors}>
      {props.children}
    </doctorsContext.Provider>
  );
};

export default DoctorsContextProvider;
