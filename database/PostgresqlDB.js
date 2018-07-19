const Postgresql = require('../connection/Postgresql')
const Helpers = require('pg-promise')({}).helpers
const PostgresqlDB = {
  getAllTable: async () => {
    return (await Postgresql).query('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES').then(result => {
      return result.rows
    })
  },
  isEmpty: async (table) => {
    return (await Postgresql).query('SELECT COUNT(*) AS TOTAL_ROW FROM '+table).then(result => {
      return (Number(result.rows[0].total_row) == 0)
    })
  },
  getColumnTable: async (table) => {
    return await Postgresql.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='"+table+"'").then(result => {
      let column = []
      result.rows.forEach(columnData => {
        column.push(columnData.column_name)
      })
      return column
    })
  },
  truncateTable: async (table) => {
    return Postgresql.query('TRUNCATE '+table).then(result => {
      console.log("Table "+table+" truncated")
    })
  },
  insertRow: async (table, column, dataRow, index, totalRow) => {
    let sourceKey = Object.keys(dataRow)
    let lowercaseDataRow = {}
    for(let i = 0 ; i < sourceKey.length ; i++){
      lowercaseDataRow[sourceKey[i].toLowerCase()] = dataRow[sourceKey[i]]
    }
    let data = {}
    for(let i = 0 ; i < column.length ; i++){
      data[column[i]] = (lowercaseDataRow[column[i]] == undefined) ? null : lowercaseDataRow[column[i]]
      if(column[i] == "geom") {
        data["geom"] = String("ST_SetSRID(ST_MakePoint("+
        lowercaseDataRow["longitude"]+","+
        lowercaseDataRow["latitude"]+"), 4326)")
      }
    }
    let query = Helpers.insert(data, Object.keys(data), table)

    query = query.replace("'ST_SetSRID", "ST_SetSRID").replace(", 4326)'", ", 4326)")

    await Postgresql.query(query).then(r=>{
      console.log(index + " of "+ totalRow + " in " + table)
      return
    }).catch(e => {
      console.log(e)
      return
    })
    return
  }
}

module.exports = PostgresqlDB
