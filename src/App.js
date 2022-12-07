import React, { useState, useEffect, useRef } from 'react';
import {
    createBrowserRouter, createRoutesFromElements, RouterProvider,
    Route, Outlet, Await, defer, useLoaderData
} from "react-router-dom";

import Header from './components/Header';
import HomePage from './pages/HomePage';
import CountriesPage from './pages/CountriesPage';
import GamePage from './pages/GamePage';
import './App.css';

import GameState from './models/GameState';
import * as CountriesApi from './apis/CountriesApi';

const ErrorPage = () => "Error 404";

const delay = (millis) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), millis)
    })
}

const getCountries = async () => {
    // await delay(5000);
    // return [
    //     { name: "UK", population: 1234, flag: "flag.svg" },
    //     { name: "France", population: 1500, flag: "flag.svg" },
    //     { name: "Germany", population: 1600, flag: "flag.svg" },
    //     { name: "Belgium", population: 789, flag: "flag.svg" }
    // ];
    console.log("Starting getCountries");
    const countriesPromise = CountriesApi.getCountries();
    const delayPromise = delay(2000);
    await Promise.all([countriesPromise, delayPromise]);
    console.log("Finishing getCountries");
    return countriesPromise;
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
        <button onClick={e=>document.querySelector('html').classList.toggle('enable-cheat')}/>
    </>
}

const App = () => {
    const gameStateRef = useRef(new GameState(5));
    const gameProps = { gameStateRef };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" id="root" loader={loader} element={<Root />}>
                <Route index element={<HomePage />} />
                <Route path="countries" element={<CountriesPage />} />
                <Route path="game" element={<GamePage {...gameProps} />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    );
}

export default App;
