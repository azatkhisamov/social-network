import { authAPI } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";

let initialState = {
    id: null, 
    email: null,
    login: null, 
    isAuth: false,
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state, 
                ...action.data,
                isAuth: true,
            }
        default:
            return state;
    }
}


export default authReducer;

export const setUserData = (id, login, email) => ({
    type: SET_USER_DATA,
    data: {id, login, email},
})

export const getAuthUserData = () => dispatch => {
    authAPI.auth().then(data => {
      if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setUserData(id, login, email));
      }
    })
}