// npm install mssql
var sql = require('mssql/msnodesqlv8');

const pool = new sql.ConnectionPool({
    user: 'webuser',
    password: 'webuser',
    server: '(localdb)\\MSSQLLocalDB',
    database: 'GamersJuiceBox',
    driver: 'msnodesqlv8',
    options : {
        trustedConnection : true
    }
});

function addUpdateDeleteUsers(userId = 0, firstName, lastName, userName, email, password, deleted = false) {
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
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function validateLogin(userName, password) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('userName', userName);
        request.input('password', password);
        request.execute("spValidateLogin", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function makeModerator(userId) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('userId', userId);
        request.execute("spMakeModerator", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function demoteModerator(userId) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('userId', userId);
        request.execute("spDemoteModerator", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function makeAdmin(userId) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('userId', userId);
        request.execute("spMakeAdmin", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function demoteAdmin(userId) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('userId', userId);
        request.execute("spDemoteAdmin", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function addUpdateDeleteGames(gameId, title, price, platform, description, publisher,
                                    genre, imgSrc = '', purchaseLink = '', deleted = false) {
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
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function getGames() {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.execute("spGetAllGames", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function addUpdateDeleteRequests(gameRequestId, userId, requestDate, description, deleted = false) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('gameRequestId', gameRequestIdId);
        request.input('userId', userId);
        request.input('requestDate', requestDate);
        request.input('description', email);
        request.input('delete', deleted);
        request.execute("spAddUpdateDelete_Requests", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function approveRequest(gameRequestId, userId) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('gameRequestId', gameRequestId);
        request.input('userId', userId);
        request.execute("spApproveRequest", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function declineRequest(gameRequestId, userId) {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.input('gameRequestId', gameRequestId);
        request.input('userId', userId);
        request.execute("spDeclineRequest", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function addUpdateDeleteComments(commentId, userId, gameId, commentDate, description, deleted = false) {
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
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}

function getComments() {
    pool.connect(err => {
        const request = new sql.Request(pool);
        request.execute("spGetAllComments", (err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    }).close();
}
