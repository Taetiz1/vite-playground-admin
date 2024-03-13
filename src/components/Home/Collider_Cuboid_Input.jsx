import { NumberInput, SimpleGrid, Flex, Button} from "@mantine/core"
import { useSocketClient } from "../SocketClient"
import { useState } from "react";
import { pushNotification } from "../Notification";

const Collider_Cuboid_Input = ({indexItem, setOnSaved}) => {
    const {
        SceneSelected,
        setSceneSelected,
        setInputPage
    } = useSocketClient();

    const cube = SceneSelected.colliders.cuboid[indexItem]

    const [arg1, setArg1] = useState(cube.args[0])
    const [arg2, setArg2] = useState(cube.args[1])
    const [arg3, setArg3] = useState(cube.args[2])

    const [posX, setPosX] = useState(cube.pos[0])
    const [posY, setPosY] = useState(cube.pos[1])
    const [posZ, setPosZ] = useState(cube.pos[2])

    const [rotX, setRotX] = useState(cube.rot[0])
    const [rotY, setRotY] = useState(cube.rot[1])
    const [rotZ, setRotZ] = useState(cube.rot[2])

    function updateSettings() {
        const settings = SceneSelected

        settings.colliders.cuboid[indexItem].args = [arg1, arg2, arg3]
        settings.colliders.cuboid[indexItem].pos = [posX, posY, posZ]
        settings.colliders.cuboid[indexItem].rot = [rotX, rotY, rotZ]
        
        setSceneSelected(settings)
        setOnSaved(false)
    }

    function onDelete() {
        const settings = SceneSelected

        settings.colliders.cuboid.splice(indexItem, 1)
        setSceneSelected(settings)
        setInputPage("main")
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
                align="flex-end"
                direction="row"
                wrap="wrap"
            > 
                <NumberInput
                    w={80}
                    value={arg1}
                    label="args"
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setArg1(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={80}
                    value={arg2} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setArg2(e)
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13) {
                            updateSettings()
                        }
                    }}
                />
                <NumberInput
                    w={80}
                    value={arg3} 
                    label=" "
                    radius="md"
                    precision={3}
                    hideControls
                    onChange={(e) => {
                        setArg3(e)
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
                <NumberInput
                    w={80}
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
                    w={80}
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
                    w={80}
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
            
        </SimpleGrid>
    )
}

export default Collider_Cuboid_Input