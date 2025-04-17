import json

# Define 50 sample Grade 3 math questions
grade3_questions = [
    {
        "question": "What is the value of the digit 6 in the number 643?",
        "correct_answer": "600",
        "incorrect_answers": ["6", "60", "603"]
    },
    {
        "question": "Which number is the largest?",
        "correct_answer": "981",
        "incorrect_answers": ["819", "891", "918"]
    },
    {
        "question": "Round 237 to the nearest ten.",
        "correct_answer": "240",
        "incorrect_answers": ["230", "200", "300"]
    },
    {
        "question": "Which is a correct way to write 318 in expanded form?",
        "correct_answer": "300 + 10 + 8",
        "incorrect_answers": ["30 + 10 + 8", "300 + 18", "310 + 8"]
    },
    {
        "question": "What is 8 × 5?",
        "correct_answer": "40",
        "incorrect_answers": ["45", "35", "30"]
    }
]

# More topics from the Grade 3 curriculum
topics_grade3 = [
    ("How many hundreds are in the number 820?", "8", ["2", "0", "20"]),
    ("What is 725 + 145?", "870", ["860", "880", "750"]),
    ("What is 900 - 275?", "625", ["650", "675", "600"]),
    ("What number comes next in the pattern: 3, 6, 9, 12, ...?", "15", ["14", "18", "13"]),
    ("What is one half of 8?", "4", ["2", "6", "3"]),
    ("What is 40 ÷ 5?", "8", ["5", "6", "7"]),
    ("Which number is an odd number?", "333", ["222", "444", "800"]),
    ("What shape has 6 faces, 12 edges, and 8 vertices?", "Cube", ["Cylinder", "Cone", "Sphere"]),
    ("If a number is rounded to the nearest hundred and becomes 500, which number could it be?", "463", ["556", "401", "599"]),
    ("What is the product of 9 and 10?", "90", ["99", "80", "100"]),
    ("How many sides does a triangle have?", "3", ["4", "5", "2"]),
    ("What is the mean of 4, 6, and 8?", "6", ["5", "7", "4"]),
    ("If each person gets one fifth of a pizza, how many people share one whole pizza?", "5", ["4", "10", "3"]),
    ("Which fraction is equivalent to two fourths?", "One half", ["Three fourths", "One third", "One fourth"]),
    ("What is the mode in this data set: 5, 5, 7, 8, 5?", "5", ["7", "8", "No mode"]),
]

# Fill up to 50 questions total
while len(grade3_questions) < 50:
    q, correct, wrongs = random.choice(topics_grade3)
    grade3_questions.append({
        "question": q,
        "correct_answer": correct,
        "incorrect_answers": wrongs
    })

# Format the questions into the required JSON pattern
formatted_grade3_questions = []
for q in grade3_questions:
    formatted_grade3_questions.append({
        "question": q["question"],
        "correct_answer": q["correct_answer"],
        "incorrect_answer_1": q["incorrect_answers"][0],
        "incorrect_answer_2": q["incorrect_answers"][1],
        "incorrect_answer_3": q["incorrect_answers"][2]
    })

# Save to a .json file
file_path_grade3 = "/mnt/data/grade3_math_quiz.json"
with open(file_path_grade3, "w") as f:
    json.dump(formatted_grade3_questions, f, indent=2)

file_path_grade3
