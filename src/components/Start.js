import "./stylesheets/Start.css"

export default function Start({ status }) {
  return (
    <div className="start--page">
      <h1 id="start--title">Quizzical</h1>
      <p id="start--info">Test your knowledge with some trivia!</p>
      <button id="start--button" onClick={status}>
        Start Quiz
      </button>
    </div>
  )
}
