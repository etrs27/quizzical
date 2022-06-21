import React from "react"
import Answers from "./Answers"
import Questions from "./Questions"
import { nanoid } from "nanoid"
import "./Quiz.css"

export default function Quiz(props) {
  const [quiz, setQuiz] = React.useState([])
  const [allAnswers, setAllAnswers] = React.useState([])

  React.useEffect(() => {
    async function getQuiz() {
      if (props.status) {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=7&difficulty=medium"
        )
        const data = await res.json()
        theQuiz(data.results)
      }
    }
    getQuiz()
  }, [props.status])

  function theQuiz(data) {
    const questions = []
    const answers = []

    for (let i = 0; i < data.length; i++) {
      let optionArr = data[i].incorrect_answers.concat(data[i].correct_answer)
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
      setQuiz(questions)
      setAllAnswers(answers)
    }
  }

  function selectOption(answerId) {
    setAllAnswers((prevState) =>
      prevState.map((answer) => {
        return answer.id === answerId
          ? { ...answer, selected: !answer.selected }
          : answer
      })
    )
  }

  const quizElements = quiz.map((question, index) => {
    // Handle unicode or special characters
    let entities = {
      amp: "&",
      apos: "'",
      "#x27": "'",
      "#x2F": "/",
      "#039": "'",
      "#047": "/",
      lt: "<",
      gt: ">",
      nbsp: " ",
      quot: '"',
    }

    function decodeHTML(data) {
      return data.replace(/&([^;]+);/gi, function (match, entity) {
        return entities[entity] || match
      })
    }

    const quizAnswers = allAnswers.filter((answer) => {
      return answer.question_id === question.id
    })

    return (
      <section className="quiz--container" key={index}>
        <Questions
          question={question.question}
          decode={decodeHTML}
          id={question.id}
        />
        <Answers
          answers={quizAnswers}
          decode={decodeHTML}
          select={selectOption}
        />
      </section>
    )
  })

  return (
    <div className="quiz--page">
      {quizElements}
      <button className="quiz--button">Check Answers</button>
    </div>
  )
}
