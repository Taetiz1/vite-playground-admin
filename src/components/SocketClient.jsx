import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { pushNotification } from "./Notification";

const SocketclientContext = createContext({});

export const SocketclientProvider = ({children}) => {
    const Web_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

    const [socketClient, setSocketClient] = useState(null)
    const [connectServer, setConnectServer] = useState(false)
    const [adminCheck, setAdminCheck] = useState(false)
    const [logedIn, setLogedIn] = useState(false)
    const [onLoader, setOnLoader] = useState(false)
    const [site, setSite] = useState("Stats")
    const [ID, setID] = useState("")
    const [admin, setAdmin] = useState({})
    const [adminLog, setAdminLog] = useState([])
    const [Stats, setState] = useState({})
    const [startPoint, setStartPoint] = useState({})
    const [user, setUser] = useState({})
    const [scene, setScene] = useState([])
    const [SceneSelected, setSceneSelected] = useState({})
    const [InputPage, setInputPage] = useState("main")
    const [indexItem, setIndexItem] = useState(0)
    const [sceneIndex, SetSceneIndex] = useState()
    const [downloadKey, setDownloadKey] = useState("")
    const [avatarAnimation, setAvatarAnimation] = useState([])

    useEffect(() => {
        if(connectServer) { 
          setSocketClient(io.connect(Web_URL))
          setAdminCheck(true)
        }
    
    }, [connectServer])
    
    useEffect(() => {
        if(socketClient) {
            if(site === "Stats") {
                socketClient.emit("get stats")  
                socketClient.emit("get scene")
            } 
            else if(site === "Admin") {
                socketClient.emit("get admin")
            }
            else if(site === "User") {
                socketClient.emit("get user")
            }
            else if(site === "Scene") {
                socketClient.emit("get scene")
            }
        }
    }, [socketClient, site])

    useEffect(() => {
        setInputPage('main')
    }, [site])

    useEffect(() => {
        if(socketClient) {
            
            socketClient.on("get stats", ({stats, startPoint, downloadKey, animations}) => {
                setState(stats)
                setStartPoint(startPoint)
                setDownloadKey(downloadKey)
                setAvatarAnimation(animations)
            })

            socketClient.on("get admin", (admin) => {
                setAdmin(admin.account)
                setAdminLog(admin.log)
            })

            socketClient.on("get user", (user) => {
                setUser(user)
            })

            socketClient.on("get scene", (scene) => {
                setScene(scene)
            })

            socketClient.on('connect_error', (error) => {
                if(error.message === 'xhr poll error') {
                    const errorMsg = "The server may not be running or is unreachable, please try again later."
                    pushNotification("ล้มเหลว", errorMsg, "error")
                }
            })

            socketClient.on('delete scene complete', (check) => {
        
                setOnLoader(false)
        
                if(check) {
                  const Msg = "ลบฉากสำเร็จ"
                  pushNotification("สำเร็จ", Msg, "normal")
                } else {
                  const errorMsg = "ลบฉากล้มเหลว"
                  pushNotification("ล้มเหลว", errorMsg, "error")
                }
            })
        }
    }, [socketClient])

    useEffect(() => {
        if(socketClient) {
            socketClient.on('Admin_check', ({check, id}) => {
                if(check) {
                    setOnLoader(false)
                    setLogedIn(true)
                    setID(atob(`${id}`))

                } else {
                    setOnLoader(false)
                    const errorMsg = "ID หรือ Password ไม่ถูกต้อง"
                    pushNotification("ล้มเหลว", errorMsg, "error")
                    setAdminCheck(false)
                    setConnectServer(false)
                    socketClient.disconnect()
                    setSocketClient(null)
                }
            })
        }
    }, [socketClient])

    useEffect(() => {
        if(scene[sceneIndex]) {
            setSceneSelected(scene[sceneIndex])
        }
    }, [sceneIndex])
    
    return (
        <SocketclientContext.Provider
            value={{
                setConnectServer,
                socketClient,
                setSocketClient,
                adminCheck,
                logedIn,
                setLogedIn,
                onLoader,
                setOnLoader,
                site,
                setSite,
                ID,
                Stats,
                admin,
                adminLog,
                user,
                scene,
                setScene,
                SceneSelected,
                setSceneSelected,
                InputPage, 
                setInputPage,
                indexItem,
                setIndexItem,
                sceneIndex, 
                SetSceneIndex,
                startPoint,
                setStartPoint,
                downloadKey,
                avatarAnimation,
                setAvatarAnimation
            }}
        >
            {children}
        </SocketclientContext.Provider>
    )
}

export const useSocketClient = () => {
    return useContext(SocketclientContext);
}