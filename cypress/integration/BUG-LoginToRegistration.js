describe('Sort filter and search', () => {

	it('go to login page', () => {
		cy.visit('/logIn')
		cy.contains('h1', 'Log In To Your Account')
	});

	it('type in info but accidentally hit register instead of login', () => {
		cy.get('input[name="uName"]').type('JohnDoe')
		cy.get('input[name="pass"]').type('Password1')
		cy.get('#goToReg').click()
	});
});