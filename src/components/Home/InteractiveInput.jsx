import { NumberInput, SimpleGrid, Flex, Button, Text} from "@mantine/core"
import { useSocketClient } from "../SocketClient"
import { useState } from "react";

const InteractiveInput = ({indexItem, setOnSaved}) => {
    const {
        SceneSelected,
        setSceneSelected,
        setInputPage,
        avatarAnimation
    } = useSocketClient();

    const Interactive = SceneSelected.interactive[indexItem]

    const [emote, setEmote] = useState(Interactive.emote)

    const [posX, setPosX] = useState(Interactive.pos[0])
    const [posY, setPosY] = useState(Interactive.pos[1])
    const [posZ, setPosZ] = useState(Interactive.pos[2])

    const [rotX, setRotX] = useState(Interactive.rot[0])
    const [rotY, setRotY] = useState(Interactive.rot[1])
    const [rotZ, setRotZ] = useState(Interactive.rot[2])

    function updateSettings() {
        const settings = SceneSelected

        settings.interactive[indexItem].emote = emote
        settings.interactive[indexItem].pos = [posX, posY, posZ]
        settings.interactive[indexItem].rot = [rotX, rotY, rotZ]

        setSceneSelected(settings)
        setOnSaved(false)
    }

    function onDelete() {
        const settings = SceneSelected

        settings.interactive.splice(indexItem, 1)
        setSceneSelected(settings)
        setInputPage("main")
    }

    return (
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
                justify="center"
                align="center"
            > 
                <SimpleGrid
                    cols={1}
                    spacing="sm"
                >
                    <Text 
                        ta="left"
                    >
                        Emote : 
                    </Text>

                    <select 
                        defaultValue={emote}
                        onChange={(e) => {
                            setEmote(e.target.value)
                            updateSettings()
                        }}
                    >
                        <option disabled selected value></option>
                        {avatarAnimation.length > 0 && avatarAnimation.map((animation, index) => (
                            <option key={index} value={animation.action}>{animation.action} </option>
                        ))}
                    </select>
                </SimpleGrid>
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

export default InteractiveInput