export function generateFontSizeByScale(scale, step, as_rem = true) {
  let font_size = 1;

  for (let i = 0; i < step; i++) {
    font_size = font_size * scale;
  }

  font_size = Math.round(font_size * 1000) / 1000;

  if (as_rem) {
    return `${font_size}rem`;
  }
  return font_size;
}

export function generateClampedFontSize(lower_scale, upper_scale, step) {
  return `clamp(
    ${generateFontSizeByScale(lower_scale, step)},
    4vw,
    ${generateFontSizeByScale(upper_scale, step)}
  )`;
}
