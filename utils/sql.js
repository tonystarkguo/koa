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

const REGISTER=({account,username,password,userurl="null",stats})=>`INSERT INTO customer_login(login_name,password,header_img,user_stats) VALUES ("${account}",${password},"${userurl}","${stats}")`
const CREATSERINFO=({id,account, password, username, userurl,birthday,userstats,phone,email,gender,identity_card_type=0,identity_card_no=0,user_point="",register_time=""})=>`INSERT INTO customer_inf (
	customer_id,
	customer_name,
	identity_card_type,
	identity_card_no,
	mobile_phone,
	customer_email,
	gender,
	user_point,
	birthday,
	customer_level,
	user_money
)
VALUES
	(
		"${id}",
		"${username}",
		1,
		"",
		
		"${phone}",
		"",
		"${gender}",
		0,
		"1999-09-19 00:00:00",
		0,
		0
	)`;
const UPUSERINFO=({id,account, password, username, userurl,birthday,userstats,phone,email,gender,register,level,money})=>`UPDATE customer_inf SET mobile_phone=${phone},customer_email=${email},gender="${gender}",customer_name="${username}" WHERE(customer_id=${id});`;
const USERINFO_TABLE=(customer_id)=>`SELECT
	customer_name,
	identity_card_no,
	mobile_phone,
	customer_email,
	gender,
	birthday,
	customer_level,
	user_money
FROM
	customer_inf
WHERE
	customer_id = "${customer_id}"`;
const CITY=()=>`SELECT * from city`;
module.exports = {
    CREATE_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE,
    DELETE_TABLE,
    QUERY_TABLE,
    LOGIN,
    REGISTER,
    CHECKUSER,
    CITY,
    USERINFO_TABLE,
    UPUSERINFO,
    CREATSERINFO,
};
