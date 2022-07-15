


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

function getInterview(state, interviewID) {
  if(interviewID) {
  const appointment = {...interviewID, interviewer: state.interviewers[interviewID.interviewer]}
  return appointment;
  }
  return null
};


module.exports = {getAppointmentsForDay, getInterview}




// appointments: {
//   "1": { id: 1, time: "12pm", interview: null },
//   "2": { id: 2, time: "1pm", interview: null },
//   "3": {
//     id: 3,
//     time: "2pm",
//     interview: { student: "Archie Cohen", interviewer: 2 }
//   },
//   "4": { id: 4, time: "3pm", interview: null },
//   "5": {
//     id: 5,
//     time: "4pm",
//     interview: { student: "Chad Takahashi", interviewer: 2 }
//   }
// },
// interviewers: {
//   "1": {  "id": 1,"name": "Sylvia Palmer","avatar": "https://i.imgur.com/LpaY82x.png"},
//   "2": {'id': 2, 'name': "Tori Malcolm", 'avatar': "https://i.imgur.com/Nmx0Qxo.png"}
// }
// };