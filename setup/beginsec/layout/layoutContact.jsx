import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-500 to-purple-900 bg-opacity-25 ">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 shadow-md">
        <div className="right flex flex-col justify-evenly">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}