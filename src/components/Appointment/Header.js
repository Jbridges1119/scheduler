import React from 'react'


//Component - Creates separator line with hour time
export default function Header(props) {
  return (
<header className="appointment__time">
  <h4 className="text--semi-bold">{props.time}</h4>
  <hr className="appointment__separator" />
</header>

  );

};