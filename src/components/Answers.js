import "./stylesheets/Answers.css"

export default function Answers({
  quizAnswers,
  decode,
  correct,
  select,
  selectChecker,
  gameCheck,
  rightAnswer,
}) {
  const answers = quizAnswers.map((answer) => {
    const checker = selectChecker

    // Styles the answer choice depending on condition
    let styles
    if (gameCheck && answer.selected) {
      styles = {
        backgroundColor: answer.value === correct ? "#6BC135" : "#FA2E2E",
      }
    } else if (rightAnswer && answer.value === correct) {
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
        onClick={!gameCheck ? () => select(answer.id, checker) : undefined}
      >
        {decode(answer.value)}
      </div>
    )
  })
  return answers
}
