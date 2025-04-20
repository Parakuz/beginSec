import NavBtn from "./reuseable/Nav_btn";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center z-10">
      <div className="flex items-center space-x-6 ml-40">
        <div className="font-bold text-xl">LOGO</div>
        <NavBtn des="/">Home</NavBtn>
        <NavBtn des="/learning-path">Learning Path</NavBtn>
        <NavBtn des="/blog">Blog</NavBtn>
        <NavBtn des="/contact">Contact</NavBtn>
      </div>
      <div className="flex items-center space-x-6 mr-40">
        <NavBtn des="/login">Login</NavBtn>
        <NavBtn
          des="/signup"
          customClass="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Sign Up
        </NavBtn>
      </div>
    </nav>
  );
}

export default Navbar;