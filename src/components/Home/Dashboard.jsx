import { Container } from "@mantine/core"
import Stats from "./Stats"
import Admin from "./Admin"
import Scene from "./Scene"
import User from "./User"
import Question from "./Question"
import UploadScene from "./UploadScene"
import UploadAnimation from "./UploadAnimation"
import UploadImage from "./UploadImage"
import { useSocketClient } from "../SocketClient"

const Dashboard = () => {
  const {
    site
  } = useSocketClient();

  switch(site) {
    case "Stats": 
      return(
        <Container size="md">
          <Stats />
        </Container>
      )
    case "User": 
      return(
        <Container size="md">
          <User />
        </Container>
      )
    case "Scene": 
      return(
        <Container size="lg">
          <Scene />
        </Container>
      )
    case "Admin": 
      return(
        <Container size="xl">
          <Admin />
        </Container>
      )
    case "Question": 
      return(
        <Container size="lg">
          <Question />
        </Container>
      )
    case "Upload Scene": 
      return(
        <Container size="lg">
          <UploadScene />
        </Container>
      )
    case "Upload Animation": 
      return(
        <Container size="lg">
          <UploadAnimation />
        </Container>
      )
    case "Upload Image": 
      return(
        <Container size="lg">
          <UploadImage />
        </Container>
      )
  }
}

export default Dashboard