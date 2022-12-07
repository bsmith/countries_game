import { useState } from 'react';
import { Await, useRouteLoaderData, useAsyncValue } from "react-router-dom"

const viewStateFromModel = (gameState) => {
    return {
        started: gameState.started,
        finished: gameState.isFinished(),
        readyToStart: gameState.readyToStart(),
        questionsRemaining: gameState.questionsRemaining(),
        score: gameState.score,
    }
}

const Country = ({num, country}) => {
    if (!country)
        return <p>{num}: undefined</p>
    return <p>{num}: {country.name} {country.population}</p>
};

export default function GamePage ({gameStateRef}) {
    const data = useRouteLoaderData('root');
    const [viewState, setViewState] = useState(viewStateFromModel(gameStateRef.current));
    const syncViewState = () => setViewState(viewStateFromModel(gameStateRef.current));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [message, setMessage] = useState(null);

    const handleStart = (e) => {
        gameStateRef.current.started = true;
        setCurrentQuestion(gameStateRef.current.peekCurrentQuestion());
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
    const AnswerButton = ({answer}) => (<button onClick={(e)=>handleAnswer(e, answer)}>Answer {answer}</button>);

    const questionNodes = currentQuestion ?
        <>
            <Country key="c1" num={1} country={currentQuestion.firstCountry} />
            <Country key="c2" num={2} country={currentQuestion.secondCountry} />
            <AnswerButton key="b1" answer={1} />
            <AnswerButton key="b2" answer={2} />
        </>
        : null;

    return <>
        <p><code>{JSON.stringify(gameStateRef.current)}</code></p>
        <p><code>{JSON.stringify(viewState)}</code></p>
        <p><code>{JSON.stringify(currentQuestion)}</code></p>
        <hr/>
        { message && <p>{message}</p> }
        <p>started: {viewState.started ? "yes" : "no"}</p>
        <p>finished: {viewState.finished ? "yes" : "no"}</p>
        <p>questionsRemaining: {viewState.questionsRemaining}</p>
        <p>score: {viewState.score}</p>
        { viewState.readyToStart ? startButton : null }
        {/* { !viewState.started && !viewState.readyToStart ? newGameButton : null } */}
        { newGameButton }
        { questionNodes }
    </>
}