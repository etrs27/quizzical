import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { nanoid } from "nanoid"
import "./App.css"

export default function App() {
  const [quiz, setQuiz] = React.useState([])
  const [status, setStatus] = React.useState(false)

  React.useEffect(() => {
    async function getQuiz() {
      if (status) {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=7&difficulty=medium"
        )
        const data = await res.json()
        allQuestions(data.results)
      }
    }
    getQuiz()
  }, [status])

  function gameStatus() {
    setStatus(!status)
  }

  function allQuestions(data) {
    const questions = []

    for (let i = 0; i < data.length; i++) {
      let optionArr = data[i].incorrect_answers.concat(data[i].correct_answer)
      questions.push({
        id: nanoid(),
        question: data[i].question,
        correct_answer: data[i].correct_answer,
        options: [],
      })
      for (let j = 0; j < optionArr.length; j++) {
        questions[i].options.push({
          id: nanoid(),
          value: optionArr[j],
          selected: false,
        })
      }
      setQuiz(questions)
    }
  }

  // ********
  //Returning data is not mapping correctly.

  function selectId(id) {
    setQuiz((prevQuiz) => {
      prevQuiz.map((question) => {
        return question.options.map((answer) => {
          return id === answer.id
            ? {
                ...question,
                options: { selected: !answer.selected },
              }
            : question
        })
      })
    })
  }

  return (
    <div className="App">
      <header className="blob1"></header>
      <main>
        {!status ? (
          <Start status={gameStatus} />
        ) : (
          <Quiz questions={quiz} selectId={selectId} />
        )}
      </main>
      <footer className="blob2"></footer>
    </div>
  )
}
