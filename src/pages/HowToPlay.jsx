export default function Rules() {
    return (
        <section className="mx-8 max-w-lg">
            <h2 className="text-2xl">How To Play</h2>
            <ol className="ol-styles mb-8 list-decimal">
                <li>Hit the "PLAY" button to start the&nbsp;game.</li>
                <li>Once the game begins, a card will be displayed to&nbsp;you.</li>
                <li>
                    Determine whether you believe the rank of the next card will be higher or lower than the current
                    card by selecting either the "HIGHER" or "LOWER"&nbsp;buttons.
                    <ul className="ul-styles">
                        <li>Remember, "Ace" cards are the lowest in value, while "King" cards are the&nbsp;highest.</li>
                    </ul>
                </li>
                <li>
                    If your guess is correct, continue playing for the next card and repeat this step until the
                    game&nbsp;ends.
                </li>
                <li>
                    The game ends if any of the following conditions are&nbsp;met:
                    <ol className="ol-styles ml-4 list-[lower-alpha]">
                        <li>
                            You lose the game&nbsp;by:
                            <ol className="ol-styles ml-4 list-[lower-roman]">
                                <li>Incorrectly guessing the card rank of the next&nbsp;card.</li>
                                <li>
                                    Being shown a card with the same rank as your current card, which is neither lower
                                    nor&nbsp;higher.
                                </li>
                            </ol>
                        </li>
                        <li>
                            You win the game&nbsp;by:
                            <ol className="ol-styles ml-4 list-[lower-roman]">
                                <li>Correctly guessing the card rank of four cards in a&nbsp;row.</li>
                            </ol>
                        </li>
                    </ol>
                </li>
                <li>
                    Once the game concludes, your result will be stored and displayed in the "Game Stats"&nbsp;section.
                </li>
                <li>
                    If you wish to play again, you can select the "PLAY AGAIN"&nbsp;button.
                    <ul className="ul-styles">
                        <li>
                            Note: Your Game Stats will be stored using the local storage of the browser on your machine,
                            unless you choose to reset and remove them using the "RESET GAME STATS"&nbsp;button.
                        </li>
                    </ul>
                </li>
            </ol>
            <p>Enjoy the game and good&nbsp;luck!</p>
        </section>
    );
}
