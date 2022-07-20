describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it('should navigate to Tuesday', () => {
    cy.visit("/")
    .get('li').contains('Tuesday')
    .click()
  })


});
