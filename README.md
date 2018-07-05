# transfer-mssql-to-pgsql
Transfer Database from SQL Server to Postgresql using Node JS

## Requirement
Node JS v8.11.1

## Tested On 
- SQL Server Version : 14.0.3029.16
- Postgresql Server Version : 9.5
- Postgis Version : 2.2.1

## Getting Started
```sh
1. git clone https://github.com/wahyuade/transfer-mssql-to-pgsql
2. $ cd transfer-mssql-to-pgsql
3. $ npm install
4. Config file `.env`!
```
Example `.env` configuration
```
MSSQL_HOST=127.0.0.1
MSSQL_USER=USER
MSSQL_PASSWORD=SECRET
MSSQL_DB=MY_DATABASE
MSSQL_PORT=MY_DATABASE_PORT

PG_USER=127.0.0.1
PG_HOST=USER
PG_PASSWORD=SECRET
PG_DB=MY_DATABASE
PG_PORT=MY_DATABASE_PORT
```
```sh
5. $ npm start
```
Enjoy your time to transfer Database automatically
## Any Bug ?
Please report to wahyuadesasongko@gmail.com
