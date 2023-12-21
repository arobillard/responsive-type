import { useState } from 'react';

export default function Controls({ scale, setScale }) {
  const scaleOptions = [
    { value: 1.067, label: 'Minor Second' },
    { value: 1.125, label: 'Major Second' },
    { value: 1.2, label: 'Minor Third' },
    { value: 1.25, label: 'Major Third' },
    { value: 1.333, label: 'Perfect Fourth' },
    { value: 1.414, label: 'Augmented Fourth' },
    { value: 1.5, label: 'Perfect Fifth' },
    { value: 1.618, label: 'Golden Ratio' },
  ];

  return (
    <section>
      <h2>Controls</h2>

      <label htmlFor="scale">Scale</label>
      <select
        name="scale"
        id="scale"
        onChange={(e) => setScale(e.target.value)}
        value={scale}
      >
        {scaleOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {value} – {label}
          </option>
        ))}
      </select>
    </section>
  );
}
