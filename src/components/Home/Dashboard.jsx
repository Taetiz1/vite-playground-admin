import { Container } from "@mantine/core"
import Stats from "./Stats"
import Admin from "./Admin"
import Scene from "./Scene"
import User from "./User"
import { useSocketClient } from "../SocketClient"

const Dashboard = () => {
  const {
    site
  } = useSocketClient();

  switch(site) {
    case "Stats": 
      return(
        <Container>
          <Stats />
        </Container>
      )
    case "User": 
      return(
        <Container>
          <User />
        </Container>
      )
    case "Scene": 
      return(
        <Container>
          <Scene />
        </Container>
      )
    case "Admin": 
      return(
        <Container size="xl">
          <Admin />
        </Container>
      )
  }
}

export default Dashboard