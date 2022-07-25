import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import navbarReducer from './navbarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware)); 
window.store = store;

export default store;