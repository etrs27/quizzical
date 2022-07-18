import Questions from "./Questions"
import Answers from "./Answers"
import "./stylesheets/Quiz.css"

export default function Quiz(props) {
  const quizElements = props.questions.map((question, index) => {
    // Filters answers for each quiz question
    const quizAnswers = props.answers.filter((answer) => {
      return answer.question_id === question.id
    })

    // To prevent double selection for a question
    const selectCheck = quizAnswers.some((answer) => answer.selected)

    // Handle highlighting the right answer, if not chosen
    const chosen = quizAnswers.filter((answer) => answer.selected)
    const rightAnswer =
      props.gameCheck && chosen.value !== question.correct_answer

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
      <section className="quiz--QA" key={index}>
        <div className="question--container">
          <Questions
            question={question.question}
            decode={decodeHTML}
            id={question.id}
          />
        </div>
        <div className="answers--container">
          <Answers
            quizAnswers={quizAnswers}
            decode={decodeHTML}
            correct={question.correct_answer}
            select={props.select}
            selectChecker={selectCheck}
            gameCheck={props.gameCheck}
            rightAnswer={rightAnswer}
          />
        </div>
      </section>
    )
  })

  return (
    <div className="quiz--page">
      <div className="quiz--container">{quizElements}</div>
      <div className="quiz--page-bottom">
        {props.gameCheck && (
          <p id="score--display">
            You scored {props.total()}/{props.questions.length} correct answers.
          </p>
        )}
        <button className="quiz--button" onClick={props.answerChecker}>
          {props.gameCheck ? "New Game" : "Check Answers"}
        </button>
      </div>
    </div>
  )
}
