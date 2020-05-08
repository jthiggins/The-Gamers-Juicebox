import { getComments } from "../_dbApi";

export async function get(req, res, next) {
    try {
        const { gameId } = req.params;
        const comments = await getComments();
        let result = comments.recordset.filter(comment => comment.gameId == gameId);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}