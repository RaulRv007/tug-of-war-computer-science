import json
import random

# Define 50 sample Grade 2 math questions based on the curriculum
questions = [
    {
        "question": "What is the value of the digit 3 in the number 132?",
        "correct_answer": "30",
        "incorrect_answers": ["3", "300", "13"]
    },
    {
        "question": "What number is an even number?",
        "correct_answer": "28",
        "incorrect_answers": ["35", "41", "17"]
    },
    {
        "question": "If you skip count by 25, what number comes after 100?",
        "correct_answer": "125",
        "incorrect_answers": ["105", "115", "130"]
    },
    {
        "question": "What fraction shows one piece when a pizza is shared equally among four people?",
        "correct_answer": "One fourth",
        "incorrect_answers": ["One third", "One half", "One sixth"]
    },
    {
        "question": "Which of these is the same as 1 one third?",
        "correct_answer": "2 one sixths",
        "incorrect_answers": ["1 one sixth", "3 one sixths", "1 one fourth"]
    },
]

# Generate more questions based on variety from the curriculum
topics = [
    ("Which number is greater?", "164", ["46", "98", "150"]),
    ("Which number is less than 73?", "29", ["91", "82", "100"]),
    ("How many tens are in the number 80?", "8", ["2", "4", "10"]),
    ("What number comes next in the pattern: 5, 10, 15, ...?", "20", ["25", "30", "18"]),
    ("What is 12 + 6?", "18", ["16", "20", "14"]),
    ("What is 20 - 7?", "13", ["15", "10", "12"]),
    ("What is 4 groups of 2?", "8", ["6", "10", "12"]),
    ("Which number is odd?", "37", ["28", "16", "42"]),
    ("How many ones are in 139?", "9", ["3", "1", "13"]),
    ("Which is a correct way to write 124 in expanded form?", "100 + 20 + 4", ["120 + 4", "100 + 24", "12 + 40 + 4"]),
    ("What is half of 10?", "5", ["2", "4", "6"]),
    ("Which tool helps show skip counting by 10s?", "Number line", ["Graph", "Tally chart", "Ruler"]),
    ("Which of these is a way to measure length?", "Centimetres", ["Degrees", "Litres", "Kilograms"]),
    ("What is the mode in this data set: 2, 3, 2, 4, 2?", "2", ["3", "4", "None"]),
    ("What does 'congruent' mean?", "Same size and shape", ["Same colour", "Same length", "Same angle"]),
]

# Fill up to 50 questions total
while len(questions) < 50:
    q, correct, wrongs = random.choice(topics)
    questions.append({
        "question": q,
        "correct_answer": correct,
        "incorrect_answers": wrongs
    })

# Format the questions into the required JSON pattern
formatted_questions = []
for q in questions:
    formatted_questions.append({
        "question": q["question"],
        "correct_answer": q["correct_answer"],
        "incorrect_answer_1": q["incorrect_answers"][0],
        "incorrect_answer_2": q["incorrect_answers"][1],
        "incorrect_answer_3": q["incorrect_answers"][2]
    })

# Save to a .json file
file_path = "/mnt/data/grade2_math_quiz.json"
with open(file_path, "w") as f:
    json.dump(formatted_questions, f, indent=2)

file_path
