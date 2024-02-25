import Login from "./Login"
import { useSocketClient } from "../components/SocketClient";

const Home = () => {

    const {
        logedIn
    } = useSocketClient();

    if(logedIn) {
        return(
            <>
                Home
            </>
        )
    } else {
        return(
            <>
                <Login />
            </>
        ) 
    }
}

export default Home