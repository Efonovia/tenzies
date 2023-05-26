import React from 'react';
import {nanoid} from "nanoid"


function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const circleStyles = {
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        backgroundColor: 'black',
        margin: 'auto',
    }

    let diceCircles = []
    if(props.value !== 3 && props.value !== 5) {
        for(let i = 0; i < props.value; i++) {
            diceCircles.push(<div key={nanoid()} style={circleStyles}></div>)
        }
    }

    return(
        <div>
            <div onClick={props.holdDice} 
             className={`die-face${props.value}`} 
             style={styles}>
                {
                (props.value !== 3 && props.value !== 5) ?
                    diceCircles : <h2 className="die-num">{props.value}</h2>
                }
            </div>
        </div>
    )
}

export default Die