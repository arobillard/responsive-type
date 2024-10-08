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

export function getScaleByValue(value) {
  return { ...defaultScaleOptions.find((opt) => opt.value == value) };
}

export const defaultMediaQueries = {
  labels: ['s', 'm', 'l', 'xl', 'xxl'],
  minWidths: ['', '45em', '60em', '90em', '120em'],
  scales: [
    defaultScaleOptions[1],
    defaultScaleOptions[2],
    defaultScaleOptions[4],
    defaultScaleOptions[5],
    defaultScaleOptions[6],
  ],
};

export function getInitialMediaQueries() {
  const mqs = [];

  for (let i = 0; i < 3; i++) {
    mqs.push({
      label: defaultMediaQueries.labels[i],
      minWidth: defaultMediaQueries.minWidths[i],
      scale: defaultMediaQueries.scales[i],
      id: i,
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

  // TODO:  This can be simplified. The / 2 / 50 is undone by the * 100
  // NOTE:  leaving this in, as possible the 50 (based on a 50rem width screen)
  //        may be something to be made customizable

  const screen_base_size = 50; // based on 50rem width screen

  const scaling_value =
    Math.round(
      ((lower_value + upper_value) / 2 / screen_base_size) * 100 * 1000
    ) / 1000;

  return `clamp(${lower_value}rem, ${scaling_value}${scalingType}, ${upper_value}rem)`;
}

export const defaultHeadings = [
  {
    tag: 'h1',
    step: 6,
    style: {
      lineHeight: 1.1,
    },
  },
  {
    tag: 'h2',
    step: 5,
    style: {
      lineHeight: 1.2,
    },
  },
  {
    tag: 'h3',
    step: 4,
    style: {
      lineHeight: 1.3,
    },
  },
  {
    tag: 'h4',
    step: 3,
  },
  {
    tag: 'h5',
    step: 2,
  },
  {
    tag: 'h6',
    step: 1,
  },
];

export function generateStyles(
  usingMediaQueries,
  lowerScale,
  upperScale,
  scalingType,
  mediaQueries
) {
  let generatedStyles = `/* ---------- Start of typography code generated by responsivetype.io ---------- */`;

  if (usingMediaQueries) {
    // Set mediaQueries headings

    mediaQueries.forEach((mq, i) => {
      // Generate all heading code at media query

      let headingsCode = ``;

      defaultHeadings.forEach((heading) => {
        if (i > 0) {
          headingsCode =
            headingsCode +
            `
  ${heading.tag} {
    font-size: ${generateFontSizeByScale(mq.scale.value, heading.step)};
  }
    `;
        } else {
          headingsCode =
            headingsCode +
            `
${heading.tag} {
  font-size: ${generateFontSizeByScale(mq.scale.value, heading.step)};
}
    `;
        }
      });

      // If not first item, include a media query
      if (i > 0) {
        generatedStyles =
          generatedStyles +
          `
/* ----- ${mq.label.toUpperCase()} | scale: ${mq.scale.value} - ${
            mq.scale.label
          } ----- */

@media only screen and (min-width: ${mq.minWidth}) {
  ${headingsCode}
}
`;
      } else {
        generatedStyles =
          generatedStyles +
          `

/* ----- ${mq.label.toUpperCase()} | scale: ${mq.scale.value} - ${
            mq.scale.label
          } ----- */
${headingsCode}
          `;
      }
    });
  } else {
    // Set clamp headings
    defaultHeadings.forEach((heading) => {
      generatedStyles =
        generatedStyles +
        `
  
${heading.tag} {
  font-size: ${generateClampedFontSize(
    lowerScale,
    upperScale,
    scalingType,
    heading.step
  )};
}
  `;
    });
  }

  generatedStyles =
    generatedStyles +
    `

/* ---------- End of typography code generated by responsivetype.io ---------- */
    `;

  return generatedStyles;
}
