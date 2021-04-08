import React, { useState, useEffect } from "react";
import Square from "./Components/Square";
import "./style.css";

export default function App() {
  const initialPositions = [
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY"
  ];
  const initialPlayer = "HUMAN";
  const [player, setPlayer] = useState(initialPlayer);
  const [positions, setPositions] = useState(initialPositions);

  const onSquareClick = position => {
    const arrPosition = [...positions];
    if (arrPosition[position] === "EMPTY") {
      arrPosition[position] = player;
      setPositions(arrPosition);
      const newPlayer = player === "HUMAN" ? "COMPUTER" : "HUMAN";
      setPlayer(newPlayer);
    }
  };

  const detectWinner = () => {
    const p = positions
    function isWinner(player){
      if(p[0]===player && p[1]===player && p[2]===player)
        return true
      if(p[3]===player && p[4]===player && p[5]===player)
        return true
      if(p[6]===player && p[7]===player && p[8]===player)
        return true
      if(p[0]===player && p[3]===player && p[6]===player)
        return true
      if(p[1]===player && p[4]===player && p[7]===player)
        return true
      if(p[2]===player && p[5]===player && p[8]===player)
        return true
      if(p[0]===player && p[4]===player && p[8]===player)
        return true
      if(p[2]===player && p[4]===player && p[6]===player)
        return true
    }
    function isGridFull(){
      return p.every(pos=>pos!=='EMPTY')
    }
    const isHumanWinner = isWinner('HUMAN')
    if(isHumanWinner!==undefined) return 'HUMAN'

    const isComputerWinner = isWinner('COMPUTER')
    if(isComputerWinner!==undefined) return 'COMPUTER'

    const isTie = isGridFull()
    if(isTie) return 'Tie'
  }
  // whenever the player is computer, we should calculate position
  useEffect(()=>{
     const winner = detectWinner()
     if(winner){
       let msg
       if(winner === 'HUMAN')
        msg = 'Congrats! you won'
      else if(winner === 'COMPUTER')
        msg = 'Sorry! you lost'
      else
        msg = "It's a tie!"
       
       const res = alert(msg)
       if(res===undefined){
         setPositions(initialPositions)
         setPlayer(initialPlayer)
       }
     }
     if (winner === undefined && player === "COMPUTER") {
      const position = calculateResponse(positions);

      setTimeout(() => {
        onSquareClick(position);
      }, 600);
    }
  }, [player])
 
  
  function calculateResponse(p) {
    function isLineFullOf(player) {
      if (
        p[0] === "EMPTY" &&
        ((p[1] === player && p[2] === player) ||
          (p[3] === player && p[6] === player) ||
          (p[4] === player && p[8] === player))
      )
        return 0;


      if (
        p[1] === "EMPTY" &&
        ((p[0] === player && p[2] === player) ||
          (p[4] === player && p[7] === player))
      )
        return 1;

      if (
        p[2] === "EMPTY" &&
        ((p[0] == player && p[1] == player) ||
          (p[5] == player && p[8] == player) ||
          (p[4] == player && p[6] == player))
      )
        return 2;

      if (
        p[3] === "EMPTY" &&
        ((p[4] == player && p[5] == player) || (p[0] == player && p[6] == player))
      )
        return 3;

      if (
        p[4] === "EMPTY" &&
        ((p[3] == player && p[5] == player) ||
          (p[1] == player && p[7] == player) ||
          (p[0] == player && p[8] == player) ||
          (p[2] == player && p[6] == player))
      )
        return 4;

      if (
        p[5] === "EMPTY" &&
        ((p[3] == player && p[4] == player) || (p[2] == player && p[8] == player))
      )
        return 5;

      if (
        p[6] === "EMPTY" &&
        ((p[7] == player && p[8] == player) ||
          (p[0] == player && p[3] == player) ||
          (p[4] == player && p[2] == player))
      )
        return 6;

      if (
        p[7] === "EMPTY" &&
        ((p[6] == player && p[8] == player) || (p[1] == player && p[4] == player))
      )
        return 7;

      if (
        p[8] === "EMPTY" &&
        ((p[6] == player && p[7] == player) ||
          (p[2] == player && p[5] == player) ||
          (p[4] == player && p[0] == player))
      )
        return 8;
    }
    //if computer can win, calculate the winning positions - winning position
    const winningPosition = isLineFullOf("COMPUTER");
    if (winningPosition !== undefined) return winningPosition;

    //if user can win in next turn, prevent user from winning - defending position
    const defendingPosition = isLineFullOf("HUMAN");
    if (defendingPosition !== undefined) return defendingPosition;

    // otherwise calculate random position
    while(true) {
      const randomPosition = Math.floor(Math.random()*9)
      if(p[randomPosition] === 'EMPTY') {
        return randomPosition;
      }
    }
  }
  return (
    <div id="grid">
      <Square
        value={positions[0]}
        onClick={() => onSquareClick(0)}
      />
      <Square
        value={positions[1]}
        onClick={() => onSquareClick(1)}
      />
      <Square
        value={positions[2]}
        onClick={() => onSquareClick(2)}
      />
      <Square
        value={positions[3]}
        onClick={() => onSquareClick(3)}
      />
      <Square
        value={positions[4]}
        onClick={() => onSquareClick(4)}
      />
      <Square
        value={positions[5]}
        onClick={() => onSquareClick(5)}
      />
      <Square
        value={positions[6]}
        onClick={() => onSquareClick(6)}
      />
      <Square
        value={positions[7]}
        onClick={() => onSquareClick(7)}
      />
      <Square
        value={positions[8]}
        onClick={() => onSquareClick(8)}
      />
    </div>
  );
}
