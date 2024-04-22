import { createStyles, Text, TextInput, Container, Box, Button, Flex, ScrollArea, Table, SimpleGrid, FileButton } from "@mantine/core"
import { pushNotification } from "../Notification";
import { Canvas } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import { Sky, OrbitControls } from "@react-three/drei";
import { useSocketClient } from "../SocketClient";
import Body_character from "./Body_character";

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

const UploadAnimation = () => {
  const { classes } = useStyles();
  const [modelFile, setModelFile] = useState()
  const [action, setAction] = useState("")
  const [animation, setAnimation] = useState()
  const resetRef = useRef()

  const {
    socketClient,
    avatarAnimation,
    setOnLoader
  } = useSocketClient();
  
  function handleAcceptFile(file) {
    let errorMsg
    
    if(file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
      setModelFile(file)
    } else {
      errorMsg = "ไฟล์ต้องเป็นนามสกุล .glb และ .gltf เท่านั้น "
      pushNotification("ล้มเหลว", errorMsg, "error")
    }
  }

  useEffect(() => {
    if(socketClient) {
      socketClient.on('upload animation complete', () => {
        setModelFile(undefined)
        setOnLoader(false) 
        setAction("")
      })
    }
  }, [socketClient])

  function onUpload() {
    if(action !== ""){
      if(modelFile) {
        socketClient.emit("upload animation", ({
          file: modelFile, 
          filename: modelFile.name, 
          action: action
        }))
        setOnLoader(true)
      }
    } else {
      const errorMsg = "กรุณากรอก Action Name"
      pushNotification("ล้มเหลว", errorMsg, "error")
    }
  }  

  function onReset() {
    setModelFile(undefined)
    setAction("")
    resetRef.current?.();
  }
  
  return(<>
    <Text
      color="dimmed"
      className={classes.title}
      align="center"
      mt="md"
    >
      Upload Animation
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
          <Box w={400}>
            <ScrollArea.Autosize w={400} mah={500}>
              <Table highlightOnHover captionSide="top">
                <caption>Animations</caption>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Emote</th>
                  </tr>
                </thead>
                <tbody>
                  {avatarAnimation.length > 0 && avatarAnimation.map((animation, index) => {

                    return (
                      <tr 
                        key={index} 
                        onClick={() => {
                          setAnimation(animation.action)
                        }}
                      >
                        <td>{index+1}</td>
                        <td>{animation.action}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </ScrollArea.Autosize>
          </Box>
          <Box w={400} h={480} pos="relative">
            <Canvas 
              shadows 
              camera={{ 
                position: [1, 0.5, 2.5], 
                fov: 50,
              }}
            >
              
              <Sky sunPosition={[0, 10, 0]} />
              <ambientLight />
              <directionalLight position={[4, 5, 4.5]} intensity={1}  castShadow shadow-mapSize={1024} />

              <group rotation={[0, -18.5, 0]} position={[0, -1, 0]}>
                <Body_character avatarUrl={'https://models.readyplayer.me/655a5d4e9b792809cdac419d.glb'} scale={[1, 1, 1]} animation={animation} />
              </group>

              <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
                <planeGeometry args={[10, 10, 1, 1]} />
                <shadowMaterial transparent opacity={0.2} />
              </mesh>

              <OrbitControls 
                enablePan={false} 
              />

            </Canvas>
            
            <Text>
              {animation}
            </Text>
          </Box>
        </Flex>

        <Flex 
          bg="none"
          gap="xs"
          justify="flex-end"
          align="flex-end"
          direction="row"
          wrap="wrap"
          style={{ margin: "10px" }}
        >
          
          {modelFile && (
            <Text size="sm" align="right" mt="sm">
              Picked file: {modelFile.name}
            </Text>
          )}
          <FileButton resetRef={resetRef} onChange={(file) => handleAcceptFile(file)} color="yellow" >
            {(props) => <Button {...props}>Upload</Button>}
          </FileButton>
          <Button disabled={!modelFile} color="red" onClick={onReset}>
            Reset
          </Button>
          
          <TextInput
            placeholder="Action name"
            label="Action Name"
            radius="md"
            withAsterisk
            onChange={(e) => {
              setAction(e.target.value)
            }}
          />
          <Button disabled={!modelFile} onClick={onUpload}>
            Add
          </Button>
        </Flex>
      </SimpleGrid>
    </Container>
  </>)
}

export default UploadAnimation