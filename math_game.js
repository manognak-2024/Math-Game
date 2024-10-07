let score = 0;
let ageGroup = null;

// Function to fetch a new question based on the selected age group
async function getMathQuestion() {
    let num1, num2, operator;

    switch (ageGroup) {
        case '5-6':
            // Simple addition, subtraction, and small multiplication (up to 5x5)
            num1 = Math.floor(Math.random() * 6);
            num2 = Math.floor(Math.random() * 6);
            operator = Math.random() > 0.5 ? '+' : '-';
            break;
        case '7-9':
            // Addition, subtraction, multiplication, division with integers
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
            break;
        case '10+':
            // Addition, subtraction, multiplication, division with decimals
            num1 = (Math.random() * 100).toFixed(2);
            num2 = (Math.random() * 100).toFixed(2);
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
            break;
        default:
            document.getElementById('question').innerText = 'Choose an age group to start!';
            return;
    }

    if (operator === '/') {
        num1 = (num1 * num2).toFixed(2); // Avoid dividing by zero
    }

    document.getElementById('question').innerText = `What is ${num1} ${operator} ${num2}?`;

    return { num1, operator, num2 };
}

// Function to change age group based on button click
function changeAgeGroup(newAgeGroup) {
    ageGroup = newAgeGroup;
    resetGame(); // Reset the game when the age group changes
}

function resetGame() {
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('message').innerText = '';
    getMathQuestion(); // Get the first question after age group change
}

async function checkAnswer() {
    const answer = parseFloat(document.getElementById('answer').value);
    const questionText = document.getElementById('question').innerText;
    const [num1, operator, num2] = parseMathQuestion(questionText); // Helper to parse the question
    let correctAnswer;

    switch (operator) {
        case '+':
            correctAnswer = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            correctAnswer = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            correctAnswer = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            correctAnswer = (parseFloat(num1) / parseFloat(num2)).toFixed(2); // Rounded division result
            break;
    }

    if (answer === parseFloat(correctAnswer)) {
        score += 1;
        document.getElementById('message').innerText = 'Correct! Great job!';
        document.getElementById('boy-img').src = 'boy-happy.png'; // Show happy image
    } else {
        document.getElementById('message').innerText = 'Oops! Try again.';
        document.getElementById('boy-img').src = 'boy-sad.png'; // Show sad image
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('answer').value = ''; // Clear the input field

    setTimeout(() => {
        document.getElementById('message').innerText = ''; // Clear feedback message
        getMathQuestion(); // Fetch a new question
    }, 1500); // Delay before fetching the next question
}

// Helper function to parse the math question
function parseMathQuestion(question) {
    const parts = question.match(/([\d\.]+)\s*([\+\-\*\/])\s*([\d\.]+)/);
    if (parts) {
        const num1 = parts[1];
        const operator = parts[2];
        const num2 = parts[3];
        return [num1, operator, num2];
    }
    return [0, '+', 0]; // Default in case parsing fails
}

// Initialize the game by fetching the first question
getMathQuestion();
