function ContentCard({ src, alt, description, ontop }) {
  let style = "bg-gray-700 p-6 rounded";
  if (ontop) {
    style += " z-10";
  }

  return (
    <div className={style}>
      <img
        src={src}
        alt={alt}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <p className="text-center">{description}</p>
    </div>
  );
}

export default ContentCard;
