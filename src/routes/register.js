import { addUpdateDeleteUsers } from './_dbApi';

export async function post(req, res, next) {
    const result = await addUpdateDeleteUsers(0, req.body.firstName, req.body.lastName, req.body.username, req.body.email, req.body.password);
    if (result.recordset[0].userId !== -1) {
        res.end('success');
    } else {
        res.statusCode = 400;
        res.end();
    }
}