export default function ChoiceButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginRight: 10,
        padding: "10px 20px",
        fontSize: "18px"
      }}
    >
      {text}
    </button>
  );
}
