import Questions from "./Questions"
import Answers from "./Answers"
import "./Quiz.css"

export default function Quiz(props) {
  const quizElements = props.questions.map((question, index) => {
    const quizAnswers = props.answers.filter((answer) => {
      return answer.question_id === question.id
    })

    const selectCheck = quizAnswers.some((answer) => answer.selected)

    // Handle unicode or special characters
    const entities = {
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
      <section className="quiz--container" key={index}>
        <Questions
          question={question.question}
          decode={decodeHTML}
          id={question.id}
        />
        <Answers
          answers={quizAnswers}
          decode={decodeHTML}
          select={props.select}
          selectChecker={selectCheck}
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
