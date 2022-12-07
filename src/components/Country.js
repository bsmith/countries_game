import styled from "styled-components";

const CountryDiv = styled.div`
    
`;

const Flag = styled.img`
    height: 10rem;
`;

const Name = styled.div`
    
`;

const Population = styled.div`
    display: none;
`

export default function Country ({country, children}) {
    if (!country)
        country = { name: undefined, population: 0, flag: "about:blank" };
    return <CountryDiv>
        <Flag src={country.flag} alt={`Flag of ${country.name}`} />
        <Name>{country.name}</Name>
        <Population className="cheat">{country.population}</Population>
        {children}
    </CountryDiv>
}