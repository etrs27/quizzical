import "./stylesheets/Answers.css"

export default function Answers(props) {
  const answers = props.quizAnswers.map((answer) => {
    const checker = props.selectChecker

    // Styles the answer choice depending on condition
    let styles
    if (props.gameCheck && answer.selected) {
      styles = {
        backgroundColor: answer.value === props.correct ? "#6BC135" : "#FA2E2E",
      }
    } else if (props.rightAnswer && answer.value === props.correct) {
      styles = { backgroundColor: "rgb(148, 215, 162, .4)" }
    } else if (answer.selected) {
      styles = { backgroundColor: "#D6DBF5" }
    } else {
      styles = { backgroundColor: "#FFF" }
    }

    return (
      <div
        style={styles}
        key={answer.id}
        className="quiz--answers"
        onClick={
          !props.gameCheck ? () => props.select(answer.id, checker) : null
        }
      >
        {props.decode(answer.value)}
      </div>
    )
  })
  return answers
}
