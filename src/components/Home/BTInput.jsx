import { Flex, SimpleGrid, NumberInput, Button } from "@mantine/core"
import { useState } from "react"
import { useSocketClient } from "../SocketClient"

const BTInput = ({indexItem}) => {
    const {
        SceneSelected
    } = useSocketClient();

    const [roomID, SetRoomID] = useState(parseFloat(SceneSelected.enterBT[indexItem].roomID))

    const [posX, setPosX] = useState(SceneSelected.enterBT[indexItem].pos[0])
    const [posY, setPosY] = useState(SceneSelected.enterBT[indexItem].pos[1])
    const [posZ, setPosZ] = useState(SceneSelected.enterBT[indexItem].pos[2])

    const [AtposX, setAtPosX] = useState(SceneSelected.enterBT[indexItem].atPos[0])
    const [AtposY, setAtPosY] = useState(SceneSelected.enterBT[indexItem].atPos[1])
    const [AtposZ, setAtPosZ] = useState(SceneSelected.enterBT[indexItem].atPos[2])
    
    function updateSettings() {

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
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            > 
                <NumberInput
                    w={60}
                    value={roomID}
                    label="ID"
                    radius="md"
                    hideControls
                    onChange={(e) => {
                        SetRoomID(e)
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
                <NumberInput
                    w={60}
                    value={AtposX}
                    label="at pos"
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setAtPosX(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={AtposY} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setAtPosY(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={AtposZ} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setAtPosZ(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
            </Flex>

            <Button 
                style={{
                    alignSelf: "end"
                }}
                onClick={updateSettings}
            >
                update
            </Button>
            
        </SimpleGrid>
    )
}

export default BTInput