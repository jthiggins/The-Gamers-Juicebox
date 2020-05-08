describe('Sort filter and search', () => {

	it('can go to browse page', () => {
		cy.visit('/')
		cy.get('#toBrowse').click()
		cy.contains('h1', 'Browse Games')
	});
	
	it('overflow', () => {
		cy.get('input[name="searchInput"]').type('<script>alert( \'YEET!\' );</script>')
		cy.get('#go').click()
	});
});