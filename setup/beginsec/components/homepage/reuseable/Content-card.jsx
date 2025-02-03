function ContentCard({ src, alt, description }) {
  return (
    <div className="bg-gray-700 rounded overflow-hidden">
      <img src={src} alt={alt} className="w-full h-60 object-cover" />
      <p className="text-center py-2 text-white bg-gray-800">{description}</p>
    </div>
  );
}

export default ContentCard;
