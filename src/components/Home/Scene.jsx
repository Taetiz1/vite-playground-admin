import { createStyles, Text, Flex, Box, Grid, SimpleGrid, Button, ScrollArea } from "@mantine/core"
import { useSocketClient } from "../SocketClient";
import { Canvas } from "@react-three/fiber";
import { Line, Text as DreiText } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import { Suspense, useState } from "react";
import Room from "./Room";
import SceneInput from "./SceneInput";
import BTInput from "./BTInput";
import SpawnInput from "./SpawnInput";
import Tools from "./Tools";
import Collider_Cuboid_Input from "./Collider_Cuboid_Input";
import InteractiveInput from "./InteractiveInput";

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
  },
}));

const Scene = () => {
  const { classes, theme } = useStyles();
  const {
    scene,
    SceneSelected,
    indexItem,
    InputPage, 
    setInputPage,
    socketClient,
    sceneIndex,
    SetSceneIndex
  } = useSocketClient();
  
  const [onSaved, setOnSaved] = useState(false)

  function onSave() {
    if(sceneIndex) {
      socketClient.emit("save scene", ({scene: scene[sceneIndex], sceneIndex: sceneIndex}))
      setOnSaved(true)
    }
  }

  function onSaveAll() {
    socketClient.emit("save all scene", ({scene: scene}))
    setOnSaved(true)
  }
  
  return(
    <>
      <Text
        color="dimmed"
        className={classes.title}
        align="center"
        mt="md"
      >
        Scene
      </Text>

      <Grid>
        <Grid.Col span="content">
          <Box w={210} h={400}>
            <ScrollArea w={210} h={400} >
              <Tools setOnSaved={setOnSaved}/>
            </ScrollArea>
          </Box>
        </Grid.Col>
        <Grid.Col span={9}>
          <Flex
            mih={50}
            bg="none"
            gap="md"
            justify="center"
            align="flex-start"
            direction="row"
            wrap="wrap"
          > 
            <Box w="100%" h={400}>
              <Canvas 
                shadows 
                camera={{ 
                  fov: 50,
                }}
                style={{
                  userSelect: "none"
                }}
              >

                {/* <group>
                  <Line points={[[-10, 0, 0], [10, 0, 0]]} color="red" lineWidth={2} />
                  <DreiText
                    position={[11, 0, 0]} // ตำแหน่งตรงกลางของแกน X
                    color="red"
                    fontSize={1}
                  >
                    X
                  </DreiText>

                  <Line points={[[0, -10, 0], [0, 10, 0]]} color="green" lineWidth={2} />
                  <DreiText
                    position={[0, 11, 0]} // ตำแหน่งตรงกลางของแกน Y
                    color="green"
                    fontSize={1}
                  >
                    Y
                  </DreiText>

                  <Line points={[[0, 0, -10], [0, 0, 10]]} color="blue" lineWidth={2} />
                  <DreiText
                    position={[0, 0, 11]} // ตำแหน่งตรงกลางของแกน Z
                    color="blue"
                    fontSize={1}
                  >
                    Z
                  </DreiText>

                </group> */}

                <Sky sunPosition={[0, 10, 0]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, 0]} intensity={1} />

                <Suspense>
                  {Object.keys(SceneSelected).length > 0 && <Room key={SceneSelected.id} />}
                </Suspense>
                
              </Canvas>
            </Box> 

            <SimpleGrid
              cols={2}
              spacing="xs"
              mt={5}
              style={{
                justifyItems: "center"
              }}
            >
              <Flex 
               bg="none"
               gap="xs"
               justify="flex-start"
               align="center"
               direction="row"
               wrap="wrap"
               >
              <Text 
                style={{
                  userSelect: "none",
                  alignSelf: "center",
                  justifySelf: "end"
                }}
              >
                Scene :
              </Text>

              <select 
                defaultValue={sceneIndex}
                onChange={(e) => {
                  setInputPage("main")
                  SetSceneIndex(e.target.value)
                  setOnSaved(false)
                }}
              >
                <option disabled selected value></option>
                {scene.length > 0 && scene.slice(1).map((scene, index) => (
                  <option key={index} value={index+1}>{scene.id}. {scene.name} </option>
                ))}
              </select>
              </Flex>

              <Flex
                bg="none"
                gap="xs"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button disabled={sceneIndex ? false : true} onClick={onSave}>Save</Button>
                <Button disabled={sceneIndex ? false : true}  onClick={onSaveAll}>Save All</Button>
                
                <Text ta="left" color="green" style={{opacity: onSaved ? 1 : 0}}>
                  Saved!
                </Text>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Grid.Col>
        {Object.keys(SceneSelected).length > 0 && <Grid.Col>
          <Box 
            bg="#EDF2FF"
            h={110} 
            w="100%"
            style={{
              border: "2px solid #FF922B",
              borderRadius: "8px",
              padding: "5px"
            }}
          >
            <ScrollArea h={100} w="100%" >
              {InputPage === "main" && <SceneInput key={SceneSelected.id} setOnSaved={setOnSaved} onSaveAll={onSaveAll} />}
              {InputPage === "BT" && <BTInput key={indexItem} indexItem={indexItem} setOnSaved={setOnSaved} />}
              {InputPage === "spawn" && <SpawnInput key={indexItem} indexItem={indexItem} setOnSaved={setOnSaved} />}
              {InputPage === "cube" && <Collider_Cuboid_Input key={indexItem} indexItem={indexItem} setOnSaved={setOnSaved} />}
              {InputPage === "interactive" && <InteractiveInput key={indexItem} indexItem={indexItem} setOnSaved={setOnSaved} />}
            </ScrollArea>
          </Box>
        </Grid.Col>}
      </Grid>  

    </>
  )
}

export default Scene