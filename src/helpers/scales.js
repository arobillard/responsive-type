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

export function generateClampedFontSize(
  lower_scale,
  upper_scale,
  scalingType,
  step
) {
  const lower_value = generateFontSizeByScale(lower_scale, step, false);
  const upper_value = generateFontSizeByScale(upper_scale, step, false);

  const scaling_value =
    Math.round(((lower_value + upper_value) / 2 / 50) * 100 * 1000) / 1000;

  return `clamp(${lower_value}rem, ${scaling_value}${scalingType}, ${upper_value}rem)`;
}
