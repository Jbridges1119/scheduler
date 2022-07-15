import DayListItem from './DayListItem'
import React from "react";


//Function that passes props to DAYLISTITEM - Returns a looped list of days
export default function DayList(props) {
  const day = props.days.map((day) => {
    return (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
    )
  })
  return (
    <ul>
      {day}
    </ul>
  )
}