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
            stepNumber: 0,
            boldMove: null,
            sortOrder: 'ascending'
        }
    }

    getPosition(i) {
        switch (i) {
            case 0:
                return '(1,1)'
            case 1:
                return '(1,2)'
            case 2:
                return '(1,3)'
            case 3:
                return '(2,1)'
            case 4:
                return '(2,2)'
            case 5:
                return '(2,3)'
            case 6:
                return '(3,1)'
            case 7:
                return '(3,2)'
            case 8:
                return '(3,3)'
            default:
                break
        }
    }

    handleClick(i) {
        this.setState({
            boldMove: i
        })

        const history = this.state.history
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        const placeOrder = current.placeOrder.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        placeOrder[history.length] = i
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

    reverseSortOrder() {
        if (this.state.sortOrder === 'ascending') {
            this.setState({ sortOrder: 'descending' })
            return
        }
        this.setState({ sortOrder: 'ascending' })
        return
    }

    render() {
        const history = this.state.history
        const current = history[history.length - 1]
        const positions = current.placeOrder
        const winner = calculateWinner(current.squares) && calculateWinner(current.squares).winner
        const winningSquares = calculateWinner(current.squares) && calculateWinner(current.squares).lines
        let moves = history.map((step, move) => {
            let desc = 'Go to start'
            if (move) {
                let player = (move % 2) === 0 ? 'O' : 'X'
                desc = `Player ${player} placed token at ${this.getPosition(positions[move])}`
            }
            return (
                <li key={move}>
                    <div className='move-info'>
                        <p>{move}</p>
                        <button
                            className='move-to-button'
                            onClick={() => this.jumpTo(move)}
                            style={{ fontWeight: positions[move] === this.state.boldMove ? 'bold' : 'normal' }}>
                            {desc}
                        </button>
                    </div>
                </li>
            )
        })
        if (this.state.sortOrder === 'descending') {
            moves = moves.slice().reverse()
        }
        let status
        if (winner) {
            status = 'Winner is ' + winner
        } else if (!winner && history.length === 10) {
            status = "Game is a draw"
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
                        winningSquares={winningSquares}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.reverseSortOrder()}>
                        Sort {this.state.sortOrder === 'ascending' ? 'descending' : 'ascending'}
                    </button>
                    <ul>{moves}</ul>
                </div>
            </div>
        )
    }
}

export default Game