import { Component } from 'react'

export const Square = (props) => (
  <button 
    className='square' 
    onClick={() => props.onClick()}>
    {props.value}
  </button>
)

class TicTacToe extends Component {

  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  calculateWinner = (squares) => {
    const winners = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let i = 0; i < winners.length; i++) {
      const[a,b,c] = winners[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
    }
    return null
  }

  handleClick = (i) => {
    const value = this.state.xIsNext ? 'X' : 'O'
    const squares = this.state.squares

    if (squares[i] || this.calculateWinner(squares)) return

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  resetGame = () => {
    this.setState({
      squares: this.state.squares.map(i => null),
      xIsNext: true
    })
  }

  renderSquare = i => {
    return(
      <Square 
        onClick={() => this.handleClick(i)}
        value={this.state.squares[i]}
      />
    )
  }

  render (){
    const winner = this.calculateWinner(this.state.squares)
    const status = winner ? `${winner} is the winner!` : this.state.xIsNext ? 'X\'s turn' : 'O\'s turn'
    const reset = winner ? <button onClick={this.resetGame}>Play Again</button> : null
    return (
      <div className='game'>
        <div className='status'>{status}</div>
        <div className='board'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {reset}
      </div>
    )
  }
}

export const App = () => (
  <TicTacToe />
)

export default App