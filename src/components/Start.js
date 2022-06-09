import "./Start.css"

export default function Start(props) {
  return (
    <div className="start--page">
      <h1 className="start--title">Quizzical</h1>
      <p className="start--info">Test your knowledge with some trivia!</p>
      <button className="start--button" onClick={props.status}>
        Start Quiz
      </button>
    </div>
  )
}
