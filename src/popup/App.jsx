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
        <div className="w-64 p-3 bg-[#0d0f13] text-[#F0F3BD] flex flex-col font-bold saturate-125  ">
            <h1 className="text-xl mb-3">Settings</h1>

            <div className="mb-3">
                <label className="block text-sm">Brightness: {brightness}%</label>
                <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full appearance-none h-2 bg-[#3b0fa1] rounded-3xl accent-[#FAFFFD]"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm ">Contrast: {contrast}%</label>
                <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full appearance-none h-2 bg-[#3b0fa1] rounded-3xl accent-[#FAFFFD]"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Hue: {hue}°</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="w-full appearance-none h-2 bg-[#3b0fa1] rounded-3xl accent-[#FAFFFD]"
                />
            </div>
            <div className="mb-5">
                <label className="block text-sm">Grayscale: {grayscale}%</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={grayscale}
                    onChange={(e) => setGrayscale(Number(e.target.value))}
                    className="w-full appearance-none h-2  bg-[#3b0fa1] rounded-3xl accent-[#FAFFFD]"
                />
            </div>
            <button
                onClick={reset}
                className="w-full h-9 py-2 bg-[#3e159d] hover:bg-[#3b0fa1] rounded-3xl"
            >
                Reset
            </button>
        </div>
    )
}
const root = createRoot(document.getElementById('root'))
root.render(<App />)