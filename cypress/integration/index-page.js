describe("Index page", () => {
  it("should have a logo", () => {
    cy.log(`Visiting http://localhost:3000`)
    cy.visit("/")
    cy.get(".cases").contains(/\d* confirmed cases/)
    cy.get(".cases").contains(/\d* estimated infected/)
    cy.get(".cases").contains(/\d* recovered cases/)
  })
})
