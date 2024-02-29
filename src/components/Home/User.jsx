import { createStyles, Text, Flex, Box, Table, ScrollArea } from "@mantine/core"
import { useSocketClient } from "../SocketClient";
import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
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
    avatarUrl,
    setAvatarUrl,
    ndexItem
  } = useSocketClient();

  const [Email, setEmail] = useState("")

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
                        setEmail(emailform)
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
        <Box w={400} h={480}>
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
                {avatarUrl !== '' && <Body_character rotation={[0, -18.5, 0]} position={[0, -1, 0]} />}
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
          <Text>
            {Email}
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export default User