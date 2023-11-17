# 变更日志

## 1.0.4

补充package.json元数据

## 1.0.3

支持增删改查全部DML操作

# 兼容性说明

When node-oracledb is used in the default **Thin mode**, it connects directly to the Oracle Database and does not require Oracle Client libraries. Connections in this mode can be made to Oracle Database 12.1 or later.

When node-oracledb is in **Thick mode** using Oracle Client libraries, connections can be made to Oracle Database 9.2, or later, depending on the Oracle Client library version.

* Oracle Client 21 can connect to Oracle Database 12.1 or later
* Oracle Client 19, 18, and 12.2 can connect to Oracle Database 11.2 or later
* Oracle Client 12.1 can connect to Oracle Database 10.2 or later
* Oracle Client 11.2 can connect to Oracle Database 9.2 or later

The diffrent between Thin mode and Thickmode [click me](https://node-oracledb.readthedocs.io/en/latest/user_guide/appendix_a.html#featuresummary)

# Import

This project is base on [node-red-contrib-easy-oracle](https://github.com/harp-code/node-red-contrib-easy-oracle).

# node-red-contrib-easy-oracle
Allows basic access to Oracle databases.

This node uses the query operation against the configured database. Currently supports SELECT operations.

msg.topic of previous node must hold the query for the database, and the result is returned in msg.payload.

msg.payload will contain an object with two keys, metaData and rows. Rows key is an array of values.

If nothing is found for the query, an object with an empty rows array will be returned.

Note: this package depends on [**node-oracledb**](https://oracle.github.io/node-oracledb) so it depends on the Oracle Instant Client that needs to be installed as a prerequisite.
Details of installation [here](https://oracle.github.io/node-oracledb/INSTALL.html) and specifically for Linux, using zip file, [here](https://oracle.github.io/node-oracledb/INSTALL.html#instzip).
