export default function Display({ time }) {
  return (
    <h2 style={{ fontSize: "40px" }}>
      {(time / 10).toFixed(1)} mp
    </h2>
  );
}
