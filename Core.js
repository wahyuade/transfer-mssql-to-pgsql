require('dotenv').config()

const MssqlDB = require('./database/MssqlDB');
const PostgresqlDB = require('./database/PostgresqlDB');

(async () => {
  let mssqlTable = await MssqlDB.getAllTable()
  let pgTable = await PostgresqlDB.getAllTable()

  let processTable = require('./CustomTable')
  console.log("Get information match table name")
  mssqlTable.forEach(table => {
    let tableName = table.TABLE_NAME.toLowerCase()
    for(let i = 0 ; i < pgTable.length ; i++){
      if(tableName == pgTable[i].table_name) {
        console.log('MSSQL TABLE = ' + table.TABLE_NAME + ' with PGSQL TALBE = '+ pgTable[i].table_name)
        processTable.push({
          mssqlTable: table.TABLE_NAME,
          pgTable: pgTable[i].table_name
        })
        break
      }
    }
  })
  await MssqlDB.transferTable(processTable)
})()