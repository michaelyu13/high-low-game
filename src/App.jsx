import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Game from './components/Game';
import HowToPlay from './pages/HowToPlay';
import Attribution from './components/Attribution';
import './App.css';

function App() {
    return (
        <div className="mt-4 flex min-h-screen flex-col items-center lg:pt-16">
            <Router>
                <header>
                    <h1 className="m-4 text-3xl">High-Low Game</h1>
                    <nav className="mb-8 text-gray-400">
                        <Link className="mx-4 hover:text-blue-400" to="/high-low-game/">
                            Play Game
                        </Link>
                        |
                        <Link className="mx-4 hover:text-blue-400" to="/high-low-game/how-to-play">
                            How To Play
                        </Link>
                    </nav>
                </header>

                <main className="flex-1 space-y-8">
                    <Routes>
                        <Route path="/high-low-game/" element={<Game />} />
                        <Route path="/high-low-game/how-to-play" element={<HowToPlay />} />
                    </Routes>
                </main>
            </Router>

            <Attribution />
        </div>
    );
}

export default App;
