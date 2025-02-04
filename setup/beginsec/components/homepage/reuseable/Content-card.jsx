function ContentCard({ src, alt, description, ontop }) {
  let style = "rounded overflow-hidden cursor-pointer";
  if (ontop) {
    style += " z-10";
  }

  return (
    <div className={style}>
      <img
        src={src}
        alt={alt}
        className="w-full h-60 object-cover rounded-lg"
      />
      <p className="text-center py-2 text-white">{description}</p>
    </div>
  );
}

export default ContentCard;
