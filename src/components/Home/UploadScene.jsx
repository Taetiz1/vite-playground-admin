import { Dropzone } from "@mantine/dropzone";
import { createStyles, Text, Group, rem, Container } from "@mantine/core"
import { IconUpload, IconFile3d } from "@tabler/icons-react";
import { pushNotification } from "../Notification";
import { Canvas } from "@react-three/fiber";

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
  }
}));

const UploadScene = () => {
    const { classes, theme } = useStyles();
    const maxSize = 500 ;

    function handleAcceptFile(file) {
      let errorMsg
      
      if(file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
        console.log('accepted files', file)
      } else {
        errorMsg = "ไฟล์ต้องเป็นนามสกุล .glb และ .gltf เท่านั้น "
        pushNotification("ล้มเหลว", errorMsg, "error")
      }
    }

    function handleRejectFile(files) {
      let errorMsg

      if(files.length > 1) {
        errorMsg = "กรุณา upload ทีละ 1 ไฟล์เท่านั้น"
        pushNotification("ล้มเหลว", errorMsg, "error")
      } else {
        errorMsg = "ไฟล์ที่เลือกมีขนาดใหญ่เกินไป"
        pushNotification("ล้มเหลว", errorMsg, "error")
      }
    }
    
    return(<>
      <Text
        color="dimmed"
        className={classes.title}
        align="center"
        mt="md"
      >
        Upload Scene
      </Text>
      <Container size="md">
        <Dropzone
          onDrop={(files) => handleAcceptFile(files[0])}
          onReject={(files) => handleRejectFile(files)}
          maxSize={maxSize * 1024 * 1024}
          multiple={false}
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
              <IconFile3d 
                size="3.2rem" 
                stroke={1.3} 
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag Model here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                กำหนดไฟล์ glb และ gltf ต้องมีขนาดไม่เกิน {maxSize}MB
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Container>
      <Container size="md">
        <Canvas>

        </Canvas>
      </Container>
    </>)
}

export default UploadScene