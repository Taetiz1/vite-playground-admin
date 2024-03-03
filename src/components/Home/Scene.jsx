import { createStyles, Text, Flex, Box, Grid, SimpleGrid, Button, ScrollArea } from "@mantine/core"
import { useSocketClient } from "../SocketClient";
import { Canvas } from "@react-three/fiber";
import { Line, Text as DreiText } from "@react-three/drei";
import { Sky, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import Room from "./Room";
import SceneInput from "./SceneInput";
import BTInput from "./BTInput";
import SpawnInput from "./SpawnInput";
import Tools from "./Tools";

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
    setSceneSelected,
    SceneSelected,
    indexItem,
    InputPage, 
    setInputPage,
    socketClient
  } = useSocketClient();
  
  const [sceneIndex, SetSceneIndex] = useState(1)
  const [onSaved, setOnSaved] = useState(false)

  function onSave() {
    socketClient.emit("save scene", ({scene: scene[sceneIndex], sceneIndex: sceneIndex}))
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
              <Tools setOnSaved={setOnSaved} />
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
                  position: [0, 50, 0], 
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
                <OrbitControls 
                  enableZoom={true} 
                  enableDamping={true} 
                  enablePan={true} 
                  enableRotate={true}
                  minDistance={0}
                  maxDistance={Infinity}
                />
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, 0]} intensity={1} />

                <Suspense>
                  {Object.keys(SceneSelected).length > 0 && <Room key={SceneSelected.id} />}
                </Suspense>
                
              </Canvas>
            </Box> 

            <SimpleGrid
              cols={3}
              spacing="xs"
              mt={5}
              style={{
                justifyItems: "center"
              }}
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
                onChange={(e) => {
                  setInputPage("main")
                  setSceneSelected(scene[e.target.value])
                  SetSceneIndex(e.target.value)
                  setOnSaved(false)
                }}
              >
                {scene.length > 0 && scene.slice(1).map((scene, index) => (
                  <option key={index} value={index+1}>{scene.id}. {scene.name} </option>
                ))}
              </select>

              <Flex
                bg="none"
                gap="xs"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button onClick={onSave}>Save</Button>
                
              <Text ta="left" style={{color: "crimson", opacity: onSaved ? 1 : 0}}>
                Saved!
              </Text>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Grid.Col>
        {Object.keys(SceneSelected).length > 0 && <Grid.Col>
          <Box h={110} w="100%">
            <ScrollArea h={110} w="100%" >
              {InputPage === "main" && <SceneInput key={SceneSelected.id} setOnSaved={setOnSaved} />}
              {InputPage === "BT" && <BTInput key={indexItem} indexItem={indexItem} setOnSaved={setOnSaved} />}
              {InputPage === "spawn" && <SpawnInput key={indexItem} indexItem={indexItem} setOnSaved={setOnSaved} />}
            </ScrollArea>
          </Box>
        </Grid.Col>}
      </Grid>  

    </>
  )
}

export default Scene