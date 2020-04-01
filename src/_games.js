const games = [
	{
		title: 'The Legend of Zelda',
		description: 'Explore the world freely by collecting multipurpose items to aid in objectives or solving puzzles and side quests for rewards',
		publisher: 'Nintendo',
		platform: 'Nintendo Switch',
		price: '59.99'
	},

	{
		title: 'Call of Duty',
		description: 'Follow a CIA officer and British SAS forces as they team up with rebels from Urzikstan, against Russian forces who have invaded the country',
		publisher: 'Activision',
		platform: 'PlayStation',
		price: '59.99'
	},

	{
		title: 'Super Mario Odyssey',
		description: 'Join Mario on a massive, globe-trotting 3D adventure',
		publisher: 'Nintendo',
		platform: 'Nintendo Switch',
		price: '49.99'
	},

	{
		title: 'Fortnite',
		description: 'The Agency is calling, will you join the fight?',
		publisher: 'Epic Games',
		platform: 'PlayStation',
		price: '58.99'
	},

	{
		title: 'FIFA 20',
		description: 'Authentic soccer experience',
		publisher: 'Electronic Arts',
		platform: 'PlayStation',
		price: '39.99'
	},

	{
		title: 'Donkey Kong',
		description: 'Arctic invaders have turned Donkey Kong Island into their personal frozen fortress, and it’s up to you to save the day',
		publisher: 'Nintendo',
		platform: 'Nintendo Switch',
		price: '59.99'
	},

	{
		title: 'Minecraft',
		description: 'Explore a blocky, procedurally-generated 3D world',
		publisher: 'Mojang',
		platform: 'XBox',
		price: '19.99'
	},

	{
		title: 'Grand Theft Auto V',
		description: 'Follow criminals and their efforts to commit heists while under pressure from a government agency',
		publisher: 'Rockstar Games',
		platform: 'XBox',
		price: '9.99'
	}
];

games.forEach(game => {
	game.html = game.html.replace(/^\t{5}/gm, '');
});

export default games;