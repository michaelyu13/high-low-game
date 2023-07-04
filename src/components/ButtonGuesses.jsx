import React, { useContext } from 'react';
import { HighLowGameContext } from '../pages/Game';

const ButtonGuesses = () => {
    const { incrementCurrentCardNumber, isGameOver, isGameStarted, currentCardRank, setGuess, setPreviousCardRank } =
        useContext(HighLowGameContext);

    const handleGuessClick = (e) => {
        incrementCurrentCardNumber();
        setPreviousCardRank(currentCardRank);
        setGuess(e.target.value);
    };

    return (
        <>
            <button
                type="button"
                className={`btn ${!isGameStarted && 'hidden'}`}
                value="lower"
                disabled={isGameOver || currentCardRank === 1}
                onClick={(e) => handleGuessClick(e)}
            >
                Lower
            </button>

            <button
                type="button"
                className={`btn ${!isGameStarted && 'hidden'}`}
                value="higher"
                disabled={isGameOver || currentCardRank === 13}
                onClick={(e) => handleGuessClick(e)}
            >
                Higher
            </button>
        </>
    );
};

export default ButtonGuesses;
