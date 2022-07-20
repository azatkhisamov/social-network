import { legacy_createStore as createStore, combineReducers } from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import navbarReducer from './navbarReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
})

const store = createStore(reducers); 

export default store;