export default function Control({ running, onStart, onStop, onReset }) {
  return (
    <div style={{ marginTop: 20 }}>
      {!running && (
        <button onClick={onStart} style={{ marginRight: 10 }}>
          Indítás
        </button>
      )}

      {running && (
        <button onClick={onStop} style={{ marginRight: 10 }}>
          Megállítás
        </button>
      )}

      <button onClick={onReset}>Nullázás</button>
    </div>
  );
}
