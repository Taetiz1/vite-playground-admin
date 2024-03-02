import { Flex, SimpleGrid, NumberInput, Button, Text } from "@mantine/core"
import { useState } from "react"
import { useSocketClient } from "../SocketClient"

const BTInput = ({indexItem}) => {
    const {
        SceneSelected,
        setSceneSelected,
        setInputPage,
        scene,
    } = useSocketClient();
    const[onRoomIDUpdated, setOnRoomIDUpdated] = useState(false)
    const[onAtposUpdated, setOnAtposUpdated] = useState(false)

    const EnterBT = SceneSelected.enterBT[indexItem]
    const [roomID, SetRoomID] = useState(parseFloat(EnterBT.roomID))

    const [posX, setPosX] = useState(EnterBT.pos[0])
    const [posY, setPosY] = useState(EnterBT.pos[1])
    const [posZ, setPosZ] = useState(EnterBT.pos[2])

    const [Atpos, setAtPos] = useState(EnterBT.atPos)
    
    
    function updateSettings() {
        const settings = SceneSelected

        settings.enterBT[indexItem].roomID = `${roomID}`;
        settings.enterBT[indexItem].pos = [posX, posY, posZ];
        settings.enterBT[indexItem].atPos = parseFloat(Atpos);

        setSceneSelected(settings)
        setOnRoomIDUpdated(true)
        setOnAtposUpdated(true)
    }

    return(
        <SimpleGrid
            cols={4}
            spacing="xs"
            verticalSpacing="xs"
            mt={5}
        >
            <Flex
                bg="none"
                gap="xs"
                direction="row"
                wrap="wrap"
            > 
                <Text ta="right">
                    Scene : {onRoomIDUpdated && <span style={{
                        color: "crimson"
                    }}>updated!</span>}
                </Text>

                <select 
                    defaultValue={roomID}
                    onChange={(e) => {
                        SetRoomID(e.target.value)
                        setAtPos(0)
                        if(onRoomIDUpdated) {
                            setOnRoomIDUpdated(false)
                            setOnAtposUpdated(false)
                        }
                    }}
                >
                    {scene.length > 0 && scene.slice(1).map((scene, index) => (
                        <option key={index} value={index+1}>{scene.id}. {scene.name} </option>
                    ))}
                </select>
            </Flex>

            <Flex
                bg="none"
                gap="xs"
                direction="row"
                wrap="wrap"
            > 
                <Text >
                    At Position : {onAtposUpdated && <span style={{
                        color: "crimson"
                    }}>updated!</span>}
                </Text>

                {scene[roomID].spawnPos.length > 0 && <select 
                    key={roomID}
                    defaultValue={Atpos}
                    onChange={(e) => {
                        setAtPos(e.target.value)
                        if(onAtposUpdated) {
                            setOnAtposUpdated(false)
                        }
                    }}
                >
                    {scene[roomID].spawnPos.map((bt, index) => (
                        <option key={index} value={index} style={{textAlign: "center", justifyContent: "center"}}>({index}) [ {bt[0]}, {bt[1]}, {bt[2]} ] </option>
                    ))}
                </select>}
            </Flex>

            <Flex
                bg="none"
                gap="xs"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            > 
                <NumberInput
                    w={60}
                    value={posX}
                    label="position"
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setPosX(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={posY} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setPosY(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={posZ} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setPosZ(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
            </Flex>

            <Flex
                bg="none"
                gap="xs"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            > 
                <Button 
                    style={{
                        alignSelf: "end"
                    }}
                    onClick={updateSettings}
                >
                    update
                </Button>
                <Button 
                    style={{
                        alignSelf: "end"
                    }}
                    onClick={() => {
                        setInputPage("main")
                        setOnRoomIDUpdated(false)
                        setOnAtposUpdated(false)
                    }}
                >
                    back
                </Button>
            </Flex>
            
        </SimpleGrid>
    )
}

export default BTInput