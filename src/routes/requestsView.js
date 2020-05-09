import { getRequests } from "./_dbApi";

export async function get(req, res, next) {
    try {
        const result = await getRequests();
        let requests = [];
        for (const request of result.recordset) {
            requests.push(request);
        }
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
