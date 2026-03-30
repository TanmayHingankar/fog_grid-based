// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getBaseGrid } from './pattern';
import './index.css';

const MIN_ROWS = 5;
const MIN_COLS = 5;

function App() {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(10);

    const [inputRows, setInputRows] = useState(rows);
    const [inputCols, setInputCols] = useState(cols);

    const [running, setRunning] = useState(false);
    const [tick, setTick] = useState(0);

    const timer = useRef();

    useEffect(() => {
        if (running) {
            timer.current = setInterval(() => setTick(t => t + 1), 300);
        } else {
            clearInterval(timer.current);
        }
        return () => clearInterval(timer.current);
    }, [running]);

    useEffect(() => {
        setTick(0);
    }, [rows, cols]);

    const handleStart = () => {
        setRows(Math.max(MIN_ROWS, inputRows));
        setCols(Math.max(MIN_COLS, inputCols));
        setRunning(true);
    };

    const handleStop = () => {
        setRunning(false);
    };

    const grid = getBaseGrid(rows, cols);

    // Red zigzag animation (coming downwards)
    const redPositions = new Set();
    for (let r = 1; r < rows - 1; r++) {
        const period = cols * 2;
        const pos = (tick + ((rows - 1) - r)) % period; // flip row index
        let c;
        if (pos < cols) {
            c = pos;
        } else {
            c = period - pos;
        }
        redPositions.add(`${r},${c}`);
    }

    return (
        <div className="app-container">
            <h2 className="title">Pattern Grid</h2>
            <div className="controls">
                <label>
                    Rows:
                    <input
                        type="number"
                        min={MIN_ROWS}
                        value={inputRows}
                        onChange={e => setInputRows(+e.target.value)}
                    />
                </label>
                <label>
                    Columns:
                    <input
                        type="number"
                        min={MIN_COLS}
                        value={inputCols}
                        onChange={e => setInputCols(+e.target.value)}
                    />
                </label>
                <button className="start-btn" onClick={handleStart}>Start</button>
                <button className="stop-btn" onClick={handleStop}>Stop</button>
            </div>

            <div
                className="grid-container"
                style={{
                    gridTemplateRows: `repeat(${rows}, 30px)`,
                    gridTemplateColumns: `repeat(${cols}, 30px)`
                }}
            >
                {grid.flat().map((cell, idx) => {
                    const [r, c] = cell.label.split(',').map(Number);
                    const zeroBasedKey = `${r - 1},${c - 1}`;
                    const isRed = redPositions.has(zeroBasedKey);

                    const className = isRed
                        ? "cell red"
                        : cell.type === 'green'
                            ? "cell green"
                            : cell.type === 'blue'
                                ? "cell blue"
                                : "cell";

                    return (
                        <div key={idx} className={className}>
                            {cell.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
