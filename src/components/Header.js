import styled from "styled-components";

import NavBar from "./NavBar";
import NavItem from "./NavItem";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledH1 = styled.h1`
    font-size: 4rem;
    margin: 0.25rem;
`;

export default function Header () {
    return <StyledHeader>
        <StyledH1>Population Game</StyledH1>
        <NavBar>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/countries">All Countries</NavItem>
            <NavItem to="/game">Start Game</NavItem>
            <NavItem to="/404">404</NavItem>
        </NavBar>
    </StyledHeader>
}