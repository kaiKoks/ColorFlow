import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"


function App() {
    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)
    const [hue, setHue] = useState(0)
    const [grayscale, setGrayscale] = useState(0)

    const applyFilter = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            chrome.tabs.sendMessage(tab.id, {
                type: 'SET_FILTER',
                payload: { brightness, contrast, hue, grayscale }
            });
        });
    }
    const reset = () => {
        setBrightness(100)
        setContrast(100)
        setHue(0)
        setGrayscale(0)
        applyFilter()
    }
    const load = () => {
        try {
            chrome.storage.local.get(['brightness', 'contrast', 'hue', 'grayscale'], (result) => {
                setBrightness(result.brightness)
                setContrast(result.contrast)
                setHue(result.hue)
                setGrayscale(result.grayscale)
            });
        }
        catch (err) {
            console.error(err)
        }
    }
    useEffect(() => { load() }, [])
    useEffect(() => { applyFilter() }, [brightness, contrast, hue, grayscale])

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
                    className="w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm mb-1">grayscale: {grayscale}%</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={grayscale}
                    onChange={(e) => setGrayscale(Number(e.target.value))}
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
const root = createRoot(document.getElementById('root'))
root.render(<App />)