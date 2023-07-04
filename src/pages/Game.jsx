import React, { useState, useEffect, useRef } from 'react';
import Cards from '../components/Cards';
import CurrentCard from '../components/CurrentCard';
import CurrentCardNumber from '../components/CurrentCardNumber';
import GameButtons from '../components/GameButtons';
import GameStats from '../components/GameStats';
import Result from '../components/Result';

import '../App.css';

export const HighLowGameContext = React.createContext();

function App() {
    const LOCAL_STORAGE_KEY = 'highLowGame.gameStats';
    const CARD_IMAGE_PATH = 'src/img/cards/';
    const CARD_BACK_IMAGE = 'card-back';
    const TOTAL_CARDS_TO_PLAY = 5;

    const initialGameStats = { win: 0, lose: 0, sameCard: 0 };

    const [deckOfCards, setDeckOfCards] = useState([]);
    const [currentCardImage, setCurrentCardImage] = useState(CARD_BACK_IMAGE);
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

    useEffect(() => {
        if (sideEffectRanOnceAfterInitialRender.current === false) {
            createCardsToGuess();

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
        updatedCardImages[currentCardNumber - 1].card = selectedCardImage;
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

            setCorrectGuesses((prevCorrectGuesses) => prevCorrectGuesses + 1);
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

    const handlePlayAgainClick = () => {
        createCardsToGuess();
        createDeckOfCards();

        setCurrentCardImage(CARD_BACK_IMAGE);
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

    const createCardsToGuess = () => {
        let cardsToGuess = [];

        for (let i = 0; i < TOTAL_CARDS_TO_PLAY; i++) {
            cardsToGuess.push({
                id: i,
                card: CARD_BACK_IMAGE,
            });
        }

        setCardImages(cardsToGuess);
    };

    const createDeckOfCards = () => {
        const cardSuits = ['spades', 'hearts', 'clubs', 'diamonds'];
        const cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        let playingCards = [];

        cardSuits.forEach((cardSuit) => {
            cardRanks.forEach((cardRank) => {
                playingCards.push({
                    id: `${cardSuit}-${cardRank}`,
                    suit: cardSuit,
                    rank: cardRank,
                });
            });
        });

        setDeckOfCards(playingCards);
    };

    const incrementCurrentCardNumber = () => {
        setCurrentCardNumber((prevCurrentCardNumber) => prevCurrentCardNumber + 1);
    };

    const updateResult = (result) => {
        setIsGameOver(true);

        const TRY_AGAIN_MESSAGE = 'Do\u00A0you want to try\u00A0again?';

        switch (result) {
            case 'win':
                setResultMessage(`Congratulations. You got them all\u00A0correct!\n${TRY_AGAIN_MESSAGE}`);
                break;
            case 'sameCard':
                setResultMessage(`Unlucky. You got the same card\u00A0rank.\n${TRY_AGAIN_MESSAGE}`);
                break;
            default:
                setResultMessage(`Sorry, you did not guess\u00A0correctly.\n${TRY_AGAIN_MESSAGE}`);
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

    const highLowGameContextValue = {
        CARD_IMAGE_PATH,
        currentCardNumber,
        currentCardRank,
        handlePlayClick,
        incrementCurrentCardNumber,
        isGameOver,
        isGameStarted,
        setGuess,
        setIsGameStarted,
        setPreviousCardRank,
    };

    return (
        <HighLowGameContext.Provider value={highLowGameContextValue}>
            <section className="mx-4 space-y-4 border-4 border-double border-white p-4 md:mx-8 md:p-8">
                <CurrentCard currentCardImage={currentCardImage} />
                <GameButtons />
                <CurrentCardNumber totalCardsToPlay={TOTAL_CARDS_TO_PLAY} />
                <Cards cardImages={cardImages} cardBackImage={CARD_BACK_IMAGE} />
            </section>

            <GameStats gameStats={gameStats} setGameStats={setGameStats} initialGameStats={initialGameStats} />
            <Result
                handlePlayAgainClick={handlePlayAgainClick}
                isShowResult={isShowResult}
                result={result}
                resultMessage={resultMessage}
            />
        </HighLowGameContext.Provider>
    );
}

export default App;
