import streamlit as st
import json

st.title("📚 Quiz Creator")

# Number of questions
num_questions = st.number_input("How many questions do you want to create?", min_value=1, max_value=50, value=1, step=1)

quiz = []

st.markdown("---")

for i in range(num_questions):
    st.header(f"Question {i+1}")
    question = st.text_input(f"Enter question {i+1}:", key=f"q{i}")
    correct_answer = st.text_input("Correct answer:", key=f"c{i}")
    incorrect1 = st.text_input("Incorrect answer 1:", key=f"i1_{i}")
    incorrect2 = st.text_input("Incorrect answer 2:", key=f"i2_{i}")
    incorrect3 = st.text_input("Incorrect answer 3:", key=f"i3_{i}")

    if all([question, correct_answer, incorrect1, incorrect2, incorrect3]):
        quiz.append({
            "question": question,
            "correct_answer": correct_answer,
            "incorrect_answer_1": incorrect1,
            "incorrect_answer_2": incorrect2,
            "incorrect_answer_3": incorrect3
        })

st.markdown("---")

if st.button("✅ Generate Quiz JSON"):
    if len(quiz) == num_questions:
        st.success("Quiz JSON generated successfully!")
        quiz_json = json.dumps(quiz, indent=2)
        st.code(quiz_json, language='json')
        st.download_button(
            label="📥 Download JSON file",
            data=quiz_json,
            file_name="quiz.json",
            mime="application/json"
        )
    else:
        st.warning("Please fill out all questions completely.")
