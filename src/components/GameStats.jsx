import React, { useContext } from 'react';
import { HighLowGameContext } from './Game';

const GameStats = ({ gameStats, setGameStats, initialGameStats }) => {
    const { isGameStarted, isGameOver } = useContext(HighLowGameContext);

    const handleResetGameStatsClick = () => {
        setGameStats(initialGameStats);
        localStorage.clear();
    };

    return (
        <section className="mx-auto max-w-lg space-y-4 md:mt-16" data-testid="gameStats">
            <h2 className="text-2xl">Game Stats</h2>
            <div className="flex justify-around text-lg">
                <h3>
                    Win: <span className="stat-number">{gameStats.win}</span>
                </h3>
                <h3>
                    Drew Same Card: <span className="stat-number">{gameStats.sameCard}</span>
                </h3>
                <h3>
                    Lose: <span className="stat-number">{gameStats.lose}</span>
                </h3>
            </div>
            <button
                type="button"
                className="btn"
                disabled={isGameStarted && !isGameOver}
                onClick={() => handleResetGameStatsClick()}
            >
                Reset game stats
            </button>
        </section>
    );
};

export default GameStats;
