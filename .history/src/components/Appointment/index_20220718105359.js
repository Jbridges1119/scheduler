import React from 'react'
import "styles/styles.scss";
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form'

//Selects display of empty or show(interview)
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview( props.id, interview)
    transition(SHOW)
  }
 console.log(props.interviewer, "this fgucking sucks")
 console.log(props.interviewers, "interviewers")
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewer}  onCancel={() => back()} onSave={save} />
      )}
    </article>

  );
};
