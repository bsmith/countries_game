import { Await, useRouteLoaderData } from "react-router-dom"

export default function CountriesPage () {
    const data = useRouteLoaderData('root');

    const error = <p>Error from CountriesPage</p>

    return <>
        <p>Countries page</p>
        <Await resolve={data.countries} errorElement={error}>
            { countries => <p><code>{JSON.stringify(countries)}</code></p> }
        </Await>

    </>
}