import React from "react";
import Tile from "./tile";

export default function Board({ board, onTileClick }) {
    const size = board.length;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${size}, 50px)`,
                justifyContent: "center",
                gap: "5px",
                marginTop: "30px",
            }}
        >
            {board.map((row, r) =>
                row.map((cell, c) => (
                    <Tile key={`${r}-${c}`} value={cell} onClick={() => onTileClick(r, c)} />
                ))
            )}
        </div>
    );
}
