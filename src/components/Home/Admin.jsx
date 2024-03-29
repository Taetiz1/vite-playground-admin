import { createStyles, Text, Table, Flex, ScrollArea, Button, Box, SimpleGrid, TextInput, Group, Container } from "@mantine/core"
import { useSocketClient } from "../SocketClient";
import { IconEdit, IconX } from "@tabler/icons-react";
import { useState } from "react";
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
}));

const Admin = () => {
    const { classes, theme } = useStyles();
    const {
        socketClient,
        admin,
        adminLog
    } = useSocketClient();

    const [id, setID] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmission = () => {
        let errorMsg;

        try {
            const IDEncoded = btoa(`${id}`);
            const passwordEncoded = btoa(`${password}`);

            if(IDEncoded !== '' && passwordEncoded !== ''){
                
                socketClient.emit("add admin", {id: IDEncoded, password: passwordEncoded})
                setID("")
                setPassword("")
                    
            } else {
                errorMsg = "กรุณากรอก ID และ Password ให้ครบท่วน"
                pushNotification("ล้มเหลว", errorMsg, "error")
            }

        } catch (error) {
                    
            errorMsg = "กรุณากรอก ID และ Password เป็นภาษาอังกฤษ"
            pushNotification("ล้มเหลว", errorMsg, "error")
        }
    }

    const removeAdmin = (id) => {
        if(Object.keys(admin).length > 1) {
            socketClient.emit("remove admin", id)
        } else {
            const errorMsg = "ไม่สามารถลบได้ การเข้าสู่ระบบจำเป็นต้องมีอย่างต่ำ 1 บัญชี"
            pushNotification("ล้มเหลว", errorMsg, "error")
        }
    }

    const clearLog = () => {
        socketClient.emit("clear log")
    }

    return(
        <>
            <Text
                color="dimmed"
                className={classes.title}
                align="center"
                mt="md"
            >
                Admin
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
                    <ScrollArea.Autosize w={400} mah={475}>
                        <Table striped highlightOnHover withBorder captionSide="top">
                            <caption>Admin</caption>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>ID</th>
                                    <th>Password</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(admin).length > 0 && Object.keys(admin).map((id, index) => {
                            
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{atob(id)}</td>
                                            <td>{atob(admin[id].password)}</td>
                                            <td>
                                                <Group position="center" >
                                                    <IconEdit size={18} stroke={2} color={theme.fn.primaryColor()} onClick={() => {setID(atob(id))}} />
                                                    <IconX size={18} stroke={2} color={theme.fn.primaryColor()} onClick={() => {removeAdmin(id)}} />
                                                </Group>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </ScrollArea.Autosize>

                    <SimpleGrid cols={3} mt="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                        <TextInput
                            label="ID"
                            placeholder="id"
                            name="id"
                            variant="filled"
                            onChange={(event) =>
                                setID(event.target.value)
                            }
                            value={id}
                        />

                        <TextInput
                            label="Password"
                            placeholder="password"
                            name="password"
                            variant="filled"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                                
                        <Group position="center" mt="xl">
                            <Button onClick={handleSubmission} type="submit" size="sm" w={450}>
                                Add
                            </Button>
                        </Group>

                    </SimpleGrid>
                
                </Box>

                <Box w={400}>
                    <ScrollArea.Autosize w={400} mah={470} >
                        <Table striped highlightOnHover withBorder captionSide="top">
                            <caption>Logs</caption>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>ID</th>
                                    <th>Action</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminLog.length > 0 && adminLog.slice().reverse().map((log, index) => {
                                    const date = new Date(log.time);
                            
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{atob(log.id)}</td>
                                            <td>{log.action}</td>
                                            <td>{date.toLocaleString()}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </ScrollArea.Autosize>
                
                    <Group position="center" mt="xl">
                        <Button onClick={clearLog} type="submit" size="sm" w={450}>
                            Clear
                        </Button>
                    </Group>

                </Box>
            </Flex>
        </>
    )
}

export default Admin