# node-red-contrib-easy-oracle
Allows basic access to Oracle databases.

This node uses the query operation against the configured database. Currently supports SELECT operations.

msg.topic of previous node must hold the query for the database, and the result is returned in msg.payload.

msg.payload will contain an object with two keys, metaData and rows. Rows key is an array of values.

If nothing is found for the query, an object with an empty rows array will be returned.
