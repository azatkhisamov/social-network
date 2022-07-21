import { legacy_createStore as createStore, combineReducers } from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import navbarReducer from './navbarReducer';
import usersReducer from './usersReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
})

const store = createStore(reducers); 

export default store;