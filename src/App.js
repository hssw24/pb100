import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State für die Aufgabe, Benutzerantwort, Punktestand und Statistiken
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Anzahl der richtigen Antworten
  const [score, setScore] = useState(0); // Punktzahl, unabhängig von richtigen Antworten
  const [attempts, setAttempts] = useState(0);
  const [options, setOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(true);
  const [lastQuestion, setLastQuestion] = useState({ first: 0, second: 0, answer: 0 });
  const [lastAnswer, setLastAnswer] = useState(0);

  // Generiere eine neue Aufgabe
  const generateNewQuestion = () => {
    const first = Math.floor(Math.random() * 90) + 1;
    const second = Math.floor(Math.random() * 9) + 1;
    setFirstNumber(first);
    setSecondNumber(second);

    const correctAnswer = first + second;
    const incorrectOptions = [];

    // Fülle die falschen Antwortoptionen, keine negativen Werte
    while (incorrectOptions.length < 9) {
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * 19) - 9;
      if (wrongAnswer !== correctAnswer && !incorrectOptions.includes(wrongAnswer) && wrongAnswer > 0) {
        incorrectOptions.push(wrongAnswer);
      }
    }

    // Sortiere die Optionen aufsteigend
    const allOptions = [...incorrectOptions, correctAnswer].sort((a, b) => a - b);
    setOptions(allOptions);
  };

  // Initialisiere die erste Aufgabe
  useEffect(() => {
    generateNewQuestion();
  }, []);

  // Funktion für die Auswahl einer Antwort
  const handleAnswerClick = (selectedOption) => {
    setAttempts(attempts + 1);
    const correctAnswer = firstNumber + secondNumber;

    // Speichere die letzte Aufgabe und das Ergebnis
    setLastQuestion({ first: firstNumber, second: secondNumber, answer: correctAnswer });
    setLastAnswer(selectedOption); // Speichere die Antwort des Benutzers

    if (selectedOption === correctAnswer) {
      setCorrectAnswers(correctAnswers + 1); // Anzahl richtiger Antworten erhöhen
      setScore(score + 5); // Punktzahl um 5 erhöhen
      setLastCorrect(true);
      if (correctAnswers + 1 === 20) {
        setGameOver(true);
      } else {
        generateNewQuestion();
      }
    } else {
      setScore(score - 1); // Punktzahl bei falscher Antwort um 1 reduzieren
      setLastCorrect(false);
      generateNewQuestion();
    }
  };

  // Spielende mit Statistiken
  if (gameOver) {
    return (
      <div className="App">
        <h1>Spiel beendet!</h1>
        <p>Du hast das Spiel nach {attempts} Versuchen mit {correctAnswers} richtigen Antworten abgeschlossen!</p>
        <p>Punktzahl: {score} / 100</p>
        <p>Letzte Aufgabe: {lastQuestion.first} + {lastQuestion.second} = {lastQuestion.answer}</p>
        <button onClick={() => window.location.reload()}>Neues Spiel</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Additionsspiel</h1>
      <p>Löse die Aufgabe: {firstNumber} + {secondNumber}</p>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p>Richtige Antworten: {correctAnswers} / 20</p>
      <p>Versuche: {attempts}</p>
      <p>Punktzahl: {score} / 100</p>

      {/* Zeige die letzte Aufgabe an */}
      <p>
        Letzte Aufgabe: {lastQuestion.first} + {lastQuestion.second} = {lastQuestion.answer}
      </p>

      {/* Wenn die letzte Antwort falsch war, roter Text mit falschem Ergebnis */}
      {!lastCorrect && (
        <p style={{ color: 'red' }}>
          Die letzte Antwort ({lastAnswer}) war falsch!
        </p>
      )}
    </div>
  );
}

export default App;
