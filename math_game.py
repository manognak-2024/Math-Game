from flask import Flask, request, jsonify
import openai
import random

# Initialize the Flask app
app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'

# Function to generate math question with word problems
def generate_math_word_problem(age_group):
    if age_group == '5-6':
        prompt = "Generate a simple math word problem suitable for a 5-6-year-old child. Use basic addition or subtraction."
    elif age_group == '7-9':
        prompt = "Generate a math word problem suitable for a 7-9-year-old child. Use addition, subtraction, or multiplication."
    elif age_group == '10+':
        prompt = "Generate a challenging math word problem suitable for a 10+ year-old child. Use addition, subtraction, multiplication, division, and include decimals."
    else:
        prompt = "Generate a simple math word problem."

    # Use OpenAI API to get a math word problem
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100,
        temperature=0.7
    )

    question = response.choices[0].text.strip()
    return question

# Define an API endpoint to get a math question
@app.route('/generate-question', methods=['POST'])
def generate_question():
    # Get the age group from the request data
    data = request.get_json()
    age_group = data.get('ageGroup', '5-6')  # Default to '5-6' if no age group is provided

    # Generate the math word problem
    question = generate_math_word_problem(age_group)

    # Return the question as JSON
    return jsonify({"question": question})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
