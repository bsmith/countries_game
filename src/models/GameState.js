export default class GameState {
    constructor(numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
        this.resetState();
    }
    
    resetState() {
        this.started = false;
        this.score = 0;
        this.questions = [];
    }

    /* given a list of all the country data, make up a game */
    /* countries is [ {name, population} ] */
    prepareGame(countries) {
        const sortedCountries = [...countries];
        sortedCountries.sort((a, b) => b.population - a.population);

        this.resetState();

        while (sortedCountries.length >= 2 && this.questions.length < this.numberOfQuestions) {
            const firstIndex = Math.floor(Math.random() * sortedCountries.length);
            const [firstCountry] = sortedCountries.splice(firstIndex, 1);
            /* choose the second country to be near the first */
            const secondRange = [Math.max(0, firstIndex - 5), Math.min(firstIndex + 5 + 1, sortedCountries.length)];
            const secondIndex = Math.floor(secondRange[0] + (secondRange[1] - secondRange[0]) * Math.random());
            const [secondCountry] = sortedCountries.splice(secondIndex, 1);
            this.questions.push({ firstCountry, secondCountry });
        }
    }

    readyToStart() {
        return !this.started && this.questions.length > 0;
    }

    isFinished() {
        return this.started && this.questions.length === 0;
    }

    questionsRemaining() {
        return this.questions.length;
    }

    peekCurrentQuestion() {
        return this.questions.length ? this.questions[0] : null;
    }

    /* 1 for firstCountry, 2 for secondCountry */
    answerQuestion(answer) {
        const question = this.questions.shift();
        const correctAnswer = question.firstCountry.population > question.secondCountry.population ? 1 : 2;
        if (answer === correctAnswer) {
            this.score += 5;
            return true;
        } else {
            this.score -= 5;
            return false;
        }
    }

};