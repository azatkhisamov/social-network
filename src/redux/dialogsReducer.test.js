// import dialogsReducer from "./dialogsReducer";
// import {sendMessageActionCreator} from "./dialogsReducer";

// let state = {
//   messagesData: [
//     {
//       id: 1,
//       message: "Как дела? Я вот сижу футбол нахуй смотрю, жопу чещу",
//       writer: "user",
//     },
//     { id: 2, message: "Что делаешь?", writer: "another" },
//     { id: 3, message: "Хорошо", writer: "user" },
//     { id: 4, message: "В дороге", writer: "user" },
//     { id: 5, message: "Салам пацанам", writer: "another" },
//   ]
// }

// test('checking message sent', () => {
//   let action = sendMessageActionCreator('Привет');
//   let newState = dialogsReducer(state, action);
//   expect(newState.messagesData.length).toBe(6);
// });

// test('checking the correctness of sending a message', () => {
//   let action = sendMessageActionCreator('Привет');
//   let newState = dialogsReducer(state, action);
//   expect(newState.messagesData[5].message).toBe('Привет');
// });