import DayListItem from './DayListItem'
import React from "react";

export default function DayList(props) {
  const day = props.value.map((listItem) => {
    return (
    <DayListItem
      key={listItem.id}
      name={listItem.name}
      spots={listItem.spots}
      selected={listItem.name === props.value}
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