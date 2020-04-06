function generateNumbers() {
    let numbersOnScreen = Math.floor(Math.random() * 3) + 3;
    let allNumbers = [];

    for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = Math.floor(Math.random() * 101);

        allNumbers.push(randNumber);
    }

    return allNumbers;
}

function displayNumbers(allNumbers) {
    let numbersOnScreen = allNumbers.length;
     // using a for loop instead of forEach as the array.pop changes the length over each iteration
     for (let i = 0; i < numbersOnScreen; i++) {
        let randNumber = allNumbers.pop();
        let number = document.createElement('div');

        number.textContent = randNumber;
        number.setAttribute('class', 'numberBox');

         document.querySelector('#play_area').appendChild(number);
    }

    document.querySelectorAll('.numberBox').forEach((element) => {
        element.addEventListener('click', () => {
        });
    });
}

const randomNumbers = generateNumbers();
const sortedNumbers = randomNumbers.sort();

document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('#splash').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    let randomNumbers = generateNumbers();
    displayNumbers(randomNumbers);
});

let selectedOrder = [];

const { value, classList } = numberElement;

if (sortedNumbers[selectedOrder.length] === value) {
    selectedOrder.push(value);
    classList.add('chosen_number');
}

if (selectedOrder === sortedNumbers) {
// all selected correctly
}