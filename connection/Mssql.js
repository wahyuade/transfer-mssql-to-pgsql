const mssql = require('mssql')
const Mssql = new Promise( async (resolve, reject) => {
  let connection = 'mssql://'+process.env.MSSQL_USER+':'+
        process.env.MSSQL_PASSWORD+'@'+
        process.env.MSSQL_HOST+':'+
        process.env.MSSQL_PORT+'/'+
        process.env.MSSQL_DB
  console.log("Connecting to MSSQL Server...")
  try {
    const dbMssql = await mssql.connect(connection)
    console.log("[OK] Connected to MSSQL Server")
    resolve(dbMssql)
  } catch (e) {
    console.log("[ERROR] Failed to connect to MSSQL Server")
  }
})
module.exports = Mssql