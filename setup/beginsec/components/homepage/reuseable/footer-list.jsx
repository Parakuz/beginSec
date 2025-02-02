function FooterList({ list }) {
  return (
    <ul className="space-y-2">
      {list.map((data, i) => {
        return (
          <li key={i}>
            <a href="#" className="text-gray-400 hover:text-white">
              {data}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default FooterList;
