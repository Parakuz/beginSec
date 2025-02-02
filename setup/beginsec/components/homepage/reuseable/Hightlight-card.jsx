function HightlightCard({ topic, emotion, style }) {
  let commonStyle = "bg-gray-800 p-6 rounded text-center";
  if (style) {
    commonStyle += " -translate-y-4";
  }

  return (
    <div className={commonStyle}>
      <div className="text-5xl">{emotion}</div>
      <p className="mt-4">{topic}</p>
    </div>
  );
}
// 📘 Free to learn

export default HightlightCard;
