import "./stylesheets/Questions.css"

export default function Questions({ question, decode, id }) {
  return (
    <h3 className="quiz--questions" key={id}>
      {decode(question)}
    </h3>
  )
}
