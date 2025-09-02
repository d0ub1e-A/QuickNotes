const randomColorList: string[] = ['bg-[#08a0fe]', 'bg-[#b6f745]', 'bg-[#f9ea70]', 'bg-[#e0be8f]', 'bg-[#e0a758]', 'bg-[#13e3f4]'];

export function pickAColor(): string {
  const randomIndex = Math.floor(Math.random() * 6);
  const randomColor = randomColorList[randomIndex];

  return randomColor;
}

// Utility to get contrasting text color (black or white) based on background
export function getContrastYIQ(hexcolor: string): string {
  let hex = hexcolor.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}
