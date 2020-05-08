import { getRequests } from "./_dbApi";

export async function get(req, res, next) {
    try {
        const requests = await getRequests();
        res.json(requests.recordset);
        console.log(requests);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
