function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function arrayCheckEquals(array1, array2) {
    if ((!array1) || (!array2)) {
        return false;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0, l = array1.length; i < l; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}

function generateEasyNumbers(numbersWanted) {
    let allNumbers = [];

    for (let i = 0; i < numbersWanted; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        if (allNumbers.includes(randNumber)) {
            i--;
        } else {
            allNumbers.push(randNumber);
        }
    }

    return allNumbers;
}

function generateNegativeNumbers(numbersWanted) {
    let allNumbers = [];

    for (let i = 0; i < numbersWanted; i++) {
        let randNumber = Math.floor(Math.random() * 201) - 100;

        if (allNumbers.includes(randNumber)) {
            i--;
        } else {
            allNumbers.push(randNumber);
        }
    }

    return allNumbers;
}

function generateHardNumbers(numbersWanted){
    let randNumber = '';
    let allNumbers = [];
    let numberSelect = Math.floor(Math.random() * 10);

    for (let i = 0; i < numbersWanted; i++) {
        let rand1in11chance = Math.floor(Math.random() * 11);

        if (rand1in11chance === 10) {
            randNumber = numberSelect;
        } else {
            let randSecondNumber = Math.floor(Math.random() * 10);

            randNumber = parseInt(`${numberSelect}${randSecondNumber}`);
        }

        if(Math.random() < 0.5) {
           randNumber = (0 - randNumber);
        }

        if (allNumbers.includes(randNumber)) {
            i--;
        } else {
            allNumbers.push(randNumber);
        }
    }

    return allNumbers;
}

function generateNumbers(score = 0) {
    let numberArray = [];
    let numbersWanted = Math.floor(Math.random() * 3) + 3;

    if (score < 2) {
        numberArray = generateEasyNumbers(numbersWanted);
    } else if ((score === 3) || (score === 4)) {
        numberArray = generateNegativeNumbers(numbersWanted);
    } else if ((score === 5) || (score === 6)) {
        numberArray = generateNegativeNumbers(numbersWanted - 2).concat(generateHardNumbers(2));
    } else if ((score === 7) || (score === 8)) {
        numberArray = generateNegativeNumbers(numbersWanted - 3).concat(generateHardNumbers(3));
    } else if ((score === 9) || (score === 10)) {
        numberArray = generateHardNumbers(numbersWanted - 2).concat(generateHardNumbers(2));
    } else {
        numberArray = generateHardNumbers(numbersWanted);
    }
    const sortedNumbers = numberArray.slice(0).sort((a, b) => a - b);

    while (arrayCheckEquals(numberArray, sortedNumbers)) {
        numberArray = shuffleArray(numberArray);
    }
    
    return numberArray;
}

function displayNumbers(randomNumbers, currentScore) {
    const sortedNumbers = randomNumbers.slice(0).sort((a, b) => a - b);
    const numbersOnScreen = randomNumbers.length;
    let selectedOrder = [];

    document.querySelector('#play_area').textContent = '';

    // using a for loop instead of forEach as the array.pop changes the length over each iteration
    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = randomNumbers.pop();
        let number = document.createElement('div');

        number.textContent = randNumber;
        number.setAttribute('class', 'numberBox');

        document.querySelector('#play_area').appendChild(number);
    }

    document.querySelectorAll('.numberBox').forEach((numberBox) => {
        numberBox.addEventListener('click', () => {
            const {textContent, classList} = numberBox;
            const numberBoxValue = parseInt(textContent);

            if (numberHasNotBeenClicked(classList)) {
                if (isNextNumber(sortedNumbers, selectedOrder, numberBoxValue)) {
                    selectedOrder.push(numberBoxValue);
                    classList.add('clicked');

                    if (allNumbersClicked(selectedOrder, sortedNumbers)) {
                        ++currentScore;

                        const randomNumbers = generateNumbers(currentScore);

                        document.querySelector('#player_score').textContent = `Score: ${currentScore}`;

                        displayNumbers(randomNumbers, currentScore);
                    }
                } else {
                    timePenalty();
                    document.querySelectorAll('.clicked').forEach((chosenNumber) => {
                        chosenNumber.classList.remove('clicked');
                        selectedOrder = [];
                    });
                }
            }
        });
    });
}

function numberHasNotBeenClicked(elementClass) {
    return (!elementClass.contains('clicked'));
}

function isNextNumber(sortedNumbers, selectedOrder, numberBoxValue) {
    return (sortedNumbers[selectedOrder.length] === numberBoxValue);
}

function allNumbersClicked(selectedOrder, sortedNumbers) {
    return (selectedOrder.length === sortedNumbers.length);
}

function hideScreen(cssTag) {
    document.querySelector(cssTag).style.display = 'none';
}

function makeScreenFlex(cssTag) {
    document.querySelector(cssTag).style.display = 'flex';
}

function playGame() {
    const startingScore = 0;
    const randomNumbers = generateNumbers(startingScore);

    timeLeft = totalTime; // restarts the timer to the maximum timer value when starting a new game

    hideScreen('#splash_screen');
    hideScreen('#game_over');
    makeScreenFlex('#game');
    document.querySelector('#player_score').textContent = `Score: ${startingScore}`;

    displayTimeLeft(timeLeft);
    displayNumbers(randomNumbers, startingScore);
    timer();
}

function timePenalty() {
    hideScreen('#play_area');
    makeScreenFlex('#penaltyScreen');

    setTimeout(() => {
        makeScreenFlex('#play_area');
        hideScreen('#penaltyScreen');
    }, 2000);
}

document.querySelectorAll('.play_button').forEach((button) => {
    button.addEventListener('click', playGame);
});



