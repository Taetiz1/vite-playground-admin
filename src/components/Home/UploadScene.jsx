import { Dropzone } from "@mantine/dropzone";
import { createStyles, Text, Group, rem } from "@mantine/core"
import { IconUpload, IconPhoto } from "@tabler/icons-react";

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

const UploadScene = () => {
    const { classes, theme } = useStyles();
    const maxSize = 500 * 1024 * 1024;
    
    return(<>
      <Text
        color="dimmed"
        className={classes.title}
        align="center"
        mt="md"
      >
        Upload Scene
      </Text>
      <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={maxSize}
      >
        <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag Model here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              ไฟล์ Model ต้องมีขนาดไม่เกิน 500MB
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>)
}

export default UploadScene