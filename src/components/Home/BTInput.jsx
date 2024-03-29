import { Flex, SimpleGrid, NumberInput, Button, Text } from "@mantine/core"
import { useState } from "react"
import { useSocketClient } from "../SocketClient"
import { pushNotification } from "../Notification"

const BTInput = ({indexItem, setOnSaved}) => {
    const {
        SceneSelected,
        setSceneSelected,
        setInputPage,
        scene,
    } = useSocketClient();
    const[onRoomIDUpdated, setOnRoomIDUpdated] = useState(false)
    const[onAtposUpdated, setOnAtposUpdated] = useState(false)

    const EnterBT = SceneSelected.enterBT[indexItem]
    const sceneIndex = scene.findIndex(item => item.id === EnterBT.roomID);
    const [roomIndex, SetRoomID] = useState(sceneIndex === -1 ? null : sceneIndex)

    const [posX, setPosX] = useState(EnterBT.pos[0])
    const [posY, setPosY] = useState(EnterBT.pos[1])
    const [posZ, setPosZ] = useState(EnterBT.pos[2])

    const [Atpos, setAtPos] = useState(EnterBT.atPos)
    
    function updateSettings() {
        if(scene[roomIndex]) {
            const settings = SceneSelected

            settings.enterBT[indexItem].roomID = `${scene[roomIndex].id}`;
            settings.enterBT[indexItem].pos = [posX, posY, posZ];
            settings.enterBT[indexItem].atPos = parseFloat(Atpos);

            setSceneSelected(settings)
            setOnRoomIDUpdated(false)
            setOnAtposUpdated(false)
            setOnSaved(false)
        } else {
            const errorMsg = "กรุณาเลือก Scene ที่ต้องการจะให้ไป"
            pushNotification("ล้มเหลว", errorMsg, "error")
        }
    }

    function onDelete() {
        if(window.confirm("คุณต้องการที่จะลบ Entrance ใช่หรือไม่?")) {
            const settings = SceneSelected

            settings.enterBT.splice(indexItem, 1);

            setSceneSelected(settings)
            setInputPage("main")
        }
    }

    return(
        <SimpleGrid
            cols={4}
            spacing="xs"
            verticalSpacing="xl"
            mt={5}
        >
            <Flex
                bg="none"
                gap="xs"
                direction="row"
                wrap="wrap"
                justify="center"
                align="center"
            > 
                <SimpleGrid
                    cols={1}
                    spacing="sm"
                >
                    <Text 
                        ta="left">
                        Scene : {onRoomIDUpdated && <span style={{
                            color: "crimson"
                        }}>*update</span>}
                    </Text>

                    <select 
                        defaultValue={roomIndex}
                        onChange={(e) => {
                            SetRoomID(e.target.value)
                            setAtPos(0)
                            if(!onRoomIDUpdated) {
                                setOnRoomIDUpdated(true)
                                setOnAtposUpdated(true)
                            }
                        }}
                    >
                        <option disabled selected value></option>
                        {scene.length > 0 && scene.slice(1).map((scene, index) => (
                            <option key={index} value={index+1}>{scene.id}. {scene.name} </option>
                        ))}
                    </select>
                </SimpleGrid>
            </Flex>

            <Flex
                bg="none"
                gap="xs"
                direction="row"
                wrap="wrap"
                justify="center"
                align="center"
            > 
                <SimpleGrid
                    cols={1}
                    spacing="sm"
                >
                    <Text >
                        At Position : {onAtposUpdated && <span style={{
                            color: "crimson"
                        }}>*update</span>}
                    </Text>

                    <select 
                        key={roomIndex}
                        defaultValue={Atpos}
                        onChange={(e) => {
                            setAtPos(e.target.value)
                            if(!onAtposUpdated) {
                                setOnAtposUpdated(true)
                            }
                        }}
                        style={{
                            minWidth: "168px"
                        }}
                    >
                        <option disabled selected value></option>
                        {scene[roomIndex] && scene[roomIndex].spawnPos.map((bt, index) => (
                            <option key={index} value={index} style={{textAlign: "center", justifyContent: "center"}}>({index}) [ {bt[0]}, {bt[1]}, {bt[2]} ] </option>
                        ))}
                    </select>
                </SimpleGrid>
            </Flex>

            <Flex
                bg="none"
                gap="xs"
                direction="row"
                wrap="wrap"
                justify="center"
                align="flex-end"
            > 
                <NumberInput
                    w={80}
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
                    w={80}
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
                    w={80}
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
                align="flex-end"
                direction="row"
                wrap="wrap"
            > 
                <Button
                    onClick={updateSettings}
                >
                    update
                </Button>
                <Button 
                    onClick={() => {
                        setInputPage("main")
                        setOnRoomIDUpdated(false)
                        setOnAtposUpdated(false)
                    }}
                >
                    back
                </Button>
                <Button
                    color="red"
                    onClick={onDelete}
                >
                    delete
                </Button>
            </Flex>

            <Flex
                bg="none"
                gap="xs"
                justify="center"
                align="flex-end"
                direction="row"
                wrap="wrap"
            > 
            </Flex>
            
        </SimpleGrid>
    )
}

export default BTInput