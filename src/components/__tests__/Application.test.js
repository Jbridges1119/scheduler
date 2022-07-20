import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application tests #1", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("Loads data, books and interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "https://i.imgur.com/Nmx0Qxo.png"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find((day) =>
      getByText(day, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });
});

// it("calls onCancel and resets the input field", () => {
//   const onCancel = jest.fn();
//   const { getByText, getByPlaceholderText, queryByText } = render(
//     <Form
//       interviewers={interviewers}
//       name="Lydia Mill-Jones"
//       onSave={jest.fn()}
//       onCancel={onCancel}
//     />
//   );

//   fireEvent.click(getByText("Save"));

//   fireEvent.change(getByPlaceholderText("Enter Student Name"), {
//     target: { value: "Lydia Miller-Jones" }
//   });

//   fireEvent.click(getByText("Cancel"));

//   expect(queryByText(/student name cannot be blank/i)).toBeNull();

//   expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

//   expect(onCancel).toHaveBeenCalledTimes(1);
// });
