import { useState } from "react"
import { useSocketClient } from "../SocketClient"
import { SimpleGrid, Flex, NumberInput, Button } from "@mantine/core"
import { pushNotification } from "../Notification"

const SpawnInput = ({indexItem, setOnSaved}) => {
    const {
        SceneSelected,
        setSceneSelected,
        setInputPage
    } = useSocketClient()

    const spawnPos = SceneSelected.spawnPos[indexItem]

    const [posX, setPosX] = useState(spawnPos[0])
    const [posY, setPosY] = useState(spawnPos[1])
    const [posZ, setPosZ] = useState(spawnPos[2])

    function updateSettings() {
        const settings = SceneSelected
        settings.spawnPos[indexItem] = [posX, posY, posZ];

        setSceneSelected(settings)
        setOnSaved(false)
    }

    function onDelete() {
        if(window.confirm("คุณต้องการที่จะลบ Spawn ใช่หรือไม่?")) {
            const settings = SceneSelected

            if(settings.spawnPos.length > 1) {
                settings.spawnPos.splice(indexItem, 1);

                setSceneSelected(settings)
                setInputPage("main")
            } else {
                const errorMsg = "Spawn ต้องมีอย่างน้อย 1 จุด ภายในฉาก"
                pushNotification("ล้มเหลว", errorMsg, "error")
            }
        }
    }

    return(
        <SimpleGrid
            cols={2}
            spacing="xs"
            verticalSpacing="xs"
            mt={5}
        >
            <Flex
                bg="none"
                gap="xs"
                justify="flex-end"
                align="flex-start"
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

export default SpawnInput