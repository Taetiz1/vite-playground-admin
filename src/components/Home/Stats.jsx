import { SimpleGrid, Card, Text, createStyles, Flex, Button } from "@mantine/core"
import { IconUser, IconRegistered, IconPlugConnected } from "@tabler/icons-react";
import { useSocketClient } from "../SocketClient";
import { useState, useEffect } from "react";
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
    },
  
    description: {
      maxWidth: 600,
      margin: "auto",
      fontSize: 54,
      textAlign: "center"
    },
  
    card: {
      border: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`
    },
  
    cardTitle: {
      "&::after": {
        content: '""',
        display: "block",
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm
      }
    }
}));

const Stats = () => {
    const { classes, theme } = useStyles();
    const {
        Stats,
        startPoint,
        setStartPoint,
        socketClient
    } = useSocketClient();
    const [editStartPoint, setEditStartPoint] = useState(false)
    const [roomsForEdit, SetRoomsForEdit] = useState({})
    const [roomID, setRoomID] = useState("")
    const [atPos, setAtPos] = useState()

    function handleGetSpawn() {
        socketClient.emit("get start point")
    }

    function handleSaveEdit() {
        if(roomID !== "" && atPos) {
            const Edit = {
                roomID: roomID,
                atPos: atPos
            }
            setStartPoint(Edit)
            
            socketClient.emit("edit start point", Edit)
            setEditStartPoint(false)
        } else {
            const errorMsg = "กรุณาเลือก Scene ที่ต้องการจะไป"
            pushNotification("ล้มเหลว", errorMsg, "error")
        }
    }

    useEffect(() => {
        if(socketClient) {
            socketClient.on("get start point", (rooms) => {

                SetRoomsForEdit(rooms)
                setEditStartPoint(true)
            })
        }

    }, [socketClient])

    return(
        <>
            <Text
                color="dimmed"
                className={classes.title}
                align="center"
                mt="md"
            >
                Home
            </Text>
            {Stats && <SimpleGrid
                cols={3}
                spacing="xl"
                mt={50}
                breakpoints={[{ maxWidth: "md", cols: 1 }]}
            >
                <Card
                    key={"Online Users"}
                    shadow="md"
                    radius="md"
                    className={classes.card}
                    p="xl"
                >
                    <IconUser size={50} stroke={2} color={theme.fn.primaryColor()} />
                    <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
                        {"Online Users"}
                    </Text>
                    <Text size="sm" color="dimmed" mt="sm" className={classes.description}>
                        {Stats.clients}
                    </Text>
                </Card>

                <Card
                    key={"Registered Users"}
                    shadow="md"
                    radius="md"
                    className={classes.card}
                    p="xl"
                >
                    <IconRegistered size={50} stroke={2} color={theme.fn.primaryColor()} />
                    <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
                        {"Registered Users"}
                    </Text>
                    <Text size="sm" color="dimmed" mt="sm" className={classes.description}>
                        {Stats.registedEmail}
                    </Text>
                </Card>

                <Card
                    key={"Online Registered Users"}
                    shadow="md"
                    radius="md"
                    className={classes.card}
                    p="xl"
                >
                    <IconPlugConnected size={50} stroke={2} color={theme.fn.primaryColor()} />
                    <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
                        {"Online Registered Users"}
                    </Text>
                    <Text size="sm" color="dimmed" mt="sm" className={classes.description}>
                        {Stats.activeEmail}
                    </Text>
                </Card>
            </SimpleGrid>}
            <SimpleGrid
                cols={editStartPoint ? 3 : 1}
                spacing="xl"
                mt={50}
                breakpoints={[{ maxWidth: "md", cols: 1 }]}
                style={{
                    fontSize: editStartPoint ? "20px" : "25px",
                    padding: "50px",
                    border: "2px solid #FF922B",
                    borderRadius: "8px",
                }}
                bg="#EDF2FF"
            >
            
                {editStartPoint ? 
                    <> 
                        <SimpleGrid
                            cols={1}
                            spacing="sm"
                        >
                            <Text>Scene : </Text>
                            <select
                                onChange={(e) => {
                                    setRoomID(e.target.value)
                                }}
                            >
                                <option disabled selected value></option>
                                {Object.keys(roomsForEdit).length > 0 && Object.keys(roomsForEdit).map((room, index) => (
                                    <option key={index} value={room}>{room} {roomsForEdit[room].name}</option>
                                ))}
                            </select>
                        </SimpleGrid>
                        <SimpleGrid
                            cols={1}
                            spacing="sm"
                        >
                            <Text>at Position : </Text>
                            <select
                                key={roomID}
                                onChange={(e) => {
                                    setAtPos(e.target.value)
                                }}
                            >
                                <option disabled selected value></option>
                                {roomsForEdit[roomID] && roomsForEdit[roomID].spawnPos.map((pos, index) => (
                                    <option key={index} value={index}>{index}  [{pos[0]}, {pos[1]}, {pos[2]}]</option>
                                ))}
                            </select>
                        </SimpleGrid>
                        <Flex
                        bg="none"
                        gap="xs"
                        direction="row"
                        wrap="wrap"
                        justify="center"
                        align="end"
                        > 
                            <Button 
                                onClick={handleSaveEdit}
                            >
                                save
                            </Button>
                            
                            
                            <Button
                                onClick={() => {
                                    setEditStartPoint(false)
                                    setRoomID("")
                                    setAtPos(undefined)
                                }}
                            >
                                Back
                            </Button>
                        </Flex>
                    </> : 
                    <Flex
                        bg="none"
                        gap="xs"
                        direction="row"
                        wrap="wrap"
                        justify="center"
                        align="center"
                    > 
                        <Text>
                            The starting point is at the <span style={{color: "crimson"}}>scene ID : {startPoint.roomID}</span> on <span style={{color: "blue"}}>position : {startPoint.atPos}</span>
                        </Text>
                        <Button
                            onClick={handleGetSpawn}
                        >
                            Edit
                        </Button>
                    </Flex>
                }
            </SimpleGrid>
            
        </>
    )

}

export default Stats