import React from "react";

export default function Tile({ value, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: "green",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
            }}
        >
            {value !== 0 ? value : ""}
        </button>
    );
}
