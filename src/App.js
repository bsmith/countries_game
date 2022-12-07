import React, { useState, useEffect } from 'react';
import {
    createBrowserRouter, createRoutesFromElements, RouterProvider,
    Route, Outlet, Await, defer, useLoaderData
} from "react-router-dom";

import Header from './components/Header';
import HomePage from './pages/HomePage';
import CountriesPage from './pages/CountriesPage';
import GamePage from './pages/GamePage';
import './App.css';

const ErrorPage = () => "Error 404";

const delay = (millis) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), millis)
    })
}

const getCountries = async () => {
    console.log("Starting getCountries");
    await delay(5000);
    console.log("Finishing getCountries");
    return [ { name: "UK", population: 1234, flag: "flag.svg" } ];
};

const loader = (...args) => {
    const countriesPromise = getCountries();
    return defer({
        countries: countriesPromise
    });
}

const Root = () => {
    const data = useLoaderData();
    const fallback = <p>Fallback... please wait...</p>;
    const error = <p>error</p>;

    return <>
        <Header />
        <React.Suspense fallback={fallback}>
            {/* <Await resolve={data.countries} errorElement={error}> */}
                <Outlet />
            {/* </Await> */}
        </React.Suspense>
    </>
}

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" id="root" loader={loader} element={<Root />}>
                <Route index element={<HomePage />} />
                <Route path="countries" element={<CountriesPage />} />
                <Route path="game" element={<GamePage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    );
}

export default App;
