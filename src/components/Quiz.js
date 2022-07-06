import Questions from "./Questions"
import Answers from "./Answers"
import "./stylesheets/Quiz.css"

export default function Quiz(props) {
  const quizElements = props.questions.map((question, index) => {
    const quizAnswers = props.answers.filter((answer) => {
      // Filters answers for each quiz question
      return answer.question_id === question.id
    })

    // To prevent double selection for a question
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
          correct={question.correct_answer}
          select={props.select}
          selectChecker={selectCheck}
          gameCheck={props.gameCheck}
        />
      </section>
    )
  })

  return (
    <div id="quiz--page">
      {quizElements}
      {props.gameCheck && (
        <p>
          You scored {props.total()}/{props.questions.length} correct answers.
        </p>
      )}
      <button className="quiz--button" onClick={props.answerChecker}>
        {props.gameCheck ? "New Game" : "Check Answers"}
      </button>
    </div>
  )
}
