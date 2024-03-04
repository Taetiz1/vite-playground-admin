import { Text, Container, SimpleGrid } from "@mantine/core"
import { IconUser } from "@tabler/icons-react"
import { IconDoorEnter } from "@tabler/icons-react"
import { useSocketClient } from "../SocketClient"

const Tools = ({setOnSaved}) => {
    const {
        SceneSelected,
        setSceneSelected,
        setIndexItem,
        setInputPage

    } = useSocketClient();

    function addSpawn() {
        if(Object.keys(SceneSelected).length > 0) {
            const scene = SceneSelected
            scene.spawnPos.push([0, 0, 0])

            setSceneSelected(scene)
            setOnSaved(false)
            setIndexItem(scene.spawnPos.length - 1)
            setInputPage("spawn")
        }
    }

    function addEntrance() {
        if(Object.keys(SceneSelected).length > 0) {
            const scene = SceneSelected
            const bt = {
                roomID: "1",
                pos: [0, 0, 0],
                atPos: 0
            }

            scene.enterBT.push(bt)
            setSceneSelected(scene)
            setOnSaved(false)
            setIndexItem(scene.enterBT.length - 1)
            setInputPage("BT")
        }
    }

    return(
        <SimpleGrid
            cols={2}
            spacing="xs"
            verticalSpacing="xs"
            mt={5}
        >
            <Container 
                bg="yellow" 
                style={{
                    padding: "10px", 
                    margin: "10px 0px 10px 0px",
                    userSelect: "none"
                }}
                onDoubleClick={addSpawn}
            >
                <IconUser size={50}/>
                <Text>
                    Spawn 
                </Text>
            </Container>
            <Container 
                bg="yellow" 
                style={{
                    padding: "10px", 
                    margin: "10px 0px 10px 0px",
                    userSelect: "none"
                }}
                onDoubleClick={addEntrance}
            >
                <IconDoorEnter size={50}/>
                <Text>
                    Entrance  
                </Text>
            </Container>
        </SimpleGrid>
    )

}

export default Tools