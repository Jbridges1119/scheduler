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

// const updateSpots = (appointments) => {
//   let spots = 0;

//   // Grab index of the day
//   const dayIndex = state.days.findIndex((day) => day.name === state.day);
//   const daysObject = state.days[dayIndex];

//   // Loop through that day's appointments and count the ones without an interview booked
//   for (const appointmentId of daysObject.appointments) {
//     if (!appointments[appointmentId].interview) {
//       spots++;
//     }
//   }
//   // Copy state and adjust the spot number with the count and return the copy
//   const copyDay = { ...daysObject, spots };
//   const copyDays = [...state.days];
//   copyDays[dayIndex] = copyDay;
//   return copyDays;
// };


// function updateSpots( state ) {

// const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    
//     const currentDay = state.days[currentDayIndex];
    
//     const spots = currentDay.appointments.filter(
//       (id) => !state.appointments[id].interview
//     ).length;
      
//     const updatedDayObj = { ...currentDay, spots };
  
//     const updatedDaysArr = [...state.days];
//     updatedDaysArr[currentDayIndex] = updatedDayObj;
  
//     const updatedState = { ...state, days: updatedDaysArr };
 
//     return updatedState;
  
//     }










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
  const newDays = {...state.days}
  console.log(newDays[dayIndex].spots = spots)

  const returnState = {...newState, }
 
  return newDays
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
const attempt = updateSpots2(state,appointments)
    console.log(attempt, "newcode")
 
    // const days = updateSpots(appointments);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments
        // days
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
    // const days = updateSpots(appointments);
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments
        // days
      })
    
    })
  }



 
    








  return { state, setDay, bookInterview, cancelInterview,  }
}
