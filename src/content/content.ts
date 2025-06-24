function applyFilterToPage(brightness: number, contrast: number, hue: number) {
  const filterStyle = `
    html {
      filter:
        brightness(${brightness}%) 
        contrast(${contrast}%)
        hue-rotate(${hue}deg);
      transition: filter 0.3s ease;
    }
  `;
  let styleTag = document.getElementById('custom-filter-style');

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'custom-filter-style';
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = filterStyle;
}

// Для вызова из popup.js
window.applyFilterToPage = applyFilterToPage;