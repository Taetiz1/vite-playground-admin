import { useState } from "react"
import { TextInput, Container, Group, SimpleGrid, Textarea, Button, Text } from "@mantine/core"

const InformationContent = ({ SceneSelected, indexItem, setOnSaved, setSceneSelected, images }) => {

    const Information = SceneSelected.information[indexItem]
    const [Header, setHeader] = useState(Information.header)
    const [Content, setContent] = useState(Information.content)
    const [Index, setIndex] = useState(0)
    const [Img, setImg] = useState('')

    function updateSettings() {
        const settings = SceneSelected

        settings.information[indexItem].header = Header
        settings.information[indexItem].content = Content

        setSceneSelected(settings)
        setOnSaved(false)
    }

    function onAddImage() {
        if(Img !== '') {
            const settings = SceneSelected
            settings.information[indexItem].image.push(Img)

            setSceneSelected(settings)
            setIndex(0)
        }
    }

    function onDeleteImage() {
        const settings = SceneSelected
        settings.information[indexItem].image.splice(Index, 1)

        setSceneSelected(settings)
        setIndex(0)
    }

    return(
        <Container>
            <Group position="center" cols={1} >
                <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
                    <Button 
                        variant="light" 
                        radius="md" 
                        onClick={() => {
                            if(Index > 0) {
                                setIndex(Index-1)
                            } else {
                                setIndex(Information.image.length-1)
                            }
                        }}
                        uppercase 
                    >
                        Back
                    </Button>
                    <Text ta={"center"} fw={700}>
                        {Index+1}
                    </Text>
                    <Button 
                        variant="light" 
                        radius="md" 
                        onClick={() => {
                            if(Index < Information.image.length-1) {
                                setIndex(Index+1)
                            } else {
                                setIndex(0)
                            }
                        }}
                        uppercase 
                    >
                        Next
                    </Button>
                </SimpleGrid>
                
            
                <div 
                    style={{ 
                        position: "relative", 
                        width: "800px", 
                        height: "400px", 
                    }}
                >
                    {Information.image.map((img, index) => (
                        <img 
                            key={index} 
                            src={img} 
                            alt="image" 
                            style={{
                                position: "absolute", 
                                top: "50%", 
                                left: "50%", 
                                transform: "translate(-50%, -50%)",
                                opacity: Index === index ? 1 : 0 ,
                                maxHeight: "400px"
                            }} 
                        />
                    ))}
                </div>
                <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
                    <select
                        onChange={(e) => {
                            setImg(e.target.value)
                        }}
                    >
                        <option disabled selected value></option>
                        {images && images.map((img, index) => (
                            <option key={index} value={img.url}>{index+1}. {img.name} </option>
                        ))}
                    </select>
                    <Button  radius="md" color="green" uppercase onClick={onAddImage}>
                        Add
                    </Button>
                    <Button  color="red" radius="md" uppercase onClick={onDeleteImage} >
                        Delete
                    </Button>
                </SimpleGrid>
                
                <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                    <TextInput
                        placeholder=""
                        label="Header"
                        defaultValue={Header}
                        w={1000}
                        onChange={(e) => {setHeader(e.target.value)}}
                    />
                    <Textarea
                        mt="md"
                        label="Message"
                        placeholder="Your message"
                        maxRows={10}
                        minRows={5}
                        w={1000}
                        autosize
                        name="Content"
                        defaultValue={Content}
                        onChange={(e) => {setContent(e.target.value)}}
                    />
                </SimpleGrid>
                <Button 
                    onClick={updateSettings}
                >
                    update
                </Button>

            </Group>
        </Container>
    )
}

export default InformationContent