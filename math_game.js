let score = 0;
let ageGroup = null;

// Function to fetch a new question based on the selected age group
// Function to fetch a new question based on the selected age group
async function getMathQuestion() {
    if (!ageGroup) {
        document.getElementById('question').innerText = 'Choose an age group to start!';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/generate-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ageGroup }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('question').innerText = data.question;
    } catch (error) {
        console.error('Error fetching math question:', error);
        document.getElementById('question').innerText = 'Error fetching question. Please try again.';
    }
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
        document.getElementById('boy-img').src = 'happy_dancing_panda_anim.gif'; // Show happy GIF
    } else {
        document.getElementById('message').innerText = 'Oops! Try again.';
        document.getElementById('boy-img').src = 'sad_panda_anim.gif'; // Show sad GIF
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('answer').value = ''; // Clear the input field

    setTimeout(() => {
        document.getElementById('message').innerText = ''; // Clear feedback message
        document.getElementById('boy-img').src = 'boy-happy.png'; // Reset to default image
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
