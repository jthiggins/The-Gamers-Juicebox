import { getGames } from './_dbApi';
//console.log((await getGames()).recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);

export async function get(req, res, next) {
    try {
        const result = await getGames();
        let games = [];
        for (const game of result.recordset) {
            games.push(game);
        }
        console.log(games);
        res.send(games);
    } catch (err) {
        res.status(500).send(err);
    }
}