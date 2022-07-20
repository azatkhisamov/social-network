import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

let store = {
  
  _state: {
    dialogsPage: {
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
    },
    profilePage: {
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
    },
    navbar: {
    friends: [
      { id: 1, name: 'Checo', avatarUrl: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/5/10/hop9yksneuaqtv4coxri/sergio-perez-portrait-imola-gp-f1-2022' },
      { id: 2, name: 'Charle', avatarUrl: 'https://cdn.f1ne.ws/userfiles/leclerc/143896.jpg' },
      { id: 3, name: 'Valtery', avatarUrl: 'https://autosport.com.ru/files/styles/896x504/public/news/2021/09/06/113282-cb0a40b6-3019-4d75-8d26-7094f9275812.jpg?itok=096WUnPz' },
    ],
  }
  },
  
  getState() {
    return this._state;
  },
  
  _subscriber() {
    return;
  },

  subscribe(observer){
    this._subscriber = observer;
  },

  dispatch(action) {

    dialogsReducer(this._state.dialogsPage, action);
    profileReducer(this._state.profilePage, action);
    this._subscriber();
  },
}

export default store;