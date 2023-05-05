import { useState, useEffect, useRef } from 'react';
import './App.scss';

const LOCAL_STORAGE_KEY = 'highLowGame.gameStats';

function App() {
    const cardBackImage = 'card-back';
    const initialGameStats = { win: 0, lose: 0, sameCard: 0 };

    const [deckOfCards, setDeckOfCards] = useState([]);
    const [currentCardImage, setCurrentCardImage] = useState(cardBackImage);
    const [cardImages, setCardImages] = useState([]);
    const [currentCardNumber, setCurrentCardNumber] = useState(0);
    const [currentCardRank, setCurrentCardRank] = useState(0);
    const [previousCardRank, setPreviousCardRank] = useState(0);
    const [guess, setGuess] = useState('');
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [result, setResult] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [gameStats, setGameStats] = useState(initialGameStats);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isShowResult, setIsShowResult] = useState(false);

    const sideEffectRanOnceAfterInitialRender = useRef(false);

    const cardImagePath = 'src/img/cards/';
    const cardBackImageFile = `${cardImagePath + cardBackImage}.png`;
    const tryAgainMessage = 'Do\u00A0you want to try\u00A0again?';

    useEffect(() => {
        if (sideEffectRanOnceAfterInitialRender.current === false) {
            const gameStatsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

            if (gameStatsJSON != null) {
                setGameStats(JSON.parse(gameStatsJSON));
            }

            sideEffectRanOnceAfterInitialRender.current = true;
        }
    }, []);

    useEffect(() => {
        if (deckOfCards.length === 0) return;

        const randomCardFromDeck = Math.floor(Math.random() * deckOfCards.length);

        if (deckOfCards[randomCardFromDeck].rank === previousCardRank) {
            updateResult('sameCard');
        }

        setDeckOfCards(deckOfCards.filter((card) => card.id !== deckOfCards[randomCardFromDeck].id));

        const selectedCard = deckOfCards[randomCardFromDeck];
        const selectedCardImage = `${selectedCard.suit}-${selectedCard.rank}`;

        const updatedCardImages = cardImages;
        updatedCardImages.push(selectedCardImage);
        setCardImages(updatedCardImages);

        setCurrentCardImage(selectedCardImage);
        setCurrentCardRank(selectedCard.rank);
    }, [currentCardNumber]);

    useEffect(() => {
        if (currentCardRank === 0) return;

        if (
            (guess === 'lower' && currentCardRank > previousCardRank) ||
            (guess === 'higher' && currentCardRank < previousCardRank)
        ) {
            updateResult('lose');
        } else {
            if (currentCardNumber === 1) return;

            setCorrectGuesses(correctGuesses + 1);
        }
    }, [currentCardRank]);

    useEffect(() => {
        if (correctGuesses === 4) {
            updateResult('win');
        }
    }, [correctGuesses]);

    const handlePlayClick = () => {
        createDeckOfCards();
        incrementCurrentCardNumber();
        setIsGameStarted(true);
    };

    const handleGuessClick = (e) => {
        incrementCurrentCardNumber();
        setPreviousCardRank(currentCardRank);
        setGuess(e.target.value);
    };

    const handleResetGameStatsClick = () => {
        setGameStats(initialGameStats);
        localStorage.clear();
        location.reload();
    };

    const handlePlayAgainClick = () => {
        createDeckOfCards();

        setCurrentCardImage(cardBackImage);
        setCardImages([]);
        setCurrentCardNumber(1);
        setCurrentCardRank(0);
        setPreviousCardRank(0);
        setGuess('');
        setCorrectGuesses(0);
        setResult('');
        setResultMessage('');
        setIsGameOver(false);
        setIsShowResult(false);
    };

    const createDeckOfCards = () => {
        const cardSuits = ['spades', 'hearts', 'clubs', 'diamonds'];
        const cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        let playingCards = [];

        for (let i = 0; i < cardSuits.length; i++) {
            for (let j = 0; j < cardRanks.length; j++) {
                playingCards.push({
                    id: crypto.randomUUID(),
                    suit: cardSuits[i],
                    rank: cardRanks[j],
                });
            }
        }

        setDeckOfCards(playingCards);
    };

    const incrementCurrentCardNumber = () => {
        setCurrentCardNumber(currentCardNumber + 1);
    };

    const updateResult = (result) => {
        setIsGameOver(true);

        switch (result) {
            case 'win':
                setResultMessage(`Congratulations. You got them all\u00A0correct!\n${tryAgainMessage}`);
                break;
            case 'sameCard':
                setResultMessage(`Unlucky. You got the same card\u00A0rank.\n${tryAgainMessage}`);
                break;
            default:
                setResultMessage(`Sorry, you did not guess\u00A0correctly.\n${tryAgainMessage}`);
        }

        const updatedStats = gameStats;
        updatedStats[result] += 1;
        setResult(result);

        setGameStats(updatedStats);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameStats));

        setTimeout(() => {
            setIsShowResult(true);
        }, 1000);
    };

    return (
        <div className="game-container">
            <main>
                <h1 className="game-name">High-Low Game</h1>

                <section className="game-wrapper">
                    <section>
                        <img
                            className="current-card"
                            src={`${cardImagePath + currentCardImage}.png`}
                            alt=""
                            data-testid="currentCard"
                        />
                    </section>

                    <section>
                        <button
                            type="button"
                            className={`${isGameStarted && 'hide'}`}
                            value="play"
                            disabled={currentCardNumber !== 0}
                            onClick={() => handlePlayClick()}
                        >
                            Play
                        </button>

                        <button
                            type="button"
                            className={`${!isGameStarted && 'hide'}`}
                            value="lower"
                            disabled={isGameOver || currentCardRank === 1}
                            onClick={(e) => handleGuessClick(e)}
                        >
                            Lower
                        </button>
                        <button
                            type="button"
                            className={`${!isGameStarted && 'hide'}`}
                            value="higher"
                            disabled={isGameOver || currentCardRank === 13}
                            onClick={(e) => handleGuessClick(e)}
                        >
                            Higher
                        </button>
                    </section>

                    <h2
                        className={`${!isGameStarted && 'invisible'}`}
                        data-testid="currentCardNumber"
                    >{`${currentCardNumber}/5`}</h2>

                    <div className="cards-to-guess-wrapper">
                        <div className="card-wrapper">
                            <div className={`card ${cardImages[0] && 'flipped'}`}>
                                <div className="card-back">
                                    <img src={`${cardBackImageFile}`} alt="" />
                                </div>
                                <div className="card-front">
                                    <img src={`${cardImagePath}${cardImages[0] || cardBackImage}.png`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className={`card ${cardImages[1] && 'flipped'}`}>
                                <div className="card-back">
                                    <img src={`${cardBackImageFile}`} alt="" />
                                </div>
                                <div className="card-front">
                                    <img src={`${cardImagePath}${cardImages[1] || cardBackImage}.png`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className={`card ${cardImages[2] && 'flipped'}`}>
                                <div className="card-back">
                                    <img src={`${cardBackImageFile}`} alt="" />
                                </div>
                                <div className="card-front">
                                    <img src={`${cardImagePath}${cardImages[2] || cardBackImage}.png`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className={`card ${cardImages[3] && 'flipped'}`}>
                                <div className="card-back">
                                    <img src={`${cardBackImageFile}`} alt="" />
                                </div>
                                <div className="card-front">
                                    <img src={`${cardImagePath}${cardImages[3] || cardBackImage}.png`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className={`card ${cardImages[4] && 'flipped'}`}>
                                <div className="card-back">
                                    <img src={`${cardBackImageFile}`} alt="" />
                                </div>
                                <div className="card-front">
                                    <img src={`${cardImagePath}${cardImages[4] || cardBackImage}.png`} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="game-stats-wrapper" data-testid="gameStats">
                    <h2>Game Stats</h2>
                    <div className="game-stats">
                        <h3>
                            Win: <span className="stat">{gameStats.win}</span>
                        </h3>
                        <h3>
                            Drew Same Card: <span className="stat">{gameStats.sameCard}</span>
                        </h3>
                        <h3>
                            Lose: <span className="stat">{gameStats.lose}</span>
                        </h3>
                    </div>
                    <button
                        type="button"
                        disabled={isGameStarted && !isGameOver}
                        onClick={() => handleResetGameStatsClick()}
                    >
                        Reset game stats
                    </button>
                </section>
            </main>

            <footer>
                <p>
                    Card images used are from Boardgame Pack by{' '}
                    <a href="http://www.kenney.nl" target="_blank">
                        Kenney
                    </a>
                </p>
            </footer>

            <div
                className={`result ${isGameOver && result && `result--${result.toLowerCase()}`} ${
                    isShowResult && 'reveal'
                }`}
                data-testid="result"
            >
                <h2 className="result-message">{resultMessage}</h2>
                <button type="button" value="playAgain" disabled={!isGameOver} onClick={() => handlePlayAgainClick()}>
                    Play again
                </button>
            </div>
        </div>
    );
}

export default App;
