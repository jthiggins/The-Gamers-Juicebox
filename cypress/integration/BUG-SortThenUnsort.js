describe('Sort filter and search', () => {

	it('go to browse page', () => {
		cy.visit('/')
		cy.get('#toBrowse').click()
		cy.contains('h1', 'Browse Games')
	});

	it('sort then unsort but page doesn't reset', () => {
		cy.get('#sortSelect').select('$-$$$')
		cy.get('#go').click()
		cy.get('#sortSelect').select('Sort...')
		cy.get('#go').click()
	});
});