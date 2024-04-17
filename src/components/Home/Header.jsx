import { 
    Box, 
    Group,
    Header as MantineHeader,
    UnstyledButton,
    Text,
    Button,
    HoverCard,
    Center,
    SimpleGrid 
} from "@mantine/core"
import { useSocketClient } from "../SocketClient"
import metaverseLogo from "/assets/MetaverseLogo.png"
import { IconChevronDown } from "@tabler/icons-react"

const Header = () => {
    const {
        setSite,
        ID
    } = useSocketClient();

    return (
        <Box pb={0}>
            <MantineHeader height={60} px="md">
                <Group position="apart" sx={{ height: "100%"}}>
                    <img src={metaverseLogo} alt="icon" width="150" height="auto" style={{pointerEvents: 'none', userSelect: 'none'}} />

                    <Group
                        sx={{ height: "100%"}}
                        spacing={10}
                    >
                        <UnstyledButton onClick={() => {setSite("Stats")}} >
                            <Text>
                                Home
                            </Text>
                        </UnstyledButton>

                        <UnstyledButton onClick={() => {setSite("User")}}>
                            <Text>
                                User
                            </Text>
                        </UnstyledButton>

                        <UnstyledButton onClick={() => {setSite("Scene")}}>
                            <Text>
                                Scene
                            </Text>
                        </UnstyledButton>

                        <UnstyledButton onClick={() => {setSite("Admin")}}>
                            <Text>
                                Admin
                            </Text>
                        </UnstyledButton>
                        <HoverCard 
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <Center
                                    inline
                                    style={{
                                        alignItems: "end"
                                    }}
                                >
                                    <Text>
                                        Upload
                                    </Text>
                                    <IconChevronDown size={20} />
                                </Center>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                                    <UnstyledButton onClick={() => {setSite("Upload Scene")}}> 
                                        Upload Scene
                                    </UnstyledButton>
                                    <UnstyledButton onClick={() => {setSite("Upload Animation")}}> 
                                        Upload Animation
                                    </UnstyledButton>
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Group>
                    <Group>
                        <Text>
                            ID : {ID}
                        </Text>
                        <Button onClick={() => {window.location.reload()}}>
                            Log out
                        </Button>
                    </Group>
                </Group>
            </MantineHeader>

        </Box>
    )
}

export default Header