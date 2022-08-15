import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, MessageType } from "../../redux/chatReducer";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import * as Yup from 'yup';
import TextareaForm from "../../utils/Forms/TextareaForm";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createSocket, 3000)
        }

        const createSocket = () => {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler);
            setSocket(ws);
        }

        createSocket();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
            dispatch(actions.setMessages([]));
        }
    }, []);

    useEffect(() => {

        const messagesHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            dispatch(actions.setMessages(newMessages));
        }

        socket?.addEventListener('message', messagesHandler);

        return () => {
            socket?.removeEventListener('message', messagesHandler);
        }
    }, [socket])

    return (
        <Stack spacing={2}>
            <Stack spacing={2} sx={{ overflowY: 'auto', height: 400 }}>{messages.map(message => <Message message={message} key={message.id} />)}</Stack>
            <NewMessageForm socket={socket} />
        </Stack>
    )
}

const Message: React.FC<{ message: MessageType, key: string }> = (props) => {
    return (
        <Stack spacing={1} direction='row'>
            <Avatar src={props.message.photo} sx={{ width: 70, height: 70 }} />
            <Stack spacing={0.5}>
                <Typography>{props.message.userName}</Typography>
                <Typography>{props.message.message}</Typography>
            </Stack>
        </Stack>
    )
}

const NewMessageForm: React.FC<{ socket: WebSocket | null }> = ({ socket }) => {
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready');
        }

        socket?.addEventListener('open', openHandler);

        return () => {
            socket?.removeEventListener('open', openHandler);
        }
    }, [socket])

    const sendMessage = (message: string) => {
        if (!message) return;

        socket?.send(message);
    }

    return (
        <Formik initialValues={{ message: '' }}
            validationSchema={Yup.object({
                message: Yup.string().required('Нельзя отправить пустое сообщение')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                sendMessage(values.message);
                resetForm()
                setSubmitting(false);
            }}
        >
            <Form>
                <Stack spacing={2} alignItems="baseline">
                    <TextareaForm name='message' label='Новое сообщение' type='text' />
                    <Button disabled={readyStatus === 'pending' || socket === null} variant="contained" type="submit">Отправить</Button>
                </Stack>
            </Form>
        </Formik>
    )
}

export default Chat;
