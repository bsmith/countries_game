import { Link } from "react-router-dom";

export default function NavItem ({children, ...props}) {
    return <Link {...props}>{children}</Link>;
}