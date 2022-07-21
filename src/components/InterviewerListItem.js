import React from "react";
import classNames from "classnames";
import "styles/InterviewerListItem.scss";

//Component that returns a single interview box filled with info from props
export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  function selected() {
    return props.selected ? props.name : "";
  }

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {selected()}
    </li>
  );
}
