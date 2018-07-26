import moment from 'moment';

// Login
context('Login', () => {
  beforeEach(() => {
    // Visiting our app before each test removes any state build up from
    // previous tests. Visiting acts as if we closed a tab and opened a fresh one.
    moment.locale('es');
  });
  describe('Login with credentials', () => {
    it('should should be disabled at the start', () => {
      cy.visit('http://localhost:3001');
      cy.get('button').contains('Sign in').should('be.disabled');
    });
    it('should be disabled with invalid data', () => {
      cy.get('input[name="userEmail"]').type('somerandomtext').blur();
      cy.get('span').contains('Invalid email address');
      cy.get('input[name="userPassword"]').type('12').blur();
      cy.get('span').contains('Must be 5 characters or more');
      cy.get('input[name="userPassword"]').type('12345678901234567').blur();
      cy.get('span').contains('Must be 15 characters or less');
      cy.get('button').contains('Sign in').should('be.disabled');
    });
    it('should be enabled with valid input data', () => {
      // Clear form data
      cy.get('input[name="userEmail"]').clear();
      cy.get('input[name="userPassword"]').clear();

      // Valid credentials
      cy.get('input[name="userEmail"]').type('carlosmorales@kikitestwig.cool').blur();
      cy.get('input[name="userPassword"]').type('moraleja44').blur();
      cy.get('form').get('button').contains('Sign in').should('be.enabled');
    });
    it('should redirect to planner/weekly when submitting valid data', () => {
      const newTime = moment().startOf('isoWeek').format('YYYYMMDD');
      cy.get('button').contains('Sign in').click();
      cy.location().should((loc) => {
        expect(loc.host).to.eq('localhost:3001');
        expect(loc.hostname).to.eq('localhost');
        expect(loc.protocol).to.eq('http:');
        expect(loc.pathname).to.eq(`/planner/week/${newTime}`);
      });
    });
  });
});

// Login
context('Planner', () => {
  beforeEach(() => {
    // Visiting our app before each test removes any state build up from
    // previous tests. Visiting acts as if we closed a tab and opened a fresh one.
    moment.locale('es');
  });
  describe('Booking a slot', () => {
    it('should open the Booking Form', () => {
      cy.get('button[type="transparent"]:enabled').first().invoke('attr', 'data-cy', 'selected');
      cy.get('[data-cy=selected]').click();
    });
    // Identify some form elements
    it('should render a title', () => {
      cy.get('#modal').find('h2').contains('Visit details');
    });
    it('renders a Book button', () => {
      cy.get('#modal').find('button').contains('Book');
    });
    it('should be disabled with invalid data', () => {
      cy.get('input[name="userEmail"]').type('somerandomtext').blur();
      cy.get('span').contains('Invalid email address');
      cy.get('input[name="userPhone"]').type('123').blur();
      cy.get('span').contains('Invalid phone number');
      cy.get('button').contains('Book').should('be.disabled');
    });
    it('should be enabled with valid input data', () => {
      // Clear form data
      cy.get('input[name="userEmail"]').clear();
      cy.get('input[name="userPhone"]').clear();

      // Valid booking
      cy.get('input[name="userName"]').type('Joseph').blur();
      cy.get('input[name="userSurname"]').type('Knight').blur();
      cy.get('input[name="userEmail"]').type('josephknight@knights.uk').blur();
      cy.get('input[name="userPhone"]').type('933457820').blur();
      cy.get('textarea[name="userComments"]').type('My hand hurts :(').blur();
      cy.get('form').get('button').contains('Book').should('be.enabled');
    });
    it('should send data when valid', () => {
      cy.get('form').get('button').contains('Book').click();
    });
  });
  describe('Taken slot', () => {
    it('should be disabled', () => {
      cy.get('button[type="transparent"]:disabled').first()
        .should('be.disabled');
      cy.get('button[type="transparent"]:disabled > p').first()
        .should('have.css', 'text-decoration', 'line-through solid rgb(96, 188, 99)');
    });
  });
});
