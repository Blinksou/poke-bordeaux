export class ProfilePo {
  goTo() {
    cy.get('#profile-page-link').should('exist').click();
  }

  shouldBeDisplayed() {
    cy.get('[data-cy="profile-name"]').should('exist');
    cy.get('[data-cy="profile-description"]').should('exist');
    cy.get('[data-cy="trainer-avatar"]').should('exist');
    cy.get('[data-cy="add-a-photo-btn"]').should('exist');
    cy.get('[data-cy="edit-btn"]').should('exist');
    cy.get('[data-cy="options"]').should('exist');
    cy.get('[data-cy="statistics"]').should('exist');
  }

  shouldChangeDescription(text = 'cy-test') {
    cy.get('[data-cy="profile-description"]')
      .should('exist')
      .then(($el) => {
        const textContent = $el.text();
        cy.get('[data-cy="edit-btn"]').click();
        $el.append(`${textContent} ${text}`);
        $el.focusout();
        cy.get('[data-cy="profile-description"]').should('contain', 'cy-test');
      });
  }

  logout() {
    cy.get('#logout-btn').click();
  }
}
