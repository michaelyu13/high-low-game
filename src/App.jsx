import { useState, useEffect, useRef } from 'react'
import './App.scss'

function App() {
  const cardBackImage = "card-back";

  const [deckOfCards, setDeckOfCards] = useState([]);
  const [currentCardImage, setCurrentCardImage] = useState(cardBackImage);
  const [cardImage1, setCardImage1] = useState('');
  const [cardImage2, setCardImage2] = useState('');
  const [cardImage3, setCardImage3] = useState('');
  const [cardImage4, setCardImage4] = useState('');
  const [cardImage5, setCardImage5] = useState('');
  const [currentCardNumber, setCurrentCardNumber] = useState(0);
  const [currentCardRank, setCurrentCardRank] = useState(0);
  const [previousCardRank, setPreviousCardRank] = useState(0);
  const [guess, setGuess] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);

  useEffect(() => {
    if (deckOfCards.length === 0) return

    const randomCardFromDeck = Math.floor(Math.random() * deckOfCards.length);

    if (deckOfCards[randomCardFromDeck].rank === previousCardRank) {
      setResultMessage('Unlucky. You got the same card\u00A0rank.');
      gameOver();
    }

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

    setCurrentCardImage(`${selectedCard.suit}-${selectedCard.rank}`);
    setCurrentCardRank(selectedCard.rank);
  }, [currentCardNumber])

  useEffect(() => {
    if (currentCardRank === 0) return

    if (guess === 'lower' && currentCardRank > previousCardRank
      || guess === 'higher' && currentCardRank < previousCardRank
    ) {
      setResultMessage('Sorry, better luck next\u00A0time.');
      gameOver();
    } else {
      setCorrectGuesses(currentCardNumber - 1);
    }
  }, [currentCardRank])

  useEffect(() => {
    if (correctGuesses === 4) {
      setResultMessage('Congratulations. You got them all\u00A0correct!');
      setIsGameWon(true);
      gameOver();
    }
  }, [correctGuesses])

  const handlePlayClick = () => {
    createDeckOfCards();
    incrementCurrentCardNumber();
    setIsGameStarted(true);
  }

  const handleGuessClick = (e) => {
    incrementCurrentCardNumber();
    setPreviousCardRank(currentCardRank);
    setGuess(e.target.value);
  }

  const handlePlayAgainClick = () => {
    createDeckOfCards();

    setCurrentCardImage(cardBackImage);
    setCardImage1('');
    setCardImage2('');
    setCardImage3('');
    setCardImage4('');
    setCardImage5('');
    setCurrentCardNumber(1);
    setCurrentCardRank(0);
    setPreviousCardRank(0);
    setGuess('');
    setCorrectGuesses(0);
    setResultMessage('');
    setIsGameOver(false);
    setIsGameWon(false);
    setIsShowResult(false);
  }

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

  const incrementCurrentCardNumber = () => {
    setCurrentCardNumber(currentCardNumber + 1);
  }

  const gameOver = () => {
    setIsGameOver(true);

    setTimeout(() => {
      setIsShowResult(true);
    }, 1000);
  }

  return (
    <div className="game-container">
      <div className="game-wrapper">
        <h1>High-Low Game</h1>

        <section>
          <img className="current-card" src={`src/img/cards/${currentCardImage}.png`} alt="" />
        </section>

        <section className='buttons-wrapper'>
          <button type="button" className={`${isGameStarted ? "hide" : null }`} disabled={currentCardNumber !== 0 ? true : false} onClick={() => handlePlayClick()}>PLAY</button>

          <button type="button" className={`${isGameStarted ? null : "hide" }`} value="lower" disabled={isGameOver || currentCardRank === 1 ? true : false} onClick={(e) => handleGuessClick(e)}>LOWER</button>
          <button type="button" className={`${isGameStarted ? null : "hide" }`} value="higher" disabled={isGameOver || currentCardRank === 13 ? true : false} onClick={(e) => handleGuessClick(e)}>HIGHER</button>
        </section>

        <h2 className={`${isGameStarted ? null : "invisible"}`}>{currentCardNumber}/5</h2>

        <section className="card-progress-wrapper">
          <div className="card-wrapper">
            <div className={`card ${cardImage1 ? "flipped" : null }`}>
              <div className="card-back">
                <img src="src/img/cards/card-back.png" alt="" />
              </div>
              <div className="card-front">
                <img src={`src/img/cards/${cardImage1}.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="card-wrapper">
            <div className={`card ${cardImage2 ? "flipped" : null}`}>
              <div className="card-back">
                <img src="src/img/cards/card-back.png" alt="" />
              </div>
              <div className="card-front">
                <img src={`src/img/cards/${cardImage2}.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="card-wrapper">
            <div className={`card ${cardImage3 ? "flipped" : null}`}>
              <div className="card-back">
                <img src="src/img/cards/card-back.png" alt="" />
              </div>
              <div className="card-front">
                <img src={`src/img/cards/${cardImage3}.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="card-wrapper">
            <div className={`card ${cardImage4 ? "flipped" : null}`}>
              <div className="card-back">
                <img src="src/img/cards/card-back.png" alt="" />
              </div>
              <div className="card-front">
                <img src={`src/img/cards/${cardImage4}.png`} alt="" />
              </div>
            </div>
          </div>

          <div className="card-wrapper">
            <div className={`card ${cardImage5 ? "flipped" : null}`}>
              <div className="card-back">
                <img src="src/img/cards/card-back.png" alt="" />
              </div>
              <div className="card-front">
                <img src={`src/img/cards/${cardImage5}.png`} alt="" />
              </div>
            </div>
          </div>
        </section>

        <div className={`result ${isGameWon ? "result--win" : null} ${isShowResult ? "reveal" : null}`}>
          <h2>{resultMessage}</h2>
          <button type="button" disabled={isGameOver ? false : true} onClick={() => handlePlayAgainClick()}>PLAY AGAIN</button>
        </div>

        <p className="credit">Card assets are from Boardgame Pack by <a href="http://www.kenney.nl" target="_blank">Kenney</a></p>
      </div>
    </div>
  )
}

export default App
