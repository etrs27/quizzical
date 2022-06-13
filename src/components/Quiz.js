import "./Quiz.css"

export default function Quiz(props) {
  const questionElements = props.questions.map((question, index) => {
    // Handle unicode or special characters
    let entities = {
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

    const answers = question.options.map((answer) => {
      let decoded = decodeHTML(answer.value)
      console.log(answer.selected)

      const styles = {
        backgroundColor: answer.selected ? "#59E391" : "#FFF",
      }

      return (
        <div
          style={styles}
          key={answer.id}
          className="quiz--answers"
          onClick={() => props.selectId(answer.id, index)}
        >
          {decoded}
        </div>
      )
    })

    return (
      <section className="question--container">
        <h3 className="quiz--question" key={question.id}>
          {decodeHTML(question.question)}
        </h3>
        {answers}
      </section>
    )
  })

  return (
    <div className="quiz--page">
      <div className="quiz--container">{questionElements}</div>
      <button className="quiz--button">Check Answers</button>
    </div>
  )
}
