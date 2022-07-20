const ADD_NEW_POST = 'ADD-NEW-POST';
const UPDATE_POST = 'UPDATE-POST';

let initialState = {
    postData: [
        {
          id: 1,
          message:
            "H&M объявила, что окончательно уходит из России. В рамках сворачивания бизнеса магазины на время откроют для распродаж.",
        },
        {
          id: 2,
          message:
            "Казанских школьников обучат основам бизнеса за 2,4 млн рублей",
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
      newPost: '',
}

const profileReducer = (state=initialState, action) => {
    
    switch(action.type) {
        case ADD_NEW_POST:
            let newPost = {id: state.postData.at(-1).id, 
                message: state.newPost};
            state.postData.push(newPost);
            state.newPost = '';
            return state;
        case UPDATE_POST: 
            state.newPost = action.newText;
            return state;
        default:
            return state;
    }
}

export const addNewPostActionCreator = () => ({ type: ADD_NEW_POST });
export const updatePostActionCreator = (newText) => ({
  type: UPDATE_POST,
  newText: newText,
});

export default profileReducer;