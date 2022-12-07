import { useState } from 'react';
import { Await, useRouteLoaderData, useAsyncValue } from "react-router-dom";
import styled from "styled-components";

import Country from '../components/Country';

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CountryChoice = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

const viewStateFromModel = (gameState) => {
    return {
        started: gameState.started,
        finished: gameState.isFinished(),
        readyToStart: gameState.readyToStart(),
        questionsRemaining: gameState.questionsRemaining(),
        score: gameState.score,
    }
}

export default function GamePage ({gameStateRef}) {
    const data = useRouteLoaderData('root');
    const [viewState, setViewState] = useState(viewStateFromModel(gameStateRef.current));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [message, setMessage] = useState(null);

    const syncViewState = () => {
        setViewState(viewStateFromModel(gameStateRef.current));
        setCurrentQuestion(gameStateRef.current.peekCurrentQuestion());
    };
    
    const handleStart = (e) => {
        gameStateRef.current.started = true;
        setMessage(null);
        syncViewState();
    };
    const startButton = <button onClick={handleStart}>Start</button>;

    const handleNewGame = async (e) => {
        const countries = await data.countries;
        console.log("handleNewGame got countries");
        gameStateRef.current.prepareGame(countries);
        setMessage(null);
        syncViewState();
    }
    const newGameButton = <button onClick={handleNewGame}>New Game</button>;

    const handleAnswer = (e, answer) => {
        const correct = gameStateRef.current.answerQuestion(answer);
        setMessage(correct ? "Correct!" : "Wrong");
        syncViewState();
    };

    const questionNodes = currentQuestion ?
        <CountryChoice>
            <Country key="c1" country={currentQuestion.firstCountry}>
                <button onClick={(e)=>handleAnswer(e, 1)}>Choose</button>
            </Country>
            <Country key="c2" country={currentQuestion.secondCountry}>
                <button onClick={(e)=>handleAnswer(e, 1)}>Choose</button>
            </Country>
        </CountryChoice>
        : null;

    /* Big differences depending on state */
    let viewItems = null;
    if (viewState.finished) {
        viewItems = <>
            <p>You scored {viewState.score} out of {gameStateRef.current.maxScore()}!  Well done!</p>
            { newGameButton }
        </>
    } else if (viewState.started) {
        viewItems = <>
            <p>You've scored {viewState.score} so far.  Keep going!</p>
            { questionNodes }
            { newGameButton }
        </>
    } else if (viewState.readyToStart) {
        viewItems = <>
            <p>Get ready to answer {gameStateRef.current.numberOfQuestions} questions!</p>
            <p>You'll be shown a pair of countries.  All you have to do is pick the
                country with the higher population</p>
            { startButton }
        </>
    } else {
        viewItems = <>
            <p>Are you ready to answer trivial questions about countries?</p>
            { newGameButton }
        </>
    }

    return <GameContainer>
        {/* <p><code>{JSON.stringify(gameStateRef.current)}</code></p>
        <p><code>{JSON.stringify(viewState)}</code></p>
        <p><code>{JSON.stringify(currentQuestion)}</code></p>
        <hr/> */}
        { message && <p>{message}</p> }
        { viewItems }
        {/* <p>started: {viewState.started ? "yes" : "no"}</p>
        <p>finished: {viewState.finished ? "yes" : "no"}</p>
        <p>questionsRemaining: {viewState.questionsRemaining}</p>
        <p>score: {viewState.score}</p>
        { viewState.readyToStart ? startButton : null }
        { newGameButton }
        { questionNodes } */}
    </GameContainer>
}