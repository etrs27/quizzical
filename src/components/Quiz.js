import "./Quiz.css"

export default function Quiz(props) {
  const quizElements = props.questions.map((question) => {
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

    function decodeHTMLEntities(data) {
      return data.replace(/&([^;]+);/gi, function (match, entity) {
        return entities[entity] || match
      })
    }

    const answerElements = question.options.map((option, index) => {
      decodeHTMLEntities(option)
      return (
        <button key={index} type="button" value={option}>
          {option}
        </button>
      )
    })

    return (
      <section className="quiz--container" key={question.id}>
        <h3 className="quiz--question">
          {decodeHTMLEntities(question.question)}
        </h3>
        <div className="quiz--answers">{answerElements}</div>
      </section>
    )
  })

  return (
    <div className="quiz--page">
      {quizElements}
      <button className="quiz--button">Check Answers</button>
    </div>
  )
}
