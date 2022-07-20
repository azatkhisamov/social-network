import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar friends={props.state.navbar.friends} />
        <div className="app-wrapper-content">
          <Routes>
            <Route
              path="/profile"
              element={
                <Profile
                  state={props.state.profilePage}
                  dispatch={props.dispatch}
                />
              }
            />
            <Route
              exact
              path="/dialogs"
              element={
                <Dialogs
                  state={props.state.dialogsPage}
                  dispatch={props.dispatch}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
