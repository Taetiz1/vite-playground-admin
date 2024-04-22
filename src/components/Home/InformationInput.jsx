import { useState } from "react"
import { useSocketClient } from "../SocketClient"
import { NumberInput, SimpleGrid, Flex, Button} from "@mantine/core"

const InformationInput = ({ indexItem, setOnSaved, setOnEditContent }) => {
    const {
        SceneSelected,
        setSceneSelected,
        setInputPage
    } = useSocketClient();

    const Information = SceneSelected.information[indexItem]

    const [posX, setPosX] = useState(Information.pos[0])
    const [posY, setPosY] = useState(Information.pos[1])
    const [posZ, setPosZ] = useState(Information.pos[2])

    function updateSettings() {
        const settings = SceneSelected

        settings.information[indexItem].pos = [posX, posY, posZ]

        setSceneSelected(settings)
        setOnSaved(false)
    }

    function onDelete() {
        const settings = SceneSelected

        settings.information.splice(indexItem, 1)
        setSceneSelected(settings)
        setInputPage("main")
    }

    function onEditContent() {
        setOnEditContent(true)
    }

    return (
        <SimpleGrid
            cols={3}
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
                    onClick={onEditContent}
                >
                    edit content
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

export default InformationInput