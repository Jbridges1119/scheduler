import React from "react";
import classNames from "classnames";
import "styles/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  let interviewerClass = classNames('interviewers__item', {'interviewers__item--selected' : props.selected })
  function selected() {
    return (
      (props.selected ? props.name : "")
      )
  }

  return (
  <li className={interviewerClass} onClick={props.setInterviewer} selected={props.selected}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.avatar}
  />
  {selected()}
</li>
  )

} 