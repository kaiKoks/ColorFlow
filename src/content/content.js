chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {

  if (msg.type === 'SET_FILTER') {
    const { brightness, contrast, hue } = msg.payload
    addStyles(brightness, contrast, hue)
  }
})




function addStyles(brightness, contrast, hue) {
  const oldStyle = document.getElementById('custom-filter-style')
  if (oldStyle) oldStyle.remove()

  // Создаём новый стиль
  const styleTag = document.createElement('style')
  styleTag.id = 'custom-filter-style'
  styleTag.textContent = `
      body {
        filter: brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg);
        transition: filter 0.3s ease;
      }
    `
  document.head.appendChild(styleTag)
  chrome.storage.local.set({'brightness' : brightness, 'contrast': contrast, 'hue' : hue})
}
