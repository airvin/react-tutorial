import React from 'react'
import Board from './Board'
import calculateWinner from './helper/calculateWinner'
import './index.css'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: this.state.history.concat({ squares: squares }),
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        const history = this.state.history
        console.log("jumpTo called")
        console.log(step)
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            history: history.slice(0, step + 1)
        })
    }

    render() {
        const history = this.state.history
        const current = history[history.length - 1]
        const winner = calculateWinner(current.squares)
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move ' + move : 'Go to start'
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        let status
        if (winner) {
            status = 'Winner is ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        xIsNext={this.state.xIsNext}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default Game