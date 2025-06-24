declare const chrome: {
  runtime: {
    onMessage: {
      addListener: (callback: (message: any, sender: any, sendResponse: () => void) => void) => void;
    };
    sendMessage: (message: any, responseCallback?: (response: any) => void) => void;
  };
};


chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
  console.log('Получено сообщение:', msg);

  if (msg.type === 'SET_FILTER') {
    const { brightness, contrast, hue } = msg.payload;

    // Удаляем старый стиль
    const oldStyle = document.getElementById('custom-filter-style');
    if (oldStyle) oldStyle.remove();

    // Создаём новый стиль
    const styleTag = document.createElement('style');
    styleTag.id = 'custom-filter-style';
    styleTag.textContent = `
      body {
        filter: brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg);
        transition: filter 0.3s ease;
      }
    `;
    document.head.appendChild(styleTag);
  }
});