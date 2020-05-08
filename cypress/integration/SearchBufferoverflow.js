describe('Sort filter and search', () => {

	it('can go to browse page', () => {
		cy.visit('/')
		cy.get('#toBrowse').click()
		cy.contains('h1', 'Browse Games')
	});
	
	it('overflow', () => {
		cy.get('input[name="searchInput"]').type('Buffer over flow is not an issue in java script because it would take a few million characters to overflow a variable, silly goose')
		cy.get('#go').click()
	});
});