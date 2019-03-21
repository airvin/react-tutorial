import React from 'react'
import Square from './Square'
import './index.css'

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} />
    }

    createBoard() {
        let squareCount = 0
        let boardRows = Array(3).fill(null)
        for (let i = 0; i < 3; i++) {
            let squares = Array(3).fill(null)
            for (let j = 0; j < 3; j++) {
                squares[j] = this.renderSquare(squareCount)
                squareCount++
            }
            boardRows[i] = <div className="board-row">{squares}</div>
        }
        return boardRows
    }

    render() {
        const boardRows = this.createBoard()
        const rows = boardRows.map((row, index) => {
            return (<div key={index}> {row}</div >)
        })

        return <div>{rows}</div>
    }
}

export default Board