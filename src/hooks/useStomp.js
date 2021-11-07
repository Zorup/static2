import { useState, useEffect } from 'react';
import Stomp from 'stompjs';

const connectPromise = () =>
    new Promise((resolve, reject) => {
        const socket = new WebSocket(`${process.env.REACT_APP_SOCK_URL}/chat/chat-conn`);
        const stompClient = Stomp.over(socket);
        stompClient.debug = (e) => {console.log(e)
                                    };
        const onConnect = () => resolve(stompClient);
        const onError = error => reject(new Error(error));
        stompClient.connect({}, onConnect, onError);
    });

export default () => {
    const [stomp, setStomp] = useState(null);
    const [success, setSuccess] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState(null);

    const publish = (msg, targetId) => {
        if (!stomp) return;
        stomp.send(`/app/send/${targetId}`, {}, msg);
    };
    const subscribe = (callback, id) => {
        if (!stomp) return;
        stomp.subscribe(
            `/topic/${id}`,
            callback,
        );
    };

    const connect = async () => {
        try {
            setConnecting(true);
            const stompClient = await connectPromise();
            setStomp(stompClient);
            setSuccess(true);
            setConnecting(false);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        connect();
    }, []);

    return [{ subscribe, publish }, success, connecting, error];
};