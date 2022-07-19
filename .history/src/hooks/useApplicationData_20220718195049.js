import { useState, useEffect } from "react";
import axios from 'axios'
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

export default function useApplicationData(props) {
  //The current database info saved
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  //Function to setState on day only
  const setDay = (day) => setState({ ...state, day });

 //API that calls database three times for data
 useEffect(() => {
  Promise.all([
    axios.get(`/api/days`),
    axios.get(`/api/appointments`),
    axios.get(`/api/interviewers`),
  ]).then((all) => {
    setState((prev) => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data,
    }));
  });
}, []);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  }
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  function updateSpots( daysAppointments) {
    let count = 0
    daysAppointments.map((appointment) => {
      if (!appointment.interview) {
        count++
      }
    })
    const hur = [...state.days]
    const whatever = hur.find(dayInfo => dayInfo.name === state.day)
 console.log(whatever[0])
  }
updateSpots(dailyAppointments)








  return { state, setDay, bookInterview, cancelInterview,  }
}
