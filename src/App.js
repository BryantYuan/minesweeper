import { useState, useEffect } from "react";
import Board from "./components/board";

function App() {
    const [realBoard, setRealBoard] = useState(null);
    const [hiddenBoard, setHiddenBoard] = useState(null);
    const [size, setSize] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    useEffect(() => {
        const getBoard = async () => {
            try {
                const res = await fetch("http://127.0.0.1:5000/getBoard", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ size }),
                });
                const data = await res.json();
                setRealBoard(data.map(row => row.map(() => 0))); // hidden to player
                setHiddenBoard(data); // actual board
            } catch (err) {
                console.error(err);
            }
        }; 
        getBoard();
    }, [size]);

    const handleTileClick = async (row, col) => {
        if (gameOver) return;

        try {
            const res = await fetch("http://127.0.0.1:5000/next-move", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ realBoard, hiddenBoard, moveRow: row, moveCol: col }),
            });
            const data = await res.json();

            if (data === false) {
                alert("💣 You hit a bomb!");
                // Reveal all bombs
                const revealBombs = hiddenBoard.map(row =>
                    row.map(cell => (cell === "B" ? "B" : 0))
                );
                setRealBoard(revealBombs);
                setGameOver(true);
                return;
            }

            //  So the goal for today is transfer everything from the pythong thingamajig ity

            setRealBoard(data);

            // Check for win
            const totalTiles = size * size;
            const bombCount = hiddenBoard.flat().filter(x => x === "B").length;
            const revealedCount = data.flat().filter(x => x !== 0).length;

            if (revealedCount === totalTiles - bombCount) {
                alert("🎉 You win!");
                setGameOver(true);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    if (!realBoard) return <p style={{ textAlign: "center" }}>Loading board...</p>;

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Minesweeper</h1>
            <Board board={realBoard} onTileClick={handleTileClick} />
            {gameOver && (
                <button
                    onClick={() => window.location.reload()}
                    style={{ marginTop: "20px" }}
                >
                    Restart Game
                </button>
            )}
        </div>
    );
}

export default App;
