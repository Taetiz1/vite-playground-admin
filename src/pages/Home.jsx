import Login from "./Login"
import { Container } from "@mantine/core"; 
import Header from "../components/Home/Header";
import Dashboard from "../components/Home/Dashboard";
import { useSocketClient } from "../components/SocketClient";
import Loader from "../components/Loader";

const Home = () => {

    const {
        logedIn,
        onLoader
    } = useSocketClient();

    if(logedIn) {
        return(
            <Container size="xl">
                <Header />
                <Dashboard />
                {onLoader && <Loader />}
            </Container>
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