import { createStyles, Text } from "@mantine/core"

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

const Upload = () => {
    const { classes, theme } = useStyles();
    
    return(<>
        <Text
            color="dimmed"
            className={classes.title}
            align="center"
            mt="md"
        >
            Upload
        </Text>
    </>)
}

export default Upload