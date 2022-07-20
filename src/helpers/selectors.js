

//FILTERS APPOINTMENTS FOR A DAY AND - RETURNS ALL APPOINTMENTS IN AN ARRAY
function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(dayInfo => dayInfo.name === day);
  if (filteredDay[0]) {
     return filteredDay[0].appointments.map((appointmentID) => state.appointments[appointmentID])
  } 
  return [];
}


//FILTERS SPECIFIC INTERVIEW INFO - RETURNS AND OBJECT OR NULL
function getInterview(state, interviewID) {
  if(interviewID) {
  return {...interviewID, interviewer: state.interviewers[interviewID.interviewer]}
  }
  return null
};


//FILTERS APPOINTMENTS FOR A DAY AND - RETURNS ALL APPOINTMENTS IN AN ARRAY
function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(dayInfo => dayInfo.name === day);
  if (filteredDay[0]) {
     return filteredDay[0].interviewers.map((interviewerID) => state.interviewers[interviewerID])
  } 
  return [];
}


export {getAppointmentsForDay, getInterviewersForDay, getInterview}

