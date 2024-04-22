import { Container, TextInput, SimpleGrid, Text, Button } from "@mantine/core"
import { useState, useEffect } from "react"
import { useSocketClient } from "../SocketClient"

const QuestionEditor = ({ question, index, setOnSaved }) => {
    const {
        questions,
        setQuestions
    } = useSocketClient();

    const [title, setTitle] = useState(question.question)

    const [OptionA, setOptionA] = useState(question.answerOptions[0].answerText)
    const [OptionB, setOptionB] = useState(question.answerOptions[1].answerText)
    const [OptionC, setOptionC] = useState(question.answerOptions[2].answerText)
    const [OptionD, setOptionD] = useState(question.answerOptions[3].answerText)

    const [CorrectAnswer, setCorrectAnswer] = useState(question.answerOptions.findIndex(item => item.isCorrect === true))

    function onUpdate() {
        const questionEdit = questions
        questionEdit[index].question = title
        questionEdit[index].answerOptions[0].answerText = OptionA
        questionEdit[index].answerOptions[1].answerText = OptionB
        questionEdit[index].answerOptions[2].answerText = OptionC
        questionEdit[index].answerOptions[3].answerText = OptionD

        setQuestions(questionEdit)
        setOnSaved(false)
    }

    function onCorrect(answerIndex) {
        const questionEdit = questions
        questionEdit[index].answerOptions[CorrectAnswer].isCorrect = false
        questionEdit[index].answerOptions[answerIndex].isCorrect = true
        setCorrectAnswer(answerIndex)

        setQuestions(questionEdit)
        setOnSaved(false)
    }

    function onDelete() {
        const questionEdit = questions

        questionEdit.splice(index, 1)
        setQuestions(questionEdit)
    }

    return(
        <Container 
            style={{
                padding: '20px', 
                margin: '5px',
                borderStyle: 'groove'
            }} 
        >
            <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs" >
                <TextInput 
                    label={`Title : ${index+1} `}
                    size="md"
                    defaultValue={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs" >
                    <TextInput
                        style={{
                            background: question.answerOptions[0].isCorrect ? "wheat" : "none"
                        }}
                        label="Option A"
                        size="md"
                        defaultValue={OptionA}
                        onChange={(e) => {setOptionA(e.target.value)}}
                    />
                    <TextInput 
                        style={{
                            background: question.answerOptions[1].isCorrect ? "wheat" : "none"
                        }}
                        label="Option B"
                        size="md"
                        defaultValue={OptionB}
                        onChange={(e) => {setOptionB(e.target.value)}}
                    />
                    <TextInput
                        style={{
                            background: question.answerOptions[2].isCorrect ? "wheat" : "none"
                        }} 
                        label="Option C"
                        size="md"
                        defaultValue={OptionC}
                        onChange={(e) => {setOptionC(e.target.value)}}
                    />
                    <TextInput 
                        style={{
                            background: question.answerOptions[3].isCorrect ? "wheat" : "none"
                        }}
                        label="Option D"
                        size="md"
                        defaultValue={OptionD}
                        onChange={(e) => {setOptionD(e.target.value)}}
                    />
                </SimpleGrid>
                
                <SimpleGrid
                    cols={1}
                    spacing="sm"
                >
                    <Text 
                        ta="left"
                    >
                        Correct Answer : 
                    </Text>
                
                    <SimpleGrid
                        cols={3}
                        spacing="sm"
                    >
                        <select
                            defaultValue={CorrectAnswer}
                            onChange={(e) => {onCorrect(e.target.value)}}
                        >
                            <option value={0}>Option A</option>
                            <option value={1}>Option B</option>
                            <option value={2}>Option C</option>
                            <option value={3}>Option D</option>
                        </select>
                        <Button onClick={onUpdate}>Update</Button>
                        <Button onClick={onDelete} color="red" >Delete</Button>
                    </SimpleGrid>
                </SimpleGrid>
            </SimpleGrid>
        </Container>
    )
}

export default QuestionEditor