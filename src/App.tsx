import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { initialize } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import { Provider } from "react-redux";
import { FriendsType } from "./redux/navbarReducer";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const UsersContainer = React.lazy(() =>
  import("./components/Users/UsersContainer")
);
const Login = React.lazy(() => import("./components/Login/Login"));

type PropsType = {
  initialized: boolean
  isAuth: boolean
  friends: Array<FriendsType>
  initialize: () => void
}

const App: React.FC<PropsType> = (props) => {
  useEffect(() => {
    props.initialize();
  });

  if (!props.initialized) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar isAuth={props.isAuth} friends={props.friends} />
          <div className="app-wrapper-content">
            <React.Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/" element={<Navigate replace to="/profile" />} />
                <Route path="/profile" element={<ProfileContainer />} />
                <Route
                  path="/profile/:userId"
                  element={<ProfileContainer />}
                />
                <Route path="/dialogs" element={<DialogsContainer />} />
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </React.Suspense>
          </div>
        </div>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
    friends: state.navbar.friends,
  };
};

let AppContainer = compose(connect(mapStateToProps, { initialize }))(App);

let MainApp: React.FC = (props) => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
export default MainApp;
