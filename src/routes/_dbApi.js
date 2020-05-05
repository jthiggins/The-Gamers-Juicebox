// npm install mssql\
// npm install msnodesqlv8
var sql = require('mssql/msnodesqlv8');

const pool = new sql.ConnectionPool({
    user: 'webuser',
    password: 'webuser',
    server: 'localhost\\MSSQLLocalDB',
    database: 'GamersJuiceBox',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
});

export async function addUpdateDeleteUsers(userId = 0, firstName, lastName, userName, email, password, deleted = false) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('userId', userId);
            request.input('firstName', firstName);
            request.input('lastName', lastName);
            request.input('userName', userName);
            request.input('email', email);
            request.input('password', password);
            request.input('delete', deleted);
            request.execute("spAddUpdateDelete_User", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function validateLogin(userName, password) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('userName', userName);
            request.input('password', password);
            request.execute("spValidateLogin", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function makeModerator(userId) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('userId', userId);
            request.execute("spMakeModerator", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function demoteModerator(userId) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('userId', userId);
            request.execute("spDemoteModerator", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function makeAdmin(userId) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('userId', userId);
            request.execute("spMakeAdmin", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function demoteAdmin(userId) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('userId', userId);
            request.execute("spDemoteAdmin", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function addUpdateDeleteGames(gameId, title, price, platform, description, publisher,
    genre, imgSrc = '', purchaseLink = '', deleted = false) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('gameId', gameId);
            request.input('title', title);
            request.input('price', price);
            request.input('platform', platform);
            request.input('description', email);
            request.input('publisher', publisher);
            request.input('genre', genre);
            request.input('imgSrc', imgSrc);
            request.input('purchaseLink', purchaseLink);
            request.input('delete', deleted);
            request.execute("spAddUpdateDelete_Games", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function getGames() {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.execute("spGetAllGames", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function addUpdateDeleteRequests(gameRequestId, userId, requestDate, description, deleted = false) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('gameRequestId', gameRequestIdId);
            request.input('userId', userId);
            request.input('requestDate', requestDate);
            request.input('description', email);
            request.input('delete', deleted);
            request.execute("spAddUpdateDelete_Requests", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function approveRequest(gameRequestId, userId) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('gameRequestId', gameRequestId);
            request.input('userId', userId);
            request.execute("spApproveRequest", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function declineRequest(gameRequestId, userId) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('gameRequestId', gameRequestId);
            request.input('userId', userId);
            request.execute("spDeclineRequest", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function addUpdateDeleteComments(commentId, userId, gameId, commentDate, description, deleted = false) {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.input('gameId', gameId);
            request.input('title', title);
            request.input('price', price);
            request.input('platform', platform);
            request.input('description', email);
            request.input('publisher', publisher);
            request.input('genre', genre);
            request.input('imgSrc', imgSrc);
            request.input('purchaseLink', purchaseLink);
            request.input('delete', deleted);
            request.execute("spAddUpdateDelete_Games", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}

export async function getComments() {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            const request = new sql.Request(pool);
            request.execute("spGetAllComments", (err, result) => {
                if (err) reject(err);
                else resolve(result);
                pool.close();
            });
        });
    });
}
