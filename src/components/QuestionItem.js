import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [isDeleted, setisDeleted]= useState(false)
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  console.log(question)

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
      .then((res) => res.json())
      .then(() =>{setisDeleted(true); onDelete(id);})
  }

  function handleChange(e){
    const newCorrectIndex = parseInt(e.target.value)
    setSelectedCorrectIndex(newCorrectIndex);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((data)=>console.log(data))

  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return isDeleted? null: (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
