import { render, fireEvent, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
    test('Play button is displayed and not disabled', () => {
        render(<App />);
        const playButtonEl = screen.getByRole('button', { name: /^play$/i });

        expect(playButtonEl).toBeInTheDocument();
        expect(playButtonEl).not.toBeDisabled();
    });

    test('Reset Game Stats button is displayed and not disabled', () => {
        render(<App />);
        const resetGameStatsButtonEl = screen.getByRole('button', { name: /^reset game stats$/i });

        expect(resetGameStatsButtonEl).toBeInTheDocument();
        expect(resetGameStatsButtonEl).not.toBeDisabled();
    });

    test('Current card is shown', () => {
        render(<App />);
        const currentCard = screen.getByTestId('currentCard');
        expect(currentCard).toBeInTheDocument();
    });

    test('5 cards to guess are shown', () => {
        const { container } = render(<App />);
        const cardsToGuess = container.getElementsByClassName('card-wrapper');

        expect(cardsToGuess).toHaveLength(5);
    });

    test('Game Stats section is shown', () => {
        render(<App />);
        const gameStats = screen.getByTestId('gameStats');
        expect(gameStats).toBeInTheDocument();
    });

    test('Lower and Higher button are not displayed', () => {
        render(<App />);
        const lowerButtonEl = screen.getByRole('button', { name: /^lower$/i });
        const higherButtonEl = screen.getByRole('button', { name: /^higher$/i });

        expect(lowerButtonEl).toHaveClass('hide');
        expect(higherButtonEl).toHaveClass('hide');
    });

    test('Result reveal is not displayed', () => {
        render(<App />);
        const revealEl = screen.getByTestId('result');
        expect(revealEl).not.toHaveClass('reveal');
    });

    test('Play button starts the game', () => {
        render(<App />);
        const playButtonEl = screen.getByRole('button', { name: /^play$/i });

        fireEvent.click(playButtonEl);

        const lowerButtonEl = screen.getByRole('button', { name: /^lower$/i });
        const higherButtonEl = screen.getByRole('button', { name: /^higher$/i });
        const currentCardNumberEl = screen.getByTestId('currentCardNumber');
        const resetGameStatsButtonEl = screen.getByRole('button', {
            name: /^reset game stats$/i,
        });

        expect(playButtonEl).toBeDisabled;
        expect(playButtonEl).toHaveClass('hide');
        expect(lowerButtonEl).toBeInTheDocument();
        expect(higherButtonEl).toBeInTheDocument();
        expect(currentCardNumberEl.textContent).toMatch('1/5');
        expect(resetGameStatsButtonEl).toBeDisabled();
    });
});
