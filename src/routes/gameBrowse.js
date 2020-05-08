import { getGames } from './_dbApi';

export async function get(req, res, next) {
    try {
        const result = await getGames();
        let games = [];
        for (const game of result.recordset) {
            games.push(game);
        }
        res.send(games);
    } catch (err) {
        console.log('are we here');
        res.status(500).send(err);
    }
}