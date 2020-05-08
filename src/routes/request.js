import { addUpdateDeleteRequests } from './_dbApi';

export async function post(req, res, next) {
    const result = await addUpdateDeleteRequests(0, req.body.userId.id, (new Date()), req.body.description,
                            req.body.title, parseFloat(req.body.price), req.body.platform,
                                    req.body.publisher, req.body.genre, req.body.imgSrc);
    if (result.recordset[0].gameRequestId !== -1) {
        res.end('success');
    } else {
        res.statusCode = 400;
        res.end();
    }
}