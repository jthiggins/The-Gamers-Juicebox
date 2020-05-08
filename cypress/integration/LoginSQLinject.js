describe('Login SQL injection', () => {
	
	it('can go to registration page', () => {
		cy.visit('/register')
		cy.contains('h1', 'Register Account')
	});

	it('register dummy account to get into', () => {
		cy.get('input[name="fName"]').type('John')
		cy.get('input[name="lName"]').type('Doe')
		cy.get('input[name="email"]').type('John.Doe@gmail.com')
		cy.get('input[name="uName"]').type('JohnDoe')
		cy.get('input[name="pass"]').type('Password1')
		cy.get('#submitButton').click()
		cy.contains('p', 'Account created successfully')
	});

	it('can go to login page', () => {
		cy.get('#toLogin').click()
		cy.contains('h1', 'Log In To Your Account')
	});
	
	it('login SQL injection', () => {
		cy.get('input[name="uName"]').type('JohnDoe')
		cy.get('input[name="pass"]').type('FakePassword OR (1=1)')
		cy.get('#submitButton').click()
		cy.contains('p', 'Logged In successfully')
	});

});