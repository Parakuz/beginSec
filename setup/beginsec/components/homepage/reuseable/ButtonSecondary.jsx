import Link from "next/link";

function ButtonSecondary({ children, href }) {
  return (
    <Link href={href}>
      <button className="border border-white px-6 py-3 rounded hover:bg-gray-700">
        {children}
      </button>
    </Link>
  );
}

export default ButtonSecondary;
