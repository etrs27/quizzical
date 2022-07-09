import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"
import "./App.css"

export default function App() {
  const [status, setStatus] = React.useState(false)
  const [gameCheck, setGameCheck] = React.useState(false)
  const [allQuestions, setAllQuestions] = React.useState([])
  const [allAnswers, setAllAnswers] = React.useState([])

  React.useEffect(() => {
    if (!status) {
      async function getQuiz() {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=7&difficulty=medium"
        )
        const data = await res.json()
        theQuiz(data.results)
      }
      getQuiz()
    }
  }, [status])

  // Handles starting the game
  function gameStatus() {
    setStatus(!status)
  }

  // Organizes fetched data
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

  // Selects user's answer choice
  function selectOption(answerId, selectCheck) {
    setAllAnswers((prevAllAnswers) =>
      prevAllAnswers.map((answer) => {
        return (answer.id === answerId && !selectCheck) ||
          (answer.id === answerId && answer.selected)
          ? { ...answer, selected: !answer.selected }
          : answer
      })
    )
  }

  // Checks all questions are answered or it restarts the game
  function answerChecker() {
    const allAnswered = allAnswers.filter((answer) => answer.selected).length
    if (!gameCheck && allAnswered === allQuestions.length) {
      setGameCheck((prevGameCheck) => !prevGameCheck)
      total()
    } else if (gameCheck) {
      setGameCheck((prevGameCheck) => !prevGameCheck)
      setStatus((prevStatus) => !prevStatus)
    }
  }

  // Handles total of correctly answered question
  const total = function count() {
    const selectedAnswers = allAnswers.filter((answer) => answer.selected)
    const allCorrect = allQuestions.filter(
      (question, index) =>
        question.correct_answer === selectedAnswers[index].value
    ).length
    return allCorrect
  }

  // Dimension for confetti, if user gets a perfect score.
  const width = "1200px"
  const height = "1200px"

  return (
    <div className="App">
      <header className="blob1"></header>
      <main>
        {gameCheck && total() === allQuestions.length && (
          <Confetti width={width} height={height} />
        )}
        {!status ? (
          <Start status={gameStatus} />
        ) : (
          <Quiz
            status={status}
            questions={allQuestions}
            answers={allAnswers}
            select={selectOption}
            answerChecker={answerChecker}
            gameCheck={gameCheck}
            total={total}
          />
        )}
      </main>
      <footer>
        <div className="blob2"></div>
        <p id="copyright">
          <small>&copy; 2022 etrs27</small>
        </p>
      </footer>
    </div>
  )
}
