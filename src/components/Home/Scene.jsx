import { createStyles, Text, Flex, Box, Grid, SimpleGrid, Button, ScrollArea } from "@mantine/core"
import { useSocketClient } from "../SocketClient";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Room from "./Room";
import SceneInput from "./SceneInput";
import BTInput from "./BTInput";

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
    setInputPage
  } = useSocketClient();

  function onSave() {
    console.log(scene)
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
          <Box w={200}>
            content
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
                
                <Sky sunPosition={[0, 10, 0]} />
                <OrbitControls 
                  enableZoom={true} 
                  enableDamping={true} 
                  enablePan={true} 
                  enableRotate={true} 
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
                }}
              >
                {scene.length > 0 && scene.slice(1).map((scene, index) => (
                  <option key={index} value={index+1}>{scene.id}. {scene.name} </option>
                ))}
              </select>

              <Button onClick={onSave}>Save</Button>
            </SimpleGrid>
          </Flex>
        </Grid.Col>
        {Object.keys(SceneSelected).length > 0 && <Grid.Col>
          <Box h={70} w="100%" style={{borderRadius: "15px", padding: "5px"}}>
            <ScrollArea.Autosize h={70} maw="100%" offsetScrollbars>
              {InputPage === "main" && <SceneInput key={SceneSelected.id} />}
              {InputPage === "BT" && <BTInput key={indexItem} indexItem={indexItem} />}
            </ScrollArea.Autosize>
          </Box>
        </Grid.Col>}
      </Grid>  

    </>
  )
}

export default Scene