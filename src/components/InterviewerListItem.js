import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function setInterviewer(props) {
  console.log(props)
  let interviewerClass = classNames('interviewers__item', {'interviewers__item--selected' : props.selected })

  function selected() {
    return (
      (props.selected ? props.name : "")
      )
  }

  return (
  <li className={interviewerClass} onClick={()=>{props.setInterviewer(props.id)}}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.avatar}
  />
  {selected()}
</li>
  )

} 