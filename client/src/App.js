import "./index.css";
import UserContextProvider from "./context/userContext";

import { BrowserRouter } from "react-router-dom";
import Main from "./comps/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Main />
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
