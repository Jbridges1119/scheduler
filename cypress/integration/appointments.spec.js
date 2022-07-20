describe("Appointments", () => {

  it('should book an interview', () => {
    cy.visit('/')
    .contains('Monday')
    .click()
    .get("[alt=Add]")
    .first()
    .click()
    .get("[data-testid=student-name-input]")
    .type('Lydia Miller-Jones')
    cy.get("[alt='Sylvia Palmer']").click();
  })




}) 