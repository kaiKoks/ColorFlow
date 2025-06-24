import React, { useState } from "react"
import { createRoot } from "react-dom/client"

declare const chrome: {
    tabs: {
        query: (
            properties: { active: boolean; currentWindow: boolean },
            callback: (tabs: Array<{ id: number }>) => void
        ) => void
    }
    scripting: {
        executeScript: (
            details: {
                target: { tabId: number }
                func: string | Function
                args?: any[]
            },
            callback?: () => void
        ) => void
    }
}

function App() {
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [hue, setHue] = useState(0);

    const applyFilter = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: applyFilterToPage,
                args: [brightness, contrast, hue],
            });
        });
    };
    const reset = () => {
        setBrightness(100);
        setContrast(100);
        setHue(0);
        applyFilter();
    };

    return (
        <div className="w-64 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <h1 className="text-lg font-bold mb-4">Настройки фильтра</h1>

            <div className="mb-3">
                <label className="block text-sm mb-1">Яркость: {brightness}%</label>
                <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    onInput={applyFilter}
                    className="w-full"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm mb-1">Контраст: {contrast}%</label>
                <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    onInput={applyFilter}
                    className="w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1">Оттенок: {hue}°</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    onInput={applyFilter}
                    className="w-full"
                />
            </div>

            <button
                onClick={reset}
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
                Сбросить
            </button>
        </div>
    )
}
const root = createRoot(document.getElementById('root')!)
root.render(<App />)