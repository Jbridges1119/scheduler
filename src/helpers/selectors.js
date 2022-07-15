


export default function getAppointmentsForDay(state, day) {
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

