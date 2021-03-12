import { userContext } from "../context/userContext";
import { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";
import ReviewsContextProvider from "../context/reviewsContext";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Doctors from "./Doctors";
import DoctorsContextProvider from "../context/doctorsContext";

const Main = () => {
  const user = useContext(userContext);

  return (
    <>
      {user ? (
        user.isDoctor ? (
          <Route path="/">
            <Profile />
          </Route>
        ) : (
          <>
            <DoctorsContextProvider>
              <ReviewsContextProvider>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/doctors">
                    <Doctors />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </ReviewsContextProvider>
            </DoctorsContextProvider>
          </>
        )
      ) : (
        <>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
};

export default Main;
