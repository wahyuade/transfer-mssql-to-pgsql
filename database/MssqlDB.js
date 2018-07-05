const Mssql = require('../connection/Mssql')
const PostgresqlDB = require('./PostgresqlDB')

const MssqlDB = {
  getAllTable: async () => {
    let sql = await Mssql
    let request = sql.request()
    return request.query('SELECT TABLE_NAME FROM '+process.env.MSSQL_DB+'.INFORMATION_SCHEMA.TABLES')
      .then(record => {
        return record.recordset
      })
  },

  getRows: async (table) => {
    let sql = await Mssql
    let request = sql.request()
    return request.query('SELECT COUNT(*) AS TOTAL_ROW FROM '+table)
      .then(record => {
        return record.recordset[0].TOTAL_ROW
      })
  },

  transferTable: async (tableName, curr = 0) => {
    console.log("Transfering table "+tableName[curr].mssqlTable)
    if(!await PostgresqlDB.isEmpty(tableName[curr].pgTable)){
      PostgresqlDB.truncateTable(tableName[curr].pgTable)
    }
    await MssqlDB.transferRow(
      await MssqlDB.getRows(tableName[curr].mssqlTable), 
      await PostgresqlDB.getColumnTable(tableName[curr].pgTable),
      tableName[curr].pgTable)
    if (curr < tableName.length - 1) {
      await MssqlDB.transferTable(tableName, curr+1)
    } else {
      console.log("Transfer process success")
      process.exit(0)
    }
  },

  transferRow: async (totalRow, column, table) => {
    let sql = await Mssql
    let request = sql.request()
    
    return await request.query('SELECT * FROM '+table)
      .then(async record => {
          let i
          for(i = 0; i < record.recordset.length ; i++) {
            await PostgresqlDB.insertRow(table, column, record.recordset[i], i+1, totalRow)
          }
      })
  }
}

module.exports = MssqlDB

// let i = 0;

//         let column = await PostgresqlDB.getColumnTable(tableName[curr].pgTable)
//         record.recordset.forEach(async row => {
//           await PostgresqlDB.insertRow(tableName[curr].pgTable, column, row, i++, record.recordset.length)
//         })
//         if(curr < tableName.length - 1){
//           return MssqlDB.transferTable(tableName, curr+1)
//         }
//         else {
//           console.log("Transfer process success")
//           process.exit(0)
//         }
//       })