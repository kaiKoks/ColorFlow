
chrome.storage.local.get(['brightness', 'contrast', 'hue', 'grayscale'], (result) => 
  addStyles(result.brightness, result.contrast, result.hue, result.grayscale)
)
chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {

  if (msg.type === 'SET_FILTER') {
    const { brightness, contrast, hue, grayscale } = msg.payload
    addStyles(brightness, contrast, hue, grayscale)
  }
})

function addStyles(brightness, contrast, hue, grayscale) {
  const oldStyle = document.getElementById('custom-filter-style')
  if (oldStyle) oldStyle.remove()

  // Создаём новый стиль
  const styleTag = document.createElement('style')
  styleTag.id = 'custom-filter-style'
  styleTag.textContent = `
      html, body {
        filter: brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg) grayscale(${grayscale}%) !important;
        transition: filter 0.3s ease;
      }
    `
  document.head.appendChild(styleTag)
  chrome.storage.local.set({ 'brightness': brightness, 'contrast': contrast, 'hue': hue, 'grayscale': grayscale })
}
