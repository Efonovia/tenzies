import React from "react"
import Die from "./Die"
import Stats from "./Stats"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [paused, setPaused] = React.useState(true)
    const [seconds, setSeconds] = React.useState(0)
    const [games, setGames] = React.useState([])
    const [recordsPage, setRecordsPage] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setPaused(true)
            setGames(prevGame => {
                return [
                    ...prevGame, 
                    {
                    rolls: rolls, 
                    time: toTime(seconds), 
                    date: JSON.stringify(new Date()).split('T')[0] + " " + JSON.stringify(new Date()).split('T')[1].split('.')[0]}
                    ]
                })
        }
    }, [dice])

    React.useEffect(() => {
        localStorage.setItem("records", JSON.stringify(games))
    } ,[games])

    function toTime(s) {      
        let hour = Math.floor(s / 3600);
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;
        let time;

        if (hour === 0) {
            time = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
        } else if (hour === 0 && min === 0) {
            time = `${sec < 10 ? `0${sec}` : sec}`
        } else {
            time = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
        }
        return time
    }

    React.useEffect(() => {
        let interval
        interval = setInterval(() => {
            if(!paused) setSeconds(prevSeconds => prevSeconds + 1)
        }, 1000)

        return () => clearInterval(interval);
    }, [paused])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        setRolls(prevRolls => prevRolls + 1)
        if(tenzies) {
            setDice(allNewDice())
            setRolls(0)
            setTenzies(false)
            setSeconds(0)
        } else {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        }
    }
    
    function holdDice(id) {
        setPaused(false)
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <div>
            {recordsPage ? <Stats handleRecordsPage={[recordsPage, setRecordsPage]} statsObject={JSON.parse(localStorage.getItem('records'))} /> : (<div>
                <main>
                    {tenzies && <Confetti />}
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. 
                    Click each die to freeze it at its current value between rolls.</p>
                    <div className="dice-container">
                        {diceElements}
                    </div>
                    <button 
                        className="roll-dice" 
                        onClick={rollDice}
                    >
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                </main>
                <div className="score-board">Rolls:<div className="score">{rolls}</div></div>
                <div className="time-board">Time:<div className="time">{toTime(seconds)}</div></div>
                <div onClick={() => setRecordsPage(true)} className="stats">Records</div> 
            </div>)}
        </div>    
    )
}