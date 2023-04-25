import './App.scss'

function App() {
  return (
    <div className="game-container">
      <h1>High-Low Game</h1>

      <div className="buttons-wrapper">
          <button type="button" className="button button-play">Play</button>
      </div>

      <div className="card-number">
          <span className="current-card-number">1</span>/5
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
