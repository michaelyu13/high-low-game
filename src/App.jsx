import { useState, useEffect, useRef } from 'react'
import './App.scss'

function App() {
  const [deckOfCards, setDeckOfCards] = useState([]);
  const [currentCardNumber, setCurrentCardNumber] = useState(0);
  const [currentCardRank, setCurrentCardRank] = useState(0);
  const [previousCardRank, setPreviousCardRank] = useState(0);
  const [guess, setGuess] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const cardImage = "card-back";

  const [cardImage1, setCardImage1] = useState(cardImage);
  const [cardImage2, setCardImage2] = useState(cardImage);
  const [cardImage3, setCardImage3] = useState(cardImage);
  const [cardImage4, setCardImage4] = useState(cardImage);
  const [cardImage5, setCardImage5] = useState(cardImage);

  const sideEffectRanOnceAfterInitialRender = useRef(false);

  useEffect(() => {
    if (sideEffectRanOnceAfterInitialRender.current === false) {
      createDeckOfCards();
      sideEffectRanOnceAfterInitialRender.current = true;
    }
  })

  useEffect(() => {
    if (deckOfCards.length === 0) return

    const randomCardFromDeck = Math.floor(Math.random() * deckOfCards.length);

    setDeckOfCards(deckOfCards.filter(card => card.id !== deckOfCards[randomCardFromDeck].id))

    const selectedCard = deckOfCards[randomCardFromDeck];

    switch (currentCardNumber) {
      case 1:
        setCardImage1(`${selectedCard.suit}-${selectedCard.rank}`);
        break;
      case 2:
        setCardImage2(`${selectedCard.suit}-${selectedCard.rank}`);
        break;
      case 3:
        setCardImage3(`${selectedCard.suit}-${selectedCard.rank}`);
        break;
      case 4:
        setCardImage4(`${selectedCard.suit}-${selectedCard.rank}`);
        break;
      case 5:
        setCardImage5(`${selectedCard.suit}-${selectedCard.rank}`);
        break;
    }

    setCurrentCardRank(selectedCard.rank);
  }, [currentCardNumber])

  useEffect(() => {
    if (currentCardRank === 0) return

    if (currentCardNumber === 5) {
      setResultMessage('Congratulations. You got them all correct!');
      gameOver();
    }

    setPreviousCardRank(currentCardRank);

    if (guess === 'lower' && currentCardRank > previousCardRank) {
      showLoseMessage();
      gameOver();
    }

    if (guess === 'higher' && currentCardRank < previousCardRank) {
      showLoseMessage();
      gameOver();
    }
  }, [currentCardRank])

  const createDeckOfCards = () => {
    const cardSuits = ['spades', 'hearts', 'clubs', 'diamonds'];
    const cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    let playingCards = [];

    for (let i = 0; i < cardSuits.length; i++) {
      for (let j = 0; j < cardRanks.length; j++) {
        playingCards.push(
          {
            id: crypto.randomUUID(),
            suit: cardSuits[i],
            rank: cardRanks[j]
          }
        )
      }
    }

    setDeckOfCards(playingCards);
  }

  const handlePlayClick = () => {
    incrementCurrentCardNumber();
  }

  const handleGuessClick = (e) => {
    incrementCurrentCardNumber();
    setPreviousCardRank(currentCardRank);
    setGuess(e.target.value);
  }

  const incrementCurrentCardNumber = () => {
    setCurrentCardNumber(currentCardNumber + 1);
  }

  const showLoseMessage = () => {
    setResultMessage('Sorry, better luck next time.');
  }

  const gameOver = () => {
    setIsGameOver(true);
  }

  return (
    <div className="game-container">
      <h1>High-Low Game</h1>

      <div className="buttons-wrapper">
        <button type="button" className="button button-play" disabled={currentCardNumber !== 0 ? true : false}  onClick={() => handlePlayClick()}>Play</button>
      </div>

      <div className="buttons-wrapper">
        <button type="button" className="button button-lower" value="lower" disabled={isGameOver ? true : false} onClick={(e) => handleGuessClick(e)}>Lower</button>
        <button type="button" className="button button-higher" value="higher" disabled={isGameOver ? true : false} onClick={(e) => handleGuessClick(e)}>Higher</button>
      </div>

      <div className="card-number">
        <span className="current-card-number">{currentCardNumber}</span>/5
      </div>

      <div className="card-progress-wrapper">
        <div className="card-progress card-1">
          <div className="card">
            <div className="card-back">
              <img src={`src/img/cards/${cardImage1}.png`} alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-2">
          <div className="card">
            <div className="card-back">
              <img src={`src/img/cards/${cardImage2}.png`} alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-3">
          <div className="card">
            <div className="card-back">
              <img src={`src/img/cards/${cardImage3}.png`} alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-4">
          <div className="card">
            <div className="card-back">
              <img src={`src/img/cards/${cardImage4}.png`} alt="" />
            </div>
          </div>
        </div>

        <div className="card-progress card-5">
          <div className="card">
            <div className="card-back">
              <img src={`src/img/cards/${cardImage5}.png`} alt="" />
            </div>
          </div>
        </div>
      </div>

      <h2>{resultMessage}</h2>

      <p className="credit">Card assets are from Boardgame Pack by <a href="http://www.kenney.nl" target="_blank">Kenney</a></p>
    </div>
  )
}

export default App
