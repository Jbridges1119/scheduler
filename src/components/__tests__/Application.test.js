import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId } from "@testing-library/react";


import Application from "components/Application";



afterEach(cleanup);

describe("Application tests #1", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  



  it('Loads data, books and interview and reduces the spots remaining for the first day by 1', async () => {

    const { container } = render(<Application />);

    await waitForElement(()=>  getByText(container, "Archie Cohen") )

    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];

    console.log(prettyDOM(appointment));


  });

  
  })
