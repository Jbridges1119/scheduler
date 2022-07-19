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
  // const dailyAppointments = getAppointmentsForDay(state, state.day);

  function updateSpots( state ) {
    //the days id
    // const dayIndex = state.days.findIndex(dayInfo => dayInfo.name === state.day);
  
    // const counter = dailyAppointments.map((appointment) => !appointment.interview)
    // const count = counter.filter(spot => spot === true)
    // const spots = 4
    // console.log(spots)

    

    // const currentDay = state.days[0]
    
    
    // const updateDayObj = { ...currentDay, spots }
    // const updatedDaysArr = [...state.days];
    // updatedDaysArr[dayIndex] = updateDayObj;
    
    // const updatedState = { ...state, days: updatedDaysArr };
    // console.log(updatedState)
    // //   if (!appointment.interview) {
    // //     count++
    // //   }
    // // })
    
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    console.log(currentDayIndex)
    const currentDay = state.days[currentDayIndex];
    const spots = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    ).length;
      
    const updatedDayObj = { ...currentDay, spots };
  
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;
  
    const updatedState = { ...state, days: updatedDaysArr };
  
    return updatedState;
  
  

    
    
  }
  const newState = updateSpots(state);
  
  console.log(state);
  console.log(newState);
    








  return { state, setDay, bookInterview, cancelInterview,  }
}
