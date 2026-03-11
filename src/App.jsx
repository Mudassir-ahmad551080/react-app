import React, { useState } from 'react'

const App = () => {
  const styles = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '2rem',
      color: '#333',
    },
    gameBoard: {
      marginBottom: '2rem',
    },
    board: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 100px)',
      gap: '5px',
      backgroundColor: '#ddd',
      padding: '5px',
      borderRadius: '8px',
    },
    square: {
      width: '100px',
      height: '100px',
      fontSize: '2rem',
      fontWeight: 'bold',
      backgroundColor: '#fff',
      border: '2px solid #333',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
    },
    squareHover: {
      backgroundColor: '#f9f9f9',
    },
    status: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
      color: '#333',
      minHeight: '2rem',
    },
    resetBtn: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    },
    resetBtnHover: {
      backgroundColor: '#45a049',
    },
  }
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const currentWinner = calculateWinner(board)
  const isBoardFull = board.every((square) => square !== null)

  const handleClick = (index) => {
    if (board[index] || currentWinner || gameOver) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)

    const winner = calculateWinner(newBoard)
    if (winner) {
      setWinner(winner)
      setGameOver(true)
    } else if (isBoardFull) {
      setGameOver(true)
    }

    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
    setWinner(null)
  }

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  )

  const gameStatus = currentWinner
    ? `Winner: ${currentWinner}`
    : isBoardFull
    ? 'Draw!'
    : `Current Player: ${isXNext ? 'X' : 'O'}`

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.title}>Tic Tac Toe</h1>
      <div style={styles.gameBoard}>
        <div style={styles.board}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div style={styles.status}>{gameStatus}</div>
      <button style={styles.resetBtn} onClick={resetGame}>
        New Game
      </button>
    </div>
  )
}

export default App