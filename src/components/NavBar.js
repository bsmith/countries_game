import { AwaitProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
    background-color: bisque;
    margin: 0.25rem;
    padding: 0.25rem 1rem;
    border-radius: 0.25rem;

    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: horizontal;
        gap: 1rem;
    }
`;

export default function NavBar (props) {
    const listItems = props.children.map((child, index) => <li key={index}>{child}</li>);
    return <StyledNav>
        <ul>
            { listItems }
        </ul>
    </StyledNav>
}