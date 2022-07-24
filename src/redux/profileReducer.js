const ADD_NEW_POST = "ADD-NEW-POST";
const UPDATE_POST = "UPDATE-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
  profile: [],
  postData: [
    {
      id: 1,
      message:
        "H&M объявила, что окончательно уходит из России. В рамках сворачивания бизнеса магазины на время откроют для распродаж.",
    },
    {
      id: 2,
      message: "Казанских школьников обучат основам бизнеса за 2,4 млн рублей",
    },
    {
      id: 3,
      message:
        'Канада отправила турбину Siemens для "Северного потока" в Германию в минувшее воскресенье, ее везут самолетом, а в России она должна быть к 24 июля // СМИ',
    },
    {
      id: 4,
      message:
        "ЕС исключил ювелирные украшения из запрета на импорт российского золота, сообщает издание Politico со ссылкой на проект документа Еврокомиссии.",
    },
    {
      id: 5,
      message:
        "Русский парень starter pack. Фамейе забивает пенальти и выводит Рубин вперед.",
    },
  ],
  newPost: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POST:
      let newPost = { id: state.postData.at(-1).id, message: state.newPost };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPost: "",
      };
    case UPDATE_POST:
      return {
        ...state,
        newPost: action.newText,
      };
    case SET_USER_PROFILE:
      return {
        ...state, 
        profile: action.profile,
      }
    default:
      return state;
  }
};

export const addNewPost = () => ({ type: ADD_NEW_POST });
export const updatePost = (newText) => ({
  type: UPDATE_POST,
  newText: newText,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile: profile,
})

export default profileReducer;
