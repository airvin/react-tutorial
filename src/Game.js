import React from 'react'
import Board from './Board'
import calculateWinner from './helper/calculateWinner'
import './index.css'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                placeOrder: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        const placeOrder = current.placeOrder.slice()
        console.log(history)
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        let position = ''
        switch (i) {
            case 0:
                position = '(1,1)'
                break
            case 1:
                position = '(1,2)'
                break
            case 2:
                position = '(1,3)'
                break
            case 3:
                position = '(2,1)'
                break
            case 4:
                position = '(2,2)'
                break
            case 5:
                position = '(2,3)'
                break
            case 6:
                position = '(3,1)'
                break
            case 7:
                position = '(3,2)'
                break
            case 8:
                position = '(3,3)'
                break
            default:
                break
        }
        placeOrder[history.length] = position
        this.setState({
            history: this.state.history.concat({ squares: squares, placeOrder: placeOrder }),
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        const history = this.state.history
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            history: history.slice(0, step + 1)
        })
    }

    render() {
        const history = this.state.history
        const current = history[history.length - 1]
        const positions = current.placeOrder
        const winner = calculateWinner(current.squares)
        const moves = history.map((step, move) => {
            let desc = 'Go to start'
            if (move) {
                let player = (move % 2) === 0 ? 'O' : 'X'
                desc = `Player ${player} placed token at ${positions[move]}`
            }
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} style={{ fontWeight: move === history.length - 1 ? 'bold' : 'normal' }}>{desc}</button>
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