import { useState, useEffect, useRef } from 'react'
import './App.scss'

function App() {
  const [deckOfCards, setDeckOfCards] = useState([]);
  const [currentCardNumber, setCurrentCardNumber] = useState(0);
  const sideEffectRanOnceAfterInitialRender = useRef(false);

  useEffect(() => {
    if (sideEffectRanOnceAfterInitialRender.current === false) {

      createDeckOfCards();

      sideEffectRanOnceAfterInitialRender.current = true;
    }
  })

  const createDeckOfCards = () => {
    const cardSuits = ['spades', 'hearts', 'clubs', 'diamonds'];
    const cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    let playingCards = [];

    for (let i = 0; i < cardSuits.length; i++) {
      for (let j = 0; j < cardRanks.length; j++) {
        playingCards.push(
          {
            id: crypto.randomUUID(),
            rank: cardRanks[j],
            suit: cardSuits[i]
          }
        )
      }
    }

    setDeckOfCards(playingCards);
  }

  const handlePlayClick = () => {
    showCurrentCard();
  }

  const showCurrentCard = () => {
    incrementCurrentCardNumber();
  }

  const incrementCurrentCardNumber = () => {
    setCurrentCardNumber(currentCardNumber + 1);
  }

  return (
    <div className="game-container">
      <h1>High-Low Game</h1>

      <div className="buttons-wrapper">
        <button type="button" className="button button-play" onClick={() => handlePlayClick()}>Play</button>
      </div>

      <div className="card-number">
        <span className="current-card-number">{currentCardNumber}</span>/5
      </div>

      <div className="card-progress-wrapper">
        <div className="card-progress card-1">
          <div className="card">
            <div className="card-back">
              <img src="src/img/cards/card-back.png" alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-2">
          <div className="card">
            <div className="card-back">
              <img src="src/img/cards/card-back.png" alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-3">
          <div className="card">
            <div className="card-back">
              <img src="src/img/cards/card-back.png" alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-4">
          <div className="card">
            <div className="card-back">
              <img src="src/img/cards/card-back.png" alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-5">
          <div className="card">
            <div className="card-back">
              <img src="src/img/cards/card-back.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <p className="credit">Card assets are from Boardgame Pack by <a href="http://www.kenney.nl" target="_blank">Kenney</a></p>
    </div>
  )
}

export default App
