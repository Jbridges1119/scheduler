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


function updateSpots( state ) {

const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    
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


  function cancelInterview(id) {
    const newState = updateSpots(state);
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
        newState
      });
    });
    console.log(state)
  }

  function bookInterview(id, interview) {
    const newState = updateSpots(state);
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
        newState
      })
    
    })
  }
  // const dailyAppointments = getAppointmentsForDay(state, state.day);

//  function updateSpots( state ) {
//     //the days id
//     // const dayIndex = state.days.findIndex(dayInfo => dayInfo.name === state.day);
  
//     // const counter = dailyAppointments.map((appointment) => !appointment.interview)
//     // const count = counter.filter(spot => spot === true)
//     // const spots = 4
//     // console.log(spots)

    

//     // const currentDay = state.days[0]
    
    
//     // const updateDayObj = { ...currentDay, spots }
//     // const updatedDaysArr = [...state.days];
//     // updatedDaysArr[dayIndex] = updateDayObj;
    
//     // const updatedState = { ...state, days: updatedDaysArr };
//     // console.log(updatedState)
//     // //   if (!appointment.interview) {
//     // //     count++
//     // //   }
//     // // })
    
//     const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    
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

    
    
  
  // setTimeout(() => {
 
  // },500
  // )
 
    








  return { state, setDay, bookInterview, cancelInterview,  }
}
