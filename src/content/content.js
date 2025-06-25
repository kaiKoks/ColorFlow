
chrome.storage.local.get(['brightness', 'contrast', 'hue', 'grayscale', 'saturation'], (result) =>
  addStyles(result.brightness, result.contrast, result.hue, result.grayscale, result.saturation)
)
chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {

  if (msg.type === 'SET_FILTER') {
    const { brightness, contrast, hue, grayscale, saturation } = msg.payload
    addStyles(brightness, contrast, hue, grayscale, saturation)
  }
})

function addStyles(brightness, contrast, hue, grayscale, saturation) {
  document.querySelector('html')
    .style.setProperty('filter', `
      brightness(${brightness}%)
      contrast(${contrast}%)
      hue-rotate(${hue}deg)
      grayscale(${grayscale}%)
      saturate(${saturation}%)
    `)
  chrome.storage.local.set({ 'brightness': brightness, 'contrast': contrast, 'hue': hue, 'grayscale': grayscale, 'saturation': saturation })
}
