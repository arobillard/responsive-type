import controls from './controls.module.css';

export default function Controls({
  scalingType,
  setScalingType,
  lowerScale,
  setLowerScale,
  upperScale,
  setUpperScale,
  sentence,
  setSentence,
  paragraph,
  setParagraph,
}) {
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
    <section id="controls" className={controls.controls}>
      <h2 className={controls.controls_heading}>Controls</h2>

      <div className={controls.grid_unit}>
        <label htmlFor="scaling-type">Scaling Type</label>
        <select
          name="scaling-type"
          id="scaling-type"
          onChange={(e) => setScalingType(e.target.value)}
          value={scalingType}
        >
          <option value="cqi">cqi</option>
          <option value="vw">vw</option>
        </select>
      </div>
      <div className={controls.grid_unit}>
        <label htmlFor="lower-scale">Lower Scale</label>
        <select
          name="lower-scale"
          id="lower-scale"
          onChange={(e) => setLowerScale(e.target.value)}
          value={lowerScale}
        >
          {scaleOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {value} – {label}
            </option>
          ))}
        </select>
      </div>
      <div className={controls.grid_unit}>
        <label htmlFor="upper-scale">Upper Scale</label>
        <select
          name="upper-scale"
          id="upper-scale"
          onChange={(e) => setUpperScale(e.target.value)}
          value={upperScale}
        >
          {scaleOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {value} – {label}
            </option>
          ))}
        </select>
      </div>

      <h3 class={controls.controls_heading}>Content</h3>
      <div className={controls.grid_unit}>
        <label htmlFor="sentence">Heading</label>
        <input
          type="text"
          id="sentence"
          name="sentence"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        />
      </div>
      <div className={controls.grid_unit}>
        <label htmlFor="paragraph">Paragraph</label>
        <textarea
          id="paragraph"
          name="paragraph"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        />
      </div>
    </section>
  );
}
