import React from 'react'

const Square = ({ value, onClick}) => {
  const renderAppropriateValue = () => {
    if(value==='HUMAN')
      return (
        <div style={{
          fontSize:'80px',
          color:'green'
        }}>X</div>
      )
    if(value==='COMPUTER')
      return (
        <div style={{
          fontSize:'80px',
          color:'orange'
        }}>O</div>
      )
  }
  return(
    <div className="square" onClick={onClick}>
      {renderAppropriateValue()}
    </div>
  )
}

export default Square