function NavBtn ({children,des, customClass = "hover:text-purple-400" }){
    return <a href={des} className={`text-sm font-medium ${customClass}`}>{children}</a>
}

export default NavBtn