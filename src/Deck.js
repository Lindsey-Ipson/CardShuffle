import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [shuffling, setShuffling] = useState(false);

  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeck() {
      let deckRes = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(deckRes.data);
    }
    fetchDeck();
  }, [])

  async function drawCard () {
    try {
      const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

      if (drawRes.data.remaining === 0) {
        throw new Error("No cards remaining!");
      }

      const card = drawRes.data.cards[0];

      setDrawn(prevDrawn => [
        ...prevDrawn,
        {
          id: card.code,
          name: `${card.suit} of ${card.value}`,
          imgUrl: card.image
        }
      ]);
    }
    catch (err) {
      alert(err);
    }
  }

  async function shuffleDeck () {
    try {
      setShuffling(true);
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    }
    catch (err) {
      alert(err);
    }
    finally {
      setShuffling(false);
    }
  } 

  function renderDrawBtnIfDeckExists() {
    if (deck) {
      return (
        <button className='Deck-draw_btn' onClick={ drawCard } disabled={ shuffling }>Draw a card!</button>
      )
    }
    else return null;
  }

  function renderShuffleBtnIfDeckExists() {
    if (deck) {
      return (
        <button class='Deck-shuffle_btn' onClick={ shuffleDeck } disabled={ shuffling }>Shuffle deck</button>
      )
    }
    else return null;
  }

  return (
    <div className='Deck'>
      <div className='Deck-btn_container'>
      { renderDrawBtnIfDeckExists() }
      { renderShuffleBtnIfDeckExists() }
      </div>
      <div className='Deck-card_container'>
        { drawn.map(card => <Card key={ card.id } code={ card.code } name={ card.name } imgUrl={ card.imgUrl } />) }
      </div>
    </div>
  )

}

export default Deck;