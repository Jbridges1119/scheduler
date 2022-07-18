import React from 'react'
import "styles/styles.scss";
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'

//Selects display of empty or show(interview)
export default function Appointment(props) {
  const EDIT = "EDIT"
  const CONFIRM = "CONFIRM"
  const DELETE = "DELETE"
  const SAVING = "SAVING"
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
    transition(SAVING)
    props.bookInterview( props.id, interview).then(()=> {
      transition(SHOW)
    })
  };
  function onDelete() {
    transition(CONFIRM, true)
    
  };
 function onConfirm(){
 transition(DELETE)
 props.cancelInterview(props.id).then(()=> {
   transition(EMPTY)
 })
 };

function onCancel() {
  back()
}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewer}  onCancel={() => back()} onSave={save} />
      )}
       {mode === SAVING && (
        <Status message={mode} />
      )}
      {mode === DELETE && (
        <Status message={mode} />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={onCancel} onConfirm={onConfirm} />
      )}
      {mode === EDIT && (
        <Form interviewers={props.interviewer}  onCancel={() => back()} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer} />
      )}
    </article>

  );
};
