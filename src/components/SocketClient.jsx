import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const SocketclientContext = createContext({});

export const SocketclientProvider = ({children}) => {
    const Web_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

    const [socketClient, setSocketClient] = useState(null)
    const [connectServer, setConnectServer] = useState(false)
    const [adminCheck, setAdminCheck] = useState(false)
    const [logedIn, setLogedIn] = useState(false)

    useEffect(() => {
        if(connectServer) { 
          setSocketClient(io.connect(Web_URL))
          setAdminCheck(true)
        }
    
    }, [connectServer])

    useEffect(() => {
        if(socketClient) {
            socketClient.on('Admin_check', (check) => {
                console.log(check)
                if(check) {
                    setLogedIn(true)
                }
            })
        }
    }, [socketClient])

    return (
        <SocketclientContext.Provider
            value={{
                setConnectServer,
                socketClient,
                setSocketClient,
                adminCheck,
                logedIn,
                setLogedIn,
            }}
        >
            {children}
        </SocketclientContext.Provider>
    )
}

export const useSocketClient = () => {
    return useContext(SocketclientContext);
}