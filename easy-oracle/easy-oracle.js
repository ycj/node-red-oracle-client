module.exports = function(RED) {
    //#region requires
    const oracledb = require('oracledb')
    oracledb.fetchAsString = [ oracledb.CLOB ];

    //#endregion
    
    //#region Execution Node
    

    const READ='READ';
    const WRITE='WRITE';

    function EasyOracleExecutionNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.server = RED.nodes.getNode(config.server);

        // {
        //     topic: 'select * from xxx where id=:id and name=:name',
        //     payload: {
        //         params: {
        //             id: 1,
        //             name: 'test'
        //         },
        //         mode: READ or WRITE
        //     }
        // }
        node.on('input', async function(msg, send, done) {

            let connection;

            try {
                let sql = msg.topic;
                let binds, options, result;

                dbConfig =  {
                    user: node.server.user,
                    password: node.server.password,
                    connectString : `${node.server.host}:${node.server.port}/${node.server.database}`,
                    externalAuth  : false
                };
                connection = await oracledb.getConnection(dbConfig);

                if(msg.payload && msg.payload.params){
                    binds = msg.payload.params;
                }
                else {
                    binds = {};
                }

                options = {
                    outFormat: oracledb.OUT_FORMAT_OBJECT,
                };

                if(msg.payload && msg.payload.mode===WRITE){
                    options.autoCommit = true;
                }

                result = await connection.execute(sql, binds, options);
                msg.payload = result;
            } catch (err) {
				if(done){
					done(err);
				}
				else {
					node.error(err)
				}
            } finally {
                if (connection) {
                    try {
                        await connection.close();
                    } catch (err) {
						if(done){
							done(err);
						}
						else {
							node.error(err)
						}
                    }
                }
            }
            node.send(msg);
        });
    }
    //#endregion
    
    //#region Config Node
    
    function EasyOracleConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
        this.database = n.database;
        this.user = n.user;
        this.password = n.password;
    }

    //#endregion
    
    RED.nodes.registerType("oracle",EasyOracleExecutionNode);
    RED.nodes.registerType("oracle-config",EasyOracleConfigNode);
}
