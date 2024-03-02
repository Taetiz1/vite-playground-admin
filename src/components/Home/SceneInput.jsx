import { NumberInput, SimpleGrid, Flex, Button} from "@mantine/core"
import { useSocketClient } from "../SocketClient"
import { useState } from "react";

const SceneInput = () => {
    const {
        SceneSelected,
        setSceneSelected
    } = useSocketClient();

    const [scaleX, setScaleX] = useState(SceneSelected.scale[0])
    const [scaleY, setScaleY] = useState(SceneSelected.scale[1])
    const [scaleZ, setScaleZ] = useState(SceneSelected.scale[2])

    const [posX, setPosX] = useState(SceneSelected.pos[0])
    const [posY, setPosY] = useState(SceneSelected.pos[1])
    const [posZ, setPosZ] = useState(SceneSelected.pos[2])

    const [rotX, setRotX] = useState(SceneSelected.rot[0])
    const [rotY, setRotY] = useState(SceneSelected.rot[1])
    const [rotZ, setRotZ] = useState(SceneSelected.rot[2])

    function updateSettings() {
        const settings = SceneSelected

        settings.scale = [scaleX, scaleY, scaleZ]
        settings.pos = [posX, posY, posZ]
        settings.rot = [rotX, rotY, rotZ]
        
        setSceneSelected(settings)
    }

    return(
        <SimpleGrid
            cols={4}
            spacing="xs"
            verticalSpacing="xs"
            mt={5}
        >
            {/* <TextInput
                value={"name"}
                label="Name"
                radius="md"
            /> */}
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
                    value={scaleX}
                    label="scale"
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setScaleX(e)
                            // console.log(parseFloat(e.target.value))
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={scaleY} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setScaleY(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={scaleZ} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setScaleZ(e)
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
                    value={rotX}
                    label="rotation"
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setRotX(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={rotY} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setRotY(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={60}
                    value={rotZ} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setRotZ(e)
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

export default SceneInput