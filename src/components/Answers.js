import "./stylesheets/Answers.css"

export default function Answers(props) {
  const answers = props.answers.map((answer) => {
    const checker = props.selectChecker

    // Styles the answer choice depending on condition
    let styles
    if (props.gameCheck && answer.selected) {
      styles = {
        backgroundColor: answer.value === props.correct ? "green" : "red",
      }
    } else if (answer.selected) {
      styles = { backgroundColor: "purple" }
    } else {
      styles = { backgroundColor: "white" }
    }

    return (
      <div
        style={styles}
        key={answer.id}
        className="quiz--answers"
        onClick={() => props.select(answer.id, checker)}
      >
        {props.decode(answer.value)}
      </div>
    )
  })
  return answers
}
