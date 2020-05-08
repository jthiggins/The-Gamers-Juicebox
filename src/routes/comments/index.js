import { addUpdateDeleteComments, getComments } from '../_dbApi';

export async function get(req, res, next) {
    try {
        const comments = await getComments();
        res.json(comments.recordset);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

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

// Update comment
export async function put(req, res, next) {
    // 401 if not logged in
    if (req.user === undefined) {
        res.sendStatus(401);
        return;
    }

    // 400 if missing required parameters
    if (req.body.commentId === undefined || req.body.gameId === undefined || req.body.description === undefined) {
        res.sendStatus(400);
        return;
    }

    try {
        const result = await addUpdateDeleteComments(req.body.commentId, req.user.id, req.body.gameId, new Date().toISOString(), req.body.description, false);
        if ('message' in result.recordset[0]) {
            // If message is in the record set, no comment was found; we'll assume this is because
            // the user is trying to update another user's comment 
            res.sendStatus(403);
            return;
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

// Delete comment
export async function del(req, res, next) {
    // 401 if not logged in
    if (req.user === undefined) {
        res.sendStatus(401);
        return;
    }

    // 400 if missing required parameters
    if (req.body.commentId === undefined || req.body.gameId === undefined) {
        res.sendStatus(400);
        return;
    }

    try {
        const result = await addUpdateDeleteComments(req.body.commentId, req.user.id, req.body.gameId, '', '', true);
        if ('gameRequestId' in result.recordset[0]) {
            res.sendStatus(404);
            return;
        } else if (result.recordset[0].commentId == -1) {
            res.sendStatus(403);
            return;
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}