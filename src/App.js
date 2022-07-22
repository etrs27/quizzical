import { useState } from "react"
import { useFetch } from "./useFetch"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import CatchError from "./CatchError"
import Confetti from "react-confetti"
import "./App.css"

export default function App() {
  const [status, setStatus] = useState(false)
  const [gameCheck, setGameCheck] = useState(false)

  const { allQuestions, allAnswers, catchError, setAllAnswers } =
    useFetch(status)

  // Handles starting the game
  function gameStatus() {
    setStatus(!status)
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

  // Dimensions for confetti, if the user gets a perfect score.
  const width = "3000px"
  const height = "3000px"

  return (
    <div className="App">
      <header className="blob1"></header>
      <main>
        {gameCheck && total() === allQuestions.length && (
          <Confetti width={width} height={height} />
        )}
        {!status && <Start status={gameStatus} />}
        {!catchError && status && (
          <Quiz
            questions={allQuestions}
            answers={allAnswers}
            select={selectOption}
            answerChecker={answerChecker}
            gameCheck={gameCheck}
            total={total}
          />
        )}
        {catchError && <CatchError />}
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
