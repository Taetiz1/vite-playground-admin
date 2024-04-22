import { createStyles, Text, Container, SimpleGrid, Table, Flex, Box, ScrollArea, Button, FileButton, TextInput, Image } from "@mantine/core";
import { useSocketClient } from "../SocketClient";
import { useState, useRef, useEffect } from "react";
import { pushNotification } from "../Notification";

const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      margin: 10,
      [theme.fn.smallerThan("sm")]: {
        fontSize: 24
      },
      "&::after": {
        content: '""',
        display: "block",
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 3,
        marginTop: theme.spacing.sm,
        marginLeft: "auto",
        marginRight: "auto"
      }
    }
}));

const UploadImage = () => {
    const {
        images,
        socketClient,
        setOnLoader
    } = useSocketClient()
    const { classes } = useStyles();
    const [imgPreview, setImgPreview] = useState('')
    const [imageFile, setImageFile] = useState()
    const [Name, setName] = useState("")
    const resetRef = useRef()

    function handleAcceptFile(file) {
        setImageFile(file)
    }

    function onReset() {
        setImageFile(undefined)
        resetRef.current?.();
        setName("")
    }

    useEffect(() => {
        if(socketClient) {
            socketClient.on('upload image complete', () => {
                setImageFile(undefined)
                setOnLoader(false)
                setName("")
            })
        }
    }, [socketClient])

    function onUpload() {
        if(Name !== ""){
            if(imageFile) {
              socketClient.emit("upload image", ({
                file: imageFile, 
                filename: imageFile.name,
                type:  imageFile.type,
                name: Name
              }))
              setOnLoader(true)
            }
        } else {
        const errorMsg = "กรุณากรอก Name"
            pushNotification("ล้มเหลว", errorMsg, "error")
        }
}

    return(<>
        <Text
            color="dimmed"
            className={classes.title}
            align="center"
            mt="md"
        >
            Upload Image
        </Text>
        <Container size="md">
            <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                <Flex
                    mih={50}
                    bg="none"
                    gap="md"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <div 
                        style={{ 
                            position: "relative", 
                            width: "800px", 
                            height: "400px", 
                        }}
                    >
                        <img 
                            src={imgPreview} 
                            alt="image" 
                            style={{
                                position: "absolute", 
                                top: "50%", 
                                left: "50%", 
                                transform: "translate(-50%, -50%)",
                                maxHeight: "400px"
                            }} 
                        />
                    </div>  
                </Flex>
                
                <Flex 
                    bg="none"
                    gap="xs"
                    justify="center"
                    align="flex-end"
                    direction="row"
                    wrap="wrap"
                    style={{ margin: "10px" }}
                >
                    {imageFile && (
                        <Text size="sm" align="right" mt="sm">
                            Picked file: {imageFile.name}
                        </Text>
                    )}
                    <FileButton resetRef={resetRef} onChange={(file) => handleAcceptFile(file)} accept="image/png,image/jpeg" color="yellow" >
                        {(props) => <Button {...props}>Upload</Button>}
                    </FileButton>
                    <Button disabled={!imageFile} color="red" onClick={onReset}>
                        Reset
                    </Button>
                    <TextInput
                        placeholder="Name"
                        label="Name"
                        radius="md"
                        withAsterisk
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <Button disabled={!imageFile} onClick={onUpload}>
                        Add
                    </Button>
                </Flex>
                <Flex
                    mih={50}
                    bg="none"
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                    w={1000}
                >
                    <Box w={400}>
                        <ScrollArea.Autosize w={400} mah={500}>
                            <Table highlightOnHover captionSide="top">
                                <caption>Images</caption>
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Emote</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {images && images.map((img, index) => {

                                        return (
                                            <tr 
                                                key={index} 
                                                onClick={() => {setImgPreview(img.url)}}
                                            >
                                                <td>{index+1}</td>
                                                <td>{img.name}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </ScrollArea.Autosize>
                    </Box>
                </Flex>
            </SimpleGrid>
        </Container>
    </>)
}

export default UploadImage