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
        getMathQuestion(); // Fetch a new question
    }, 1500); // Delay before fetching the next question
}
