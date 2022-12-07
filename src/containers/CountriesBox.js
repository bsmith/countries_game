import styled from "styled-components";

import Country from "../components/Country";

const CountriesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    * {
        transform: rotate(2.5deg);
    }
`

export default function CountriesBox ({countries}) {
    // return <p><code>{JSON.stringify(countries)}</code></p>
    const items = countries.map((country, index) => <Country key={index} country={country} />);
    return <CountriesContainer>
        { items }
    </CountriesContainer>
}