import { Dropzone } from "@mantine/dropzone";
import { Group } from "@mantine/core";
import { IconUpload, IconPhoto } from "@tabler/icons-react";
import { useMantineTheme, rem, Text } from "@mantine/core";

const Upload_Scane = () => {
    const maxSize = 500 * 1024 * 1024;
    const theme = useMantineTheme();

    return(
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
    )
}

export default Upload_Scane