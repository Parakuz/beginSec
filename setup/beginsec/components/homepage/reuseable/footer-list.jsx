function FooterList({ list }) {
  return (
    <ul className="space-y-2">
      {list.map((item, i) => (
        <li key={i}>
          <a href={item.href} className="text-gray-400 hover:text-white">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default FooterList;
