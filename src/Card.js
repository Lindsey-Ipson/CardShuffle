import React, { useState } from 'react';
import './Card.css';

function Card({ name, imgUrl }) {
  const [{ angle, xPos, yPos }] = useState({
    angle: Math.random() * 40 - 20,
    xPos: Math.random() * 20 - 10,
    yPos: Math.random() * 20 - 10,
  });

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

  return (
    <img src={imgUrl} alt={name} className='Card' style={{ transform }} />
  );
}

export default Card;