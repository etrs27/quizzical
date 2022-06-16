import "./Start.css"

export default function Start(props) {
  return (
    <div className="start--page">
      <h1 id="start--title">Quizzical</h1>
      <p id="start--info">Test your knowledge with some trivia!</p>
      <button id="start--button" onClick={props.status}>
        Start Quiz
      </button>
    </div>
  )
}
