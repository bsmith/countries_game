export async function getCountries () {
    const data = await fetch('https://restcountries.com/v3.1/all')
        .then(resp => resp.json());
    // console.log(data[0]);
    return data.map((country) => {
        return {
            name: country.name.common,
            flag: country.flags.svg,
            population: country.population
        }
    })
}