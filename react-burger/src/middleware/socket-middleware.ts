import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../services/store";

export const socketMiddleware = (wsUrl: string, wsActions: { [key: string]: string }): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: any) => {
            const { dispatch, getState } = store;
            const { accessToken } = getState().user;
            const { type, payload } = action;
            const { wsInit, wsInitWithCustomUrl, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage } =
                wsActions;

            if (type === wsInit) {
                socket = new WebSocket(wsUrl);
            }
            if (type === wsInitWithCustomUrl) {
                socket = new WebSocket(payload);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
                };

                if (type === wsSendMessage) {
                    const message = { ...payload, token: accessToken };
                    socket.send(JSON.stringify(message));
                }
                if (type === wsClose) {
                    socket.close();
                }
            }

            next(action);
        };
    };
};
