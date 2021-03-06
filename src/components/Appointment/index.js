import React from "react";
import "styles/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

//Selects display of empty or show(interview)
export default function Appointment(props) {
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETING";
  const SAVING = "SAVING";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //Adds interview to state and api
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }
  //Set mode to confirm and load confirm component
  function onDelete() {
    transition(CONFIRM);
  }
  //Set mode to delete and returns back to empty component - removes interview from api and state
  function onConfirm() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }
  //Runs back function - Goes back to show or edit
  function onCancel() {
    back();
  }
  //Changes mode to Edit for component
  function onEdit() {
    transition(EDIT);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewer}
          onCancel={() => back()}
          onSave={save}
          interview={null}
        />
      )}
      {mode === SAVING && <Status message={mode} />}
      {mode === DELETE && <Status message={mode} />}
      {mode === CONFIRM && (
        <Confirm onCancel={onCancel} onConfirm={onConfirm} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewer}
          onCancel={() => back()}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
