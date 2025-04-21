import NavBtn from "./reuseable/Nav_btn";

function NavbarSection() {
  return (
    <div className="font-bold text-4xl text-white flex space-x-4 pt-16">
      <NavBtn des="/profile">Profile</NavBtn>
      <NavBtn des="/profile/stat">Stats</NavBtn>
      <NavBtn des="/profile/badge">Badges and Certifications</NavBtn>
      <NavBtn des="/profile/profilesetting">Profile Settings</NavBtn>
    </div>
  );
}

export default NavbarSection;
