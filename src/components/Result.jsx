import React, { useContext } from 'react';
import { HighLowGameContext } from '../App';

const Result = ({ handlePlayAgainClick, isShowResult, result, resultMessage }) => {
    const { isGameOver } = useContext(HighLowGameContext);

    return (
        <div
            className={`result absolute left-0 right-0 top-48 z-[-1] mx-auto w-80 space-y-8 border-4 border-solid border-white bg-rose-900 px-4 py-8 opacity-0 shadow transition-opacity duration-0 md:top-56 md:w-[520px]
                    ${isGameOver && result && `result--${result.toLowerCase()}`}
                    ${isShowResult && 'reveal'}`}
            data-testid="result"
        >
            <h2 className="whitespace-pre-wrap text-2xl">{resultMessage}</h2>
            <button
                type="button"
                className="btn"
                value="playAgain"
                disabled={!isGameOver}
                onClick={() => handlePlayAgainClick()}
            >
                Play again
            </button>
        </div>
    );
};

export default Result;
