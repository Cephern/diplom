import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("https://nano-doc.herokuapp.com/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <userContext.Provider value={user}>{props.children}</userContext.Provider>
  );
};

export default UserContextProvider;
