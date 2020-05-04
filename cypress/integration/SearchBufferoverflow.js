describe('Sort filter and search', () => {

	it('can go to browse page', () => {
		cy.visit('/')
		cy.get('#toBrowse').click()
		cy.contains('h1', 'Browse Games')
	});

	it('sort', () => {
		cy.get('#sortSelect').select('A-Z');
		cy.get('#go').click();
		cy.contains('strong', 'Minecraft');
		cy.get('#sortSelect').select('Sort...');
		cy.get('#go').click();
	});

	it('filter platform', () => {
		cy.get('#platSelect').select('XBox');
		cy.get('#go').click();
		cy.contains('strong', 'Minecraft');
		cy.get('#platSelect').select('Platform...');
		cy.get('#go').click();
	});
	
	it('filter price', () => {
		cy.get('#priceSelect').select('$15-$30');
		cy.get('#go').click();
		cy.contains('strong', 'Minecraft');
		cy.get('#priceSelect').select('Price Range...');
		cy.get('#go').click();
	});
	
	it('search and related search', () => {
		cy.get('input[name="searchInput"]').type('Zelda');
		cy.get('#go').click();
		cy.contains('strong', 'The Legend of Zelda');
		cy.contains('strong', 'Grand Theft Auto V');
	});
});