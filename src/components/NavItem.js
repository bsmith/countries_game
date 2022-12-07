import { NavLink } from "react-router-dom";

export default function NavItem ({children, ...props}) {
    return <NavLink {...props}>{children}</NavLink>;
}