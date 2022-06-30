import "./Answers.css"

export default function Answers(props) {
  const answers = props.answers.map((answer) => {
    const checker = props.selectChecker

    const styles = {
      backgroundColor: answer.selected ? "#59E391" : "#FFF",
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
