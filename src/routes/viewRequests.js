import { approveRequest, declineRequest, addUpdateDeleteGames } from './_dbApi';

export async function post(req, res, next) {
    if (req.body.isAccepted === 1) {
        const result = await approveRequest(req.body.requestId, req.body.userId.id);
        if (result.recordset[0].message === 'Request accepted') {
            const gameRes = await addUpdateDeleteGames(0, req.body.title, req.body.price, req.body.platform,
                            req.body.description, req.body.publisher, req.body.genre, req.body.imgSrc, '', false);
            if (gameRes.recordset[0].gameId !== -1) {
                res.end('success');
            } else {
                res.statusCode = 400;
                res.end();
            }
        } else {
            res.statusCode = 400;
            res.end();
        }
    } else{
        const result = await declineRequest(req.body.requestId, req.body.userId.id);
        if (result.recordset[0].message === 'Request declined') {
            res.end('success');
        } else {
            console.log('noob?');
            res.statusCode = 400;
            res.end();
        }
    }
}