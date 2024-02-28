import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {
  const handleDelete = (questionId) => {
    setQuestions(questions.filter(question => question.id !== questionId));
  };
  console.log(questions)
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question, index)=>{ 
        return <QuestionItem key={question.id} question={question} onDelete={handleDelete}/> })}</ul>
    </section>
  );
}

export default QuestionList;
