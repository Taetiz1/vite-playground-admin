import { createStyles, Text } from "@mantine/core"
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
}));

const Scene = () => {
    const { classes, theme } = useStyles();

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
        </>
    )
}

export default Scene