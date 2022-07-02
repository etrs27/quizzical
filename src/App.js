import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { nanoid } from "nanoid"
import "./App.css"

export default function App() {
  const [status, setStatus] = React.useState(false)
  const [allQuestions, setAllQuestions] = React.useState([])
  const [allAnswers, setAllAnswers] = React.useState([])

  React.useEffect(() => {
    if (status) {
      async function getQuiz() {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=7&difficulty=medium"
        )
        const data = await res.json()
        theQuiz(data.results)
      }
      getQuiz()
    } else {
    }
  }, [status])

  function gameStatus() {
    setStatus(!status)
  }

  function theQuiz(data) {
    const questions = []
    const answers = []

    for (let i = 0; i < data.length; i++) {
      let optionArr = data[i].incorrect_answers
      optionArr.splice(
        Math.floor(Math.random() * (optionArr.length + 1)),
        0,
        data[i].correct_answer
      )
      questions.push({
        id: nanoid(),
        question: data[i].question,
        correct_answer: data[i].correct_answer,
        checked: false,
      })
      for (let j = 0; j < optionArr.length; j++) {
        answers.push({
          id: nanoid(),
          question_id: questions[i].id,
          value: optionArr[j],
          selected: false,
        })
      }
      setAllQuestions(questions)
      setAllAnswers(answers)
    }
  }

  function selectOption(answerId, checked) {
    setAllAnswers((prevState) =>
      prevState.map((answer) => {
        return (answer.id === answerId && !checked) ||
          (answer.id === answerId && answer.selected)
          ? { ...answer, selected: !answer.selected }
          : answer
      })
    )
  }

  return (
    <div className="App">
      <header className="blob1"></header>
      <main>
        {!status ? (
          <Start status={gameStatus} />
        ) : (
          <Quiz
            status={status}
            questions={allQuestions}
            answers={allAnswers}
            select={selectOption}
          />
        )}
      </main>
      <footer className="blob2"></footer>
    </div>
  )
}
