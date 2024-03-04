import { Container } from "@mantine/core"
import Stats from "./Stats"
import Admin from "./Admin"
import Scene from "./Scene"
import User from "./User"
import Upload from "./Upload"
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
    case "Upload": 
      return(
        <Container size="xl">
          <Upload />
        </Container>
      )
  }
}

export default Dashboard