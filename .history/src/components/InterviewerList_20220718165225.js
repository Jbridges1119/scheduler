import InterviewerListItem from "./InterviewerListItem"
import "styles/InterviewerList.scss";
import React from "react";


export default function InterviewerList(props) {
  const interviewersList = function () {
    console.log(props.value, "test")
    return (
      props.interviewers.map((person) => {
        return (
          <InterviewerListItem
            key={person.id}
            name={person.name}
            avatar={person.avatar}
            selected={person.id === props.value}
            setInterviewer={()=> props.onChange(person.id)}
          />
        )
      }))
  }

  return (

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersList()}
      </ul>
    </section>

  )
}