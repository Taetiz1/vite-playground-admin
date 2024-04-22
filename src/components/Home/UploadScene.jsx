import { Dropzone } from "@mantine/dropzone";
import { createStyles, Text, Group, rem, Container, Box, Button, Flex, TextInput } from "@mantine/core"
import { IconUpload, IconFile3d } from "@tabler/icons-react";
import { pushNotification } from "../Notification";
import { Canvas } from "@react-three/fiber";
import SceneViewer from "./SceneViewer";
import { useEffect, useState } from "react";
import { Sky } from "@react-three/drei";
import { useSocketClient } from "../SocketClient";

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

const UploadScene = () => {
  const { classes, theme } = useStyles();
  const maxSize = 500 ;
  const [modelFile, setModelFile] = useState();
  const [modelUrl, setModelUrl] = useState()
  const [sceneName, setSceneName] = useState("")
  const [sceneURL, setSceneURL] = useState()

  const {
    socketClient,
    setOnLoader,
    scene
  } = useSocketClient();
  
  function handleAcceptFile(files) {
    const file =  files[0];
    let errorMsg
    
    if(file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
      setModelFile(file)
    } else {
      errorMsg = "ไฟล์ต้องเป็นนามสกุล .glb และ .gltf เท่านั้น "
      pushNotification("ล้มเหลว", errorMsg, "error")
    }
  }

  function handleRejectFile(files) {
    let errorMsg

    if(files.length > 1) {
      errorMsg = "กรุณา upload ทีละ 1 ไฟล์เท่านั้น"
      pushNotification("ล้มเหลว", errorMsg, "error")
    } else {
      errorMsg = "ไฟล์ที่เลือกมีขนาดใหญ่เกินไป"
      pushNotification("ล้มเหลว", errorMsg, "error")
    }
  }

  useEffect(() => {
    if(modelFile) {
      const url = URL.createObjectURL(modelFile);
      setModelUrl(url)
    }
  }, [modelFile])

  useEffect(() => {
    if(socketClient) {
      socketClient.on('upload scene complete', () => {
        setModelUrl(undefined)
        setSceneURL(undefined)
        setOnLoader(false)
      })
    }
  }, [socketClient])

  function onUpload() {
    if(sceneName !== ""){
      if(modelFile) {
        socketClient.emit("upload scene", ({
            file: modelFile, 
            filename: modelFile.name, 
            sceneName: sceneName
          }))
        setOnLoader(true)
      }
    } else {
      const errorMsg = "กรุณากรอก Scene Name"
      pushNotification("ล้มเหลว", errorMsg, "error")
    }
  }  

  function onUpdate() {
    if(sceneURL) {
      if(modelFile) {
        socketClient.emit("update scene", ({
            file: modelFile, 
            filename: modelFile.name,
            sceneURL: sceneURL
          }))
        setOnLoader(true)
      }
    } else {
      const errorMsg = "กรุณาเลือกฉากที่จะ Update"
      pushNotification("ล้มเหลว", errorMsg, "error")
    }
  }

  function onCancle() {
    setModelFile(undefined)
    setModelUrl(undefined)
    setSceneName("")
  }
  
  return(<>
    <Text
      color="dimmed"
      className={classes.title}
      align="center"
      mt="md"
    >
      Upload Scene
    </Text>
    <Container size="md">
      <Box w="100%" h={450}>
        {!modelUrl ? <Dropzone
          onDrop={(files) => handleAcceptFile(files)}
          onReject={(files) => handleRejectFile(files)}
          maxSize={maxSize * 1024 * 1024}
          multiple={false}
        >
          <Group position="center" align="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Idle>
              <IconFile3d 
                size="3.2rem" 
                stroke={1.3} 
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag Model here or click to select file
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                กำหนดไฟล์ glb และ gltf ต้องมีขนาดไม่เกิน {maxSize}MB
              </Text>
            </div>
          </Group>
        </Dropzone>
        : <>
          <Canvas
            shadows 
            camera={{ 
              fov: 50
            }}
            style={{
              userSelect: "none"
            }}
          >
            <Sky sunPosition={[0, 10, 0]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 0]} intensity={1} />
            <SceneViewer key={modelFile.name} modelUrl={modelUrl} />
          </Canvas>
          <Flex 
            bg="none"
            gap="xs"
            justify="flex-end"
            align="flex-end"
            direction="row"
            wrap="wrap"
            style={{ margin: "10px" }}
          >
            <TextInput
              placeholder="Scene name"
              label="Scene Name"
              radius="md"
              withAsterisk
              onChange={(e) => {
                setSceneName(e.target.value)
              }}
            />
            <Button onClick={onUpload}>Upload</Button>
            <Button color="red" onClick={onCancle}>Cancle</Button>
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
            <select 
              onChange={(e) => {
                setSceneURL(e.target.value)
              }}
            >
              <option disabled selected value></option>
              {scene.length > 0 && scene.map((scene, index) => (
                <option key={index} value={scene.url}>{scene.id}. {scene.name} </option>
              ))}
            </select>
            <Button color="yellow" onClick={onUpdate}>Update</Button>
          </Flex>
        </>}
      </Box> 
    </Container>
  </>)
}

export default UploadScene