const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_MESSAGE = 'UPDATE-MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: "Vano", imgUrl: 'https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg' },
        { id: 2, name: "Bob", imgUrl: 'https://aif-s3.aif.ru/images/022/473/4d514dc24a26ee1f6007b8dd4b546a46.jpg' },
        { id: 3, name: "Ben", imgUrl: 'https://img.lemde.fr/2022/05/31/0/0/0/0/664/0/75/0/0c3c82f_bab190d5e11242e4a28ac02102e63dd1-bab190d5e11242e4a28ac02102e63dd1-0.jpg' },
        { id: 4, name: "Maria", imgUrl: 'https://img.championat.com/c/1200x900/news/big/q/j/pszh-predlozhil-messi-zarplatu-vyshe-chem-gotova-platit-barselona_16252513061714408565.jpg' },
        { id: 5, name: "Anna", imgUrl: 'https://sportzwiki.com/wp-content/uploads/2022/07/16524735717961.jpg' },
      ],
      messagesData: [
        { id: 1, message: "Как дела? Я вот сижу футбол нахуй смотрю, жопу чещу", writer: 'user' },
        { id: 2, message: "Что делаешь?", writer: 'another'},
        { id: 3, message: "Хорошо", writer: 'user' },
        { id: 4, message: "В дороге", writer: 'user' },
        { id: 5, message: "Салам пацанам", writer: 'another' },
      ],
      newMessage: '',
}

const dialogsReducer = (state=initialState, action) => {
    
    switch(action.type) {
        case SEND_MESSAGE:
            let newMessage = {id: state.messagesData.at(-1).id, 
                message: state.newMessage, writer: 'user'};
            state.messagesData.push(newMessage);
            state.newMessage = '';
            return state;
        case UPDATE_MESSAGE:
            state.newMessage = action.newText;
            return state;
        default:
            return state;
    }
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });
export const updateMessageActionCreator = (newText) => ({
  type: UPDATE_MESSAGE,
  newText: newText,
});

export default dialogsReducer;