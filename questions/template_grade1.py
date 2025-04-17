import json
import random

# Sample bank of questions based on the Grade 1 Ontario Mathematics curriculum
questions = [
    {
        "question": "What number comes after 29?",
        "correct_answer": "30",
        "incorrect_answers": ["28", "31", "20"]
    },
    {
        "question": "Which coin is worth the most?",
        "correct_answer": "Toonie (2 dollars)",
        "incorrect_answers": ["Loonie (1 dollar)", "Quarter (25 cents)", "Nickel (5 cents)"]
    },
    {
        "question": "If you share 1 pizza equally with 4 friends, what does each person get?",
        "correct_answer": "One fourth",
        "incorrect_answers": ["One third", "One half", "One whole"]
    },
    {
        "question": "Which of these is an even number?",
        "correct_answer": "6",
        "incorrect_answers": ["3", "5", "9"]
    },
    {
        "question": "How many sides does a triangle have?",
        "correct_answer": "3",
        "incorrect_answers": ["2", "4", "5"]
    },
    {
        "question": "Which day comes after Tuesday?",
        "correct_answer": "Wednesday",
        "incorrect_answers": ["Monday", "Thursday", "Sunday"]
    },
    {
        "question": "Which shape has no corners?",
        "correct_answer": "Circle",
        "incorrect_answers": ["Square", "Rectangle", "Triangle"]
    },
    {
        "question": "What number is missing? 2, 4, __, 8",
        "correct_answer": "6",
        "incorrect_answers": ["5", "7", "9"]
    },
    {
        "question": "If you start at 10 and count by 5s, what number comes next?",
        "correct_answer": "15",
        "incorrect_answers": ["20", "12", "14"]
    },
    {
        "question": "How many pennies make a dime?",
        "correct_answer": "10",
        "incorrect_answers": ["5", "20", "15"]
    },
]

# Randomly generate the rest to reach 50 entries using varied templates
templates = [
    ("What number comes after {n}?", lambda n: str(n + 1), lambda n: [str(n - 1), str(n + 2), str(n - 5)]),
    ("How many sides does a {shape} have?", lambda shape: {"triangle": "3", "square": "4", "pentagon": "5"}[shape],
     lambda shape: {
         "triangle": ["2", "4", "5"],
         "square": ["3", "5", "6"],
         "pentagon": ["4", "6", "7"]
     }[shape]),
    ("What is half of {n}?", lambda n: str(n // 2), lambda n: [str(n // 2 + 1), str(n // 2 - 1), str(n)]),
    ("Which number is smallest?", lambda nums: str(min(nums)), lambda nums: [str(max(nums)), str(sorted(nums)[1]), str(sorted(nums)[-1])])
]

shapes = ["triangle", "square", "pentagon"]
while len(questions) < 50:
    template = random.choice(templates)
    if template[0].startswith("What number comes after"):
        n = random.randint(1, 48)
        question_text = template[0].format(n=n)
        correct = template[1](n)
        incorrects = template[2](n)
    elif "sides does a" in template[0]:
        shape = random.choice(shapes)
        question_text = template[0].format(shape=shape)
        correct = template[1](shape)
        incorrects = template[2](shape)
    elif "half of" in template[0]:
        n = random.choice([4, 6, 8, 10, 12])
        question_text = template[0].format(n=n)
        correct = template[1](n)
        incorrects = template[2](n)
    elif "number is smallest" in template[0]:
        nums = random.sample(range(1, 20), 3)
        question_text = template[0].format(nums=", ".join(map(str, nums)))
        correct = template[1](nums)
        incorrects = template[2](nums)

    questions.append({
        "question": question_text,
        "correct_answer": correct,
        "incorrect_answer_1": incorrects[0],
        "incorrect_answer_2": incorrects[1],
        "incorrect_answer_3": incorrects[2]
    })

# Reformat to match final output structure
formatted_questions = []
for q in questions:
    formatted_questions.append({
        "question": q["question"],
        "correct_answer": q["correct_answer"],
        "incorrect_answer_1": q["incorrect_answers"][0] if "incorrect_answers" in q else q["incorrect_answer_1"],
        "incorrect_answer_2": q["incorrect_answers"][1] if "incorrect_answers" in q else q["incorrect_answer_2"],
        "incorrect_answer_3": q["incorrect_answers"][2] if "incorrect_answers" in q else q["incorrect_answer_3"],
    })

# Save the JSON file
file_path = "/mnt/data/grade1_math_quiz.json"
with open(file_path, "w") as f:
    json.dump(formatted_questions, f, indent=2)

file_path
