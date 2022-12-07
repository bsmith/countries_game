import { Link } from "react-router-dom";

export default function HomePage () {
    return <>
        <p>Ready to test your knowledge of countries?</p>
        <Link to="/game">Go to the game</Link>
    </>

}