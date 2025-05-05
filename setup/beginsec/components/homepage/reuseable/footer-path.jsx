function FooterPath({ children, href }) {
  return (
    <a href={href} className="text-gray-400 hover:text-white">
      {children}
    </a>
  );
}

export default FooterPath;
