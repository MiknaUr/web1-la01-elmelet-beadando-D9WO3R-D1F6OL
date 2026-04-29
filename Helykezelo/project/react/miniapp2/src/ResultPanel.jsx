export default function ResultPanel({ player, computer, result }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h2>Te: {player ?? "-"}</h2>
      <h2>Számítógép: {computer ?? "-"}</h2>
      <h1 style={{ marginTop: 20 }}>{result}</h1>
    </div>
  );
}
