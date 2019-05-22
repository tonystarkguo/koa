// 创建数据库
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS user(
    user_id INT(5) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_phone VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);`.replace(/[\r\n]/g, '')

const {query}=require("./query")
// 查询数据表
const QUERY_TABLE = (tableName) => `SELECT * FROM ${tableName}`

// 插入数据
const INSERT_TABLE = (tableName, {key, val}) => `INSERT INTO ${tableName}(${key}) VALUES (${val})`

// 更新数据
const UPDATE_TABLE = (tableName, {primaryKey, primaryVal}, {key, value}) => `UPDATE ${tableName} SET ${key}=${val} WHERE(${primaryKey}=${primaryVal});`

// 删除数据
const DELETE_TABLE = (tableName, {primaryKey, primaryVal}) => `DELETE FROM customer_login WHERE(${primaryKey}=${primaryVal});`

const CHECKUSER=(account)=>`SELECT * FROM customer_login where login_name="${account}"`

const LOGIN=({account,password})=>`SELECT * FROM customer_login where login_name="${account}" AND password="${password}"`

const register=({account,username,password,userurl="null"})=>`INSERT INTO customer_login(account,username,password,userurl) VALUES (${account},"${username}",${password},"${userurl}")`

const CITY=()=>`SELECT * from city`;
module.exports = {
    CREATE_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE,
    DELETE_TABLE,
    QUERY_TABLE,
    LOGIN,
    register,
    CHECKUSER,
    CITY,
}