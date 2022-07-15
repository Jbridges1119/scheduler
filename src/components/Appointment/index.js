import React from 'react'
import "styles/styles.scss";
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'


//Selects display of empty or show(interview)
export default function Appointment(props) {
  // const EMPTY = "EMPTY";
  // const SHOW = "SHOW";
  console.log(props, "interview")

  return (
<article className="appointment">
  <Header time={props.time}/>
  {props.interview ? <Show student={props.interview.student} interviewer={props.interviewer.name} /> : <Empty />}
</article>

  );
};