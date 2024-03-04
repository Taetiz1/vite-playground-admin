import { createStyles, Text, Flex, Box, Table, ScrollArea, Button } from "@mantine/core"
import { useSocketClient } from "../SocketClient";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
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
  },
}));

const User = () => {
  const { classes, theme } = useStyles();
  const {
    user,
    socketClient
  } = useSocketClient();

  const [Email, setEmail] = useState("")
  const [avatarMode, setAvatarMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState()
  const [onSave, setOnsave] = useState(false)

  useEffect(() => {
    if(onSave) {
      setOnsave(false)
    }
  }, [Email])

  function saveChar() {
    socketClient.emit("save character", {Email: Email, avatarUrl: avatarUrl})
    setOnsave(false)
  }

  return(
    <>
      <Text
        color="dimmed"
        className={classes.title}
        align="center"
        mt="md"
      >
        User
      </Text>

      {!avatarMode && <Flex
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
              <caption>Registered Users</caption>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(user).length > 0 && Object.keys(user).map((email, index) => {
                  const emailform = email.replace(/_/g, ".");

                  return (
                    <tr 
                      key={index} 
                      onClick={() => {
                        setAvatarUrl(user[email].avatarUrl)
                        setEmail(email)
                      }}
                    >
                      <td>{index+1}</td>
                      <td>{emailform}</td>
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

            <group>
              <Suspense>
                {avatarUrl && <Body_character rotation={[0, -18.5, 0]} position={[0, -1, 0]} avatarUrl={avatarUrl} />}
              </Suspense>
            </group>

            <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
              <planeGeometry args={[10, 10, 1, 1]} />
              <shadowMaterial transparent opacity={0.2} />
            </mesh>

            <OrbitControls 
              enablePan={false} 
            />

          </Canvas>
          <div 
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              opacity: Email === "default" ? 1 : 0
            }}
          >
            <Button 
              style={{
                margin: "5px"
              }}
              disabled={Email === "default" ? false : true}
              onClick={() => {setAvatarMode(true)}}
            >
              custom
            </Button>
            <Button
              style={{
                margin: "5px"
              }} 
              disabled={onSave ? false : true}
              onClick={saveChar}
            >
              save
            </Button>
          </div>
          <Text>
            {Email.replace(/_/g, ".")}
          </Text>
        </Box>
      </Flex>}

      {avatarMode && (
        <AvatarCreator 
          subdomain="metaverse-wat-suan-kaew" 
          config={{
            clearCache: true,
            bodyType: 'fullbody',
            quickStart: false,
            language: 'th',
          }} 
          style={{
            width: '100%', 
            height: '75vh', 
            border: 'none',
            zIndex: 999999999,
          }} 
          onAvatarExported={(event) => {
            let newAvatarUrl =
            event.data.url === avatarUrl.split("?")[0]
              ? event.data.url.split("?")[0] + "?" + new Date().getTime()
              : event.data.url;
            newAvatarUrl +=
              (newAvatarUrl.includes("?") ? "&" : "?") +
              "meshlod=1&quality=high";
            setAvatarUrl(newAvatarUrl)
            setAvatarMode(false)
            setOnsave(true)
          }}
        />
      )}
    </>
  )
}

export default User