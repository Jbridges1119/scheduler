

//FILTERS APPOINTMENTS FOR A DAY AND - RETURNS ALL APPOINTMENTS IN AN ARRAY
function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(dayInfo => dayInfo.name === day);
  const noAppointments = []
  if (filteredDay[0]) {
     const appointment = filteredDay[0].appointments.map((appointmentID) => state.appointments[appointmentID])
     return appointment
  } 
  return noAppointments;
}


//FILTERS SPECIFIC INTERVIEW INFO - RETURNS AND OBJECT OR NULL
function getInterview(state, interviewID) {
  console.log(interviewID, "interviewID")
  if(interviewID) {
  const appointment = {...interviewID, interviewer: state.interviewers[interviewID.interviewer]}
  return appointment;
  }
  return null
};


//FILTERS APPOINTMENTS FOR A DAY AND - RETURNS ALL APPOINTMENTS IN AN ARRAY
function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(dayInfo => dayInfo.name === day);
  const noInterviewers = []
  if (filteredDay[0]) {
     const interviewer = filteredDay[0].interviewers.map((interviewerID) => state.interviewers[interviewerID])
     console.log(interviewer)
     return interviewer
  } 
  return noInterviewers;
}


export {getAppointmentsForDay, getInterviewersForDay, getInterview}

