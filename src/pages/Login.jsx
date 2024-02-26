import { useState, useEffect } from "react";
import { pushNotification } from "../components/Notification";
import { useSocketClient } from "../components/SocketClient";
import InputControl from "../components/Login/InputControl";
import Loader from "../components/Loader"

import loginstyles from './Login.module.css'

const Login = () => {
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [EyeOff, setEyeOff] = useState(true);

    const {
        socketClient,
        setConnectServer,
        adminCheck,
        onLoader,
        setOnLoader,
    } = useSocketClient();

    useEffect(() => {
        if(adminCheck) {
            if(id !== '' && password !== '') {
                const IDEncoded = btoa(`${id}`);
                const passwordEncoded = btoa(`${password}`);

                socketClient.emit("Admin_check", { id: IDEncoded, password: passwordEncoded})
            }
        }
    }, [adminCheck])

    const handleSubmission = () => {
        let errorMsg;

        try {
            const IDEncoded = btoa(`${id}`);
            const passwordEncoded = btoa(`${password}`);

            if(IDEncoded !== '' && passwordEncoded !== ''){
                setConnectServer(true)
                setOnLoader(true)
                    
            } else {
                errorMsg = "กรุณากรอก ID และ Password ให้ครบท่วน"
                pushNotification("ล้มเหลว", errorMsg, "error")
            }

        } catch (error) {
                    
            errorMsg = "กรุณากรอก ID และ Password เป็นภาษาอังกฤษ"
            pushNotification("ล้มเหลว", errorMsg, "error")
        }
    }

    const keydownSubmission = (e) => {
        if (e.keyCode === 13 ) {
            handleSubmission()
        }
    }

    const handleEyeToggle = () => {
        if(type==='password') {
            setEyeOff(false);
            setType('text')
        } else {
            setEyeOff(true)
            setType('password')
        }
    }

    return(
        <div className={loginstyles.container}>
        
            <div className={loginstyles.innerBox}>
                    
                <div className={loginstyles.logo}>
                    <h3>Metaverse</h3>
                    <p>Wat•suan•kaew</p>
                </div>
                        
                <h2 className={loginstyles.header}>Admin Login</h2>
                <InputControl 
                    label="ID" 
                    placeholder="Enter ID" 
                    type="text"
                    onChange={(event) =>
                        setID(event.target.value)
                    }
                    onKeyDown={keydownSubmission}
                />

                <InputControl 
                    label="Password" 
                    placeholder="Enter Password"
                    type={type}
                    
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    onKeyDown={keydownSubmission}
                    EyeOff={EyeOff}
                    handleEyeToggle={handleEyeToggle}
                />

                <div className={loginstyles.footer}>
                    <button onClick={handleSubmission}>Login</button>
                </div>

            </div>

            {onLoader && <Loader />}

        </div>
    ) 
}

export default Login