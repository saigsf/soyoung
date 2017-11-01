<?php
// $mysqlhost="qdm114548101.my3w.com";
// $mysqlname="qdm114548101";
// $password="saigsf2270029397";
// $dbname="qdm114548101_db";
$mysqlhost="69.171.77.35";
$mysqlname="root";
$password="saigsf";
$dbname="message";
$conn = mysql_connect($mysqlhost, $mysqlname, $password);
mysql_select_db($dbname, $conn);
//设置字符集
mysql_query("SET NAMES UTF8 ");


?>