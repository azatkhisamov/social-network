import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";

let rootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducersType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducersType>;

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;


const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export type AppDispatch = typeof store.dispatch;

export default store;
