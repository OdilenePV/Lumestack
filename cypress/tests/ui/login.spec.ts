import { User } from "../../../src/models";

describe('Login com sucesso', () => {
  it('Deve fazer login com um usuário válido', () => {
    cy.task("db:seed");
    cy.database("find", "users").then((user: User) => {
      cy.login(user.username, "s3cret");
      cy.location("pathname").should("equal", "/");
    });
  });
});

describe('Tentar fazer login com credenciais inválidas', () => {
  it('Deve exibir uma mensagem de erro ao fazer login com credenciais inválidas', () => {
    cy.task("db:seed");
    cy.login("invalidUserName", "invalidPa$$word");
    cy.getBySel("signin-error")
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
  });
});