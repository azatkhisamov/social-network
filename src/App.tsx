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
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
const Chat = React.lazy(() => import("./components/Chat/Chat"));

type PropsType = {
  initialized: boolean
  isAuth: boolean
  friends: Array<FriendsType>
  initialize: () => void
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: "#5c6bc0",
    },
  },
});

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
          <ThemeProvider theme={theme}>
            <HeaderContainer />
            <Navbar isAuth={props.isAuth} friends={props.friends} />
          </ThemeProvider>
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
                <Route path="/chat" element={<Chat />} />
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
