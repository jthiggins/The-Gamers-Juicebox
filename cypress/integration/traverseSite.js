describe('traverse each possible page of the site', () => {

	it('home to browse', () => {
		cy.visit('/')
		cy.get('#toBrowse').click()
		cy.contains('h1', 'Browse Games')
	});
	
	it('home to login', () => {
		cy.visit('/')
		cy.get('#toLogin').click()
		cy.contains('h1', 'Log In To Your Account')
	});
	
	it('login to home', () => {
		cy.visit('/logIn')
		cy.get('#toHome').click()
		cy.contains('h1', 'Welcome to the Juicebox')
	});
	
	it('login to register', () => {
		cy.visit('/logIn')
		cy.get('#goToReg').click();
		cy.contains('h1', 'Register Account')
	});
	
	it('register to login', () => {
		cy.visit('/register')
		cy.get('#toLogin').click()
		cy.contains('h1', 'Log In To Your Account')
	});
	
	it('register to home', () => {
		cy.visit('/register')
		cy.get('#toHome').click()
		cy.contains('h1', 'Welcome to the Juicebox')
	});
	
	it('browse to home', () => {
		cy.visit('/browse')
		cy.get('#toHome').click()
		cy.contains('h1', 'Welcome to the Juicebox')
	});
	
	it('browse to login', () => {
		cy.visit('/browse')
		cy.get('#toLogin').click()
		cy.contains('h1', 'Log In To Your Account')
	});


});