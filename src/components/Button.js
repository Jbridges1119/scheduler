import React from "react";
import classNames from "classnames";

import "styles/Button.scss";

//Default style button used by Form and Confirm
export default function Button(props) {
  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}
