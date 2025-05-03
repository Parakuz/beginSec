function Detail({ children, className = "" }) {
  return <p className={`text-gray-400 mb-6 ${className}`}>{children}</p>;
}

export default Detail;
