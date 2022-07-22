import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

export const useFetch = (status) => {
  const url = "https://opentdb.com/api.php?amount=7&difficulty=medium"

  const [allQuestions, setAllQuestions] = useState([])
  const [allAnswers, setAllAnswers] = useState([])
  const [catchError, setCatchError] = useState("")

  useEffect(() => {
    if (!status) {
      async function getQuiz() {
        const res = await fetch(url)
        const data = await res.json()
        theQuiz(data.results)
      }
      getQuiz().catch(handleError)
    }
  }, [status])

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

  // Error Handler
  function handleError(err) {
    setCatchError(err)
  }

  return { allQuestions, allAnswers, catchError, setAllAnswers }
}
