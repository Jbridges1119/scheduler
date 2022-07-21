import React from "react";
import classNames from "classnames";
import "styles/DayListItem.scss";

//Component that returns a single day box filled with info from props
export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function (spots) {
    return (
      <>
        {spots === 0 && <h3 className="text--light">no spots remaining</h3>}
        {spots === 1 && <h3 className="text--light">{spots} spot remaining</h3>}
        {spots > 1 && <h3 className="text--light">{spots} spots remaining</h3>}
      </>
    );
  };
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
}
