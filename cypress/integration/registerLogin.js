describe('Sort filter and search', () => {

	it('can go to registration page', () => {
		cy.visit('/register')
		cy.contains('h1', 'Register Account')
	});

	it('register', () => {
		cy.get('input[name="fName"]').type('John')
		cy.get('input[name="lName"]').type('Doe')
		cy.get('input[name="email"]').type('John.Doe@gmail.com')
		cy.get('input[name="uName"]').type('JohnDoe')
		cy.get('input[name="pass"]').type('Password1')
		cy.get('#submitButton').click()
		cy.contains('p', 'Account created successfully')
	});
	
	it('can go to login page', () => {
		cy.visit('/logIn')
		cy.contains('h1', 'Log In To Your Account')
	});

	it('login', () => {
		cy.get('input[name="uName"]').type('JohnDoe')
		cy.get('input[name="pass"]').type('Password1')
		cy.get('#submitButton').click()
		cy.contains('p', 'Logged In successfully')
	});
});