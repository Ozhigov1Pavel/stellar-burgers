describe('Constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  it('adds bun and filling to constructor', () => {
    cy.contains('Булка космическая').parents('li').contains('Добавить').click();
    cy.contains('Начинка марсианская')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.contains('Булка космическая (верх)').should('exist');
    cy.contains('Булка космическая (низ)').should('exist');
    cy.contains('Начинка марсианская').should('exist');
  });

  it('opens and closes ingredient modal', () => {
    cy.contains('Соус лунный').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Соус лунный').should('exist');

    cy.get('[data-testid="modal-close"]').click();
    cy.contains('Детали ингредиента').should('not.exist');

    cy.contains('Соус лунный').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Соус лунный').should('exist');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('creates order and clears constructor', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setCookie('accessToken', 'test-access-token');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    cy.reload();
    cy.wait('@getUser');

    cy.contains('Булка космическая').parents('li').contains('Добавить').click();
    cy.contains('Начинка марсианская')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.contains('12345').should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.contains('12345').should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
