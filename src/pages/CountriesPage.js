import { Await, useRouteLoaderData, useAsyncValue } from "react-router-dom"

import CountriesBox from "../containers/CountriesBox";

const ShowCountriesBox = () => {
    const countries = useAsyncValue();
    return <CountriesBox countries={countries} />
}

export default function CountriesPage () {
    const data = useRouteLoaderData('root');

    const error = <p>Error from CountriesPage</p>

    return <>
        <Await resolve={data.countries} errorElement={error}>
            <ShowCountriesBox />
        </Await>

    </>
}