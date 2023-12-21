export function generateFontSizeByScale(scale, step, as_rem = true) {
  let font_size = 1;

  for (let i = 0; i < step; i++) {
    font_size = font_size * scale;
  }

  font_size = Math.round(font_size * 1000) / 1000;

  if (as_rem) {
    return `${font_size}rem`;
  }
}
