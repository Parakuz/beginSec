import Link from "next/link";

function ButtonPrimary({ children, href }) {
  return (
    <div className="flex space-x-4">
      <Link href={href}>
        <button className="bg-[#391A81] text-white px-6 py-3 rounded hover:bg-purple-700">
          {children}
        </button>
      </Link>
    </div>
  );
}

export default ButtonPrimary;
