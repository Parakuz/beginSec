function HighlightCard({ topic, emotion, style }) {
  let commonStyle = "bg-gray-800 p-6 rounded text-center";
  if (style) {
    commonStyle += " -translate-y-4";
  }

  const isImage =
    emotion.startsWith("/") || /\.(png|jpg|jpeg|svg|gif)$/i.test(emotion);

  const colors = ["text-red-500", "text-green-500", "text-blue-500"];

  return (
    <div className={commonStyle}>
      {isImage ? (
        <img src={emotion} alt={topic} className="w-24 h-24 mx-auto" />
      ) : (
        <div className="text-7xl flex justify-center space-l-2">
          {emotion.split("").map((char, index) => (
            <span key={index} className={colors[index % colors.length]}>
              {char}
            </span>
          ))}
        </div>
      )}
      <p className="mt-4">{topic}</p>
    </div>
  );
}

export default HighlightCard;
