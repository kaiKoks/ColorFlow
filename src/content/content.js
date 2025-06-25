
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
  document.querySelector('html')
    .style.setProperty('filter', `
      brightness(${brightness}%)
      contrast(${contrast}%)
      hue-rotate(${hue}deg)
      grayscale(${grayscale}%)
    `)
  chrome.storage.local.set({ 'brightness': brightness, 'contrast': contrast, 'hue': hue, 'grayscale': grayscale })
}
