import { uniqueId } from "lodash";
import { ThunkAction } from "redux-thunk";
import { v1 } from "uuid";
import { authAPI, securityAPI } from "../api/api";
import { ChatMessageType } from "../components/Chat/Chat";
import { AppStateType, InferActionsTypes } from "./redux-store";

export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
    id: string
}

let initialState = {
  messages: [] as Array<MessageType>
};

type InitialStateType = typeof initialState;

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'chat/SET_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
        
      };
    default:
      return state;
  }
};

export default chatReducer;

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setMessages: (messages: ChatMessageType[]) => ({
    type: 'chat/SET_MESSAGES',
    payload: { messages },
  } as const),
}
