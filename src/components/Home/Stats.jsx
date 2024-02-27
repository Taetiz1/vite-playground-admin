import { SimpleGrid, Card, Text, createStyles } from "@mantine/core"
import { IconUser, IconRegistered, IconPlugConnected } from "@tabler/icons-react";
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
        Stats
    } = useSocketClient();

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
            
        </>
    )

}

export default Stats