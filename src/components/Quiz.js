import React from "react"
import Answers from "./Answers"
import Questions from "./Questions"
import { nanoid } from "nanoid"
import "./Quiz.css"

export default function Quiz(props) {
  const [quiz, setQuiz] = React.useState([])

  React.useEffect(() => {
    async function getQuiz() {
      if (props.status) {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=7&difficulty=medium"
        )
        const data = await res.json()
        allQuestions(data.results)
      }
    }
    getQuiz()
  }, [props.status])

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

  function selectId(answerId) {
    setQuiz((prevQuiz) => {
      // prevQuiz.map((question) => {
      //   return question.options.map((answer, index) => {
      //     // console.log(answer.selected)
      //     return answerId === answer.id
      //       ? {
      //           // ...question,
      //           ...answer,
      //           selected: !answer.selected,
      //         }
      //       : answer
      //   })
      // })
      for (let i = 0; i < prevQuiz.length; i++) {
        for (let j = 0; j < prevQuiz[i].options.length; j++) {
          return answerId === prevQuiz[i].options[j].id
            ? {
                ...prevQuiz,
                options: {
                  ...prevQuiz[i].options,
                  selected: !prevQuiz[i].options[j].selected,
                },
              }
            : prevQuiz
        }
      }
    })
  }

  console.log(quiz)
  /* ****************************** */
  const quizElements = quiz.map((question) => {
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

    return (
      <section className="quiz--container">
        <Questions
          question={question.question}
          decode={decodeHTML}
          id={question.id}
        />
        <Answers
          answers={question.options}
          decode={decodeHTML}
          select={selectId}
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
