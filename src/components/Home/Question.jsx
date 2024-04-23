import { createStyles, Text, ScrollArea, Flex, Box, Button, SimpleGrid, Container } from "@mantine/core"
import { useSocketClient } from "../SocketClient";
import QuestionEditor from "./QuestionEditor";
import { useState } from "react";

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

const Question = () => {
    const { classes } = useStyles();
    const {
        questions, 
        setQuestions,
        socketClient
    } = useSocketClient();

    const [onSaved, setOnSaved] = useState(false)

    function onSave() {
        socketClient.emit("save question", questions)
        setOnSaved(true)
    }

    function onAdd() {
        const addQuestion = {
            question: "คำถาม",
            answerOptions: [
                { answerText: "ตัวเลือกที่ 1", "isCorrect": true },
                { answerText: "ตัวเลือกที่ 2", "isCorrect": false },
                { answerText: "ตัวเลือกที่ 3", "isCorrect": false },
                { answerText: "ตัวเลือกที่ 4", "isCorrect": false }
            ]
        }

        const questionNew = questions
        questions.push(addQuestion)
        
        setQuestions(questionNew)
        setOnSaved(false)
    }

    return(<>
        <Text
            color="dimmed"
            className={classes.title}
            align="center"
            mt="md"
        >
            Question
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
            <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs" ta={"center"}>
                <Container>
                    <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs" ta={"center"}>
                        <Button color="yellow" onClick={onAdd}>
                            Add
                        </Button>
                        <Button color="green" onClick={onSave}>
                            Save
                        </Button>
                        <Text ta="left" color="green" style={{opacity: onSaved ? 1 : 0}}>
                            Saved!
                        </Text>
                    </SimpleGrid>
                </Container>
                
                <Text fw={700} fz={"xl"}>Questions</Text>
                <Container 
                    w={1000}
                    h={500}
                >
                    <Box w={900} h={500}>    
                        <ScrollArea.Autosize w={900} mah={500}>
                            {questions && questions.map((question, index) => (
                                <QuestionEditor key={index} question={question} index={index} setQuestions={setQuestions} setOnSaved={setOnSaved} />
                            ))}
                        </ScrollArea.Autosize>
                    </Box>
                </Container>
            </SimpleGrid>
        </Flex>
    </>)

}

export default Question