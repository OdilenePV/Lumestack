describe('Registro de novo usuário com sucesso', () => {
  it('Deve registrar um novo usuário com informações válidas', () => {
    cy.task("db:seed");
    cy.intercept("POST", "/users").as("signup");

    const userInfo = {
      firstName: "Bob",
      lastName: "Ross",
      username: "PainterJoy90",
      password: "s3cret",
    };

    cy.visit("/");
    cy.getBySel("signup").click();
    cy.getBySel("signup-title").should("be.visible").and("contain", "Sign Up");

    cy.getBySel("signup-first-name").type(userInfo.firstName);
    cy.getBySel("signup-last-name").type(userInfo.lastName);
    cy.getBySel("signup-username").type(userInfo.username);
    cy.getBySel("signup-password").type(userInfo.password);
    cy.getBySel("signup-confirmPassword").type(userInfo.password);
    cy.getBySel("signup-submit").click();
    cy.wait("@signup");
    // After signup, it should login or redirect
    cy.location("pathname").should("not.equal", "/signup");
  });
});

describe('Tentar registrar um novo usuário com informações incompletas', () => {
  it('Deve exibir mensagens de erro ao tentar registrar um novo usuário sem preencher todas as informações obrigatórias', () => {
    cy.task("db:seed");
    cy.visit("/signup");

    // Try to submit without filling
    cy.getBySel("signup-submit").click();

    // Check for errors
    cy.get("#firstName-helper-text").should("be.visible").and("contain", "First Name is required");
    //cy.get("#lastName-helper-text").should("be.visible").and("contain", "Last Name is required");
    //cy.get("#username-helper-text").should("be.visible").and("contain", "Username is required");
    //cy.get("#password-helper-text").should("be.visible").and("contain", "Enter your password");
    //cy.get("#confirmPassword-helper-text").should("be.visible").and("contain", "Confirm your password");
  });
});