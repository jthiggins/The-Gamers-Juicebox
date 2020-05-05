import { validateLogin } from './_dbApi';

export async function post(req, res, next) {
    try {
        const result = await validateLogin(req.body.username, req.body.password);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    } catch (err) {
        console.error(err);
        res.end();
    }
}