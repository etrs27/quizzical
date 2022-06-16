import "./Questions.css"

export default function Questions(props) {
  return (
    <h3 className="quiz--questions" key={props.id}>
      {props.decode(props.question)}
    </h3>
  )
}
