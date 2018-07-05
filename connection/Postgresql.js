const {Pool, Client} = require('pg')

const client = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
})
console.log('Connecting to Postgresql Server...')
client.connect().then(d =>{
  console.log('[OK] Connected to Postgresql Server')
}).catch(e => {
  console.log('[ERROR] Failed to connect to Postgresql Server')
})

module.exports = client
