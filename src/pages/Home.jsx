import Login from "./Login"
import { Container } from "@mantine/core"; 
import Header from "../components/Home/Header";
import Dashboard from "../components/Home/Dashboard";
import { useSocketClient } from "../components/SocketClient";

const Home = () => {

    const {
        logedIn
    } = useSocketClient();

    if(logedIn) {
        return(
            <Container size="xl">
                <Header />
                <Dashboard />
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