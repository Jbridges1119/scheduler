import React from "react";
import DayList from "components/DayList";
import "styles/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment/index";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

export default function Application(props) {
  //The current database info saved
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  //Function to setState on day only
  const setDay = (day) => setState({ ...state, day });

  //Helper function to filter info from single day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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

 
    
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  setState((prev) => ({...prev, appointments}))  
  }
  
  //Function to hand each appointment info to Appointment component
  const appointmentsList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={[...interview]}
        interviewer={[...dailyInterviewers]}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* DAYLIST - given days state info and passed down*/}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {/* APPOINTMENTLIST - Function to hand each appointment info to Appointment component*/}
        {appointmentsList}
        {/* APPOINTMENT - Given last key to end the day */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
