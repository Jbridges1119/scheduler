import { useState, useEffect } from "react";
import axios from 'axios'


export default function useApplicationData(props) {
   //Function to setState on day only
   const setDay = (day) => setState({ ...state, day });
  //The current database info saved
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
 

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






function updateSpots2(state, appointments) {
  const newState = {...state, appointments}
  //Day to change
  const filterDay = newState.days.filter((info)=> (info.name === state.day))
  //Day to change index
  const dayIndex = newState.days.findIndex((info) => (info.name === state.day))
 //Find Spot count
  const appoints = filterDay[0].appointments.map(info => !appointments[info].interview && true)
  const filterAppoints = appoints.filter((info) => info === true)
  const spots = filterAppoints.length
  //Make updated mock-state
  const objDay = state.days[dayIndex]
  const dayCopy = {...objDay, spots}
  const daysCopy = [...state.days]
  daysCopy[dayIndex] = dayCopy

 return daysCopy
}











  function cancelInterview(id) {
   
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
const days = updateSpots2(state, appointments)

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days
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
    }
    const days = updateSpots2(state, appointments)

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days
      })
    
    })
  }



 
    








  return { state, setDay, bookInterview, cancelInterview,  }
}
