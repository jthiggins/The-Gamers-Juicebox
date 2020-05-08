import { addUpdateDeleteComments } from '../_dbApi';

// New comment
export async function post(req, res, next) {
    // 401 if not logged in
    if (req.user === undefined) {
        res.sendStatus(401);
        return;
    }

    // 400 if missing required parameters
    if (req.body.gameId === undefined || req.body.description === undefined) {
        res.sendStatus(400);
        return;
    }

    try {
        await addUpdateDeleteComments(0, req.user.id, req.body.gameId, new Date().toISOString(), req.body.description, false);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}