// npm install mssql
var sql = require('mssql');

var sqlConfig = {
  user: 'sa',
  password: 'admin',
  server: 'localhost',  
  database: 'GamersJuiceBox'
};

(async function () {
  try {
    console.log("sql connecting...")
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request()
      request.query("exec ValidateLogin @userName='"+ uName +"', @password='"+ pass +"';", function (err, recordset))

    console.log(result )

  } catch (err) {
    console.log(err);
  }
})()
