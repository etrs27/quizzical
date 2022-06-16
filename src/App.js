import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import "./App.css"

export default function App() {
  const [status, setStatus] = React.useState(false)

  function gameStatus() {
    setStatus(!status)
  }

  return (
    <div className="App">
      <header className="blob1"></header>
      <main>
        {!status ? <Start status={gameStatus} /> : <Quiz status={status} />}
      </main>
      <footer className="blob2"></footer>
    </div>
  )
}
