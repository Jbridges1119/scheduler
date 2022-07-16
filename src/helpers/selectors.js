

//FILTERS APPOINTMENTS FOR A DAY AND - RETURNS ALL APPOINTMENTS IN AN ARRAY
function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(dayInfo => dayInfo.name === day);
  const result = []
  if (filteredDay.length) {
    for (let id of filteredDay[0].appointments) {
      if (state.appointments[id]) {
        result.push(state.appointments[id])
      }
    }
  }
  
  return result;
}

//FILTERS SPECIFIC INTERVIEW INFO - RETURNS AND OBJECT OR NULL
function getInterview(state, interviewID) {
  if(interviewID) {
  const appointment = {...interviewID, interviewer: state.interviewers[interviewID.interviewer]}
  
  return appointment;
  }
  return null
};

//FILTERS APPOINTMENTS FOR A DAY AND - RETURNS ALL APPOINTMENTS IN AN ARRAY
function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(dayInfo => dayInfo.name === day);
  const result = []
  if (filteredDay.length) {
    for (let id of filteredDay[0].interviewers) {
      if (state.interviewers[id]) {
        result.push(state.interviewers[id])
      }
    }
  }
  return result;
}

export {getAppointmentsForDay, getInterviewersForDay, getInterview}

