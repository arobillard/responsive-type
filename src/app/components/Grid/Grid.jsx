import grid from './grid.module.css';

export default function Grid({ children, cols, gap, padding, style }) {
  return (
    <div
      className={grid.grid}
      style={{ ...style, '--cols': cols, '--gap': gap, '--padding': padding }}
    >
      {children}
    </div>
  );
}
