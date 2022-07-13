import DayListItem from './DayListItem'
import React from "react";

export default function DayList(props) {
  const day = props.days.map((listItem) => {
    return (
    <DayListItem
      key={listItem.id}
      name={listItem.name}
      spots={listItem.spots}
      selected={listItem.name === listItem.day}
      setDay={props.setDay}
    />
    )
  })
  return (
    <ul>
      {day}
    </ul>
  )
}