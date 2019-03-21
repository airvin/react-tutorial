import React from 'react'
import './index.css'

function Square(props) {
    return (
        <button
            className={props.winningSquare ? "winning-square" : "square"}
            onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}

export default Square