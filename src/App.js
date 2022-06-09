import React from "react"
import "./App.css"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { nanoid } from "nanoid"

export default function App() {
  const [quiz, setQuiz] = React.useState([])
  const [status, setStatus] = React.useState(false)

  function gameStatus() {
    setStatus(!status)
  }

  React.useEffect(() => {
    async function getQuiz() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=7&difficulty=medium"
      )
      const data = await res.json()
      allQuestions(data.results)
    }
    getQuiz()
  }, [])

  function allQuestions(data) {
    const questions = []
    for (let i = 0; i < data.length; i++) {
      let count = questions.push({
        id: nanoid(),
        question: data[i].question,
        correct_answer: data[i].correct_answer,
        options: data[i].incorrect_answers.concat(data[i].correct_answer),
      })
      setQuiz(questions)
    }
  }

  return (
    <div className="App">
      <header className="blob1"></header>
      <main>
        {!status ? <Start status={gameStatus} /> : <Quiz questions={quiz} />}
      </main>
      <footer className="blob2"></footer>
    </div>
  )
}
