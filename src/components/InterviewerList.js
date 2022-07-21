import InterviewerListItem from "./InterviewerListItem";
import "styles/InterviewerList.scss";
import React from "react";
import PropTypes from "prop-types";

//Function that passes props to INTERVIEWERLISTITEMS - Returns a looped list of interviews
function InterviewerList(props) {
  const interviewersList = function () {
    return props.interviewers.map((person) => {
      return (
        <InterviewerListItem
          key={person.id}
          name={person.name}
          avatar={person.avatar}
          selected={person.id === props.value}
          setInterviewer={() => props.onChange(person.id)}
        />
      );
    });
  };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList()}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
