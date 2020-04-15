describe('Sort filter and search', () => {

	it('can go to browse page', () => {
		cy.visit('/')
		cy.get('#toBrowse').click()
		cy.contains('h1', 'Browse Games')
	});

	it('games have fields', () => {
		cy.contains('strong', 'Minecraft').click();
		cy.contains('p', 'Description: Explore a blocky, procedurally-generated 3D world');
		cy.contains('p', 'Genre: Sandbox, Survival');
		cy.contains('p', 'Publisher: Mojang');
		cy.contains('p', 'Platforms: XBox');
		cy.contains('p', 'Price: $19.99');
	});
});