export const defaultScaleOptions = [
  { value: 1.067, label: 'Minor Second' },
  { value: 1.125, label: 'Major Second' },
  { value: 1.2, label: 'Minor Third' },
  { value: 1.25, label: 'Major Third' },
  { value: 1.333, label: 'Perfect Fourth' },
  { value: 1.414, label: 'Augmented Fourth' },
  { value: 1.5, label: 'Perfect Fifth' },
  { value: 1.618, label: 'Golden Ratio' },
];

function getScaleByValue(value) {
  return defaultScaleOptions.filter(opt);
}

export const defaultMediaQueries = {
  labels: ['s', 'm', 'l', 'xl', 'xxl'],
  minWidths: [null, '45em', '60em', '90em', '120em'],
  scales: [
    defaultScaleOptions[1],
    defaultScaleOptions[2],
    defaultScaleOptions[4],
    defaultScaleOptions[5],
    defaultScaleOptions[6],
  ],
};

export function getDefaultMediaQueries() {
  const mqs = [];

  console.log(defaultMediaQueries);

  for (let i = 0; i < 3; i++) {
    mqs.push({
      label: defaultMediaQueries.labels[i],
      minWidth: defaultMediaQueries.minWidths[i],
      scale: defaultMediaQueries.scales[i],
    });
  }

  return mqs;
}

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

  // TODO: This can be simplified. The / 2 / 50 is undone by the * 100
  const scaling_value =
    Math.round(((lower_value + upper_value) / 2 / 50) * 100 * 1000) / 1000;

  return `clamp(${lower_value}rem, ${scaling_value}${scalingType}, ${upper_value}rem)`;
}
