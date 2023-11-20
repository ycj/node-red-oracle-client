//  example
//  {
//     topic: 'select * from xxx where id=:id and name=:name',
//     payload: {
//         params: {
//             id: 1,
//             name: 'test'
//         },
//         options: {
//             autoCommit: false
//         }
//     }
// }

//The function is called with a single argument, RED, that provides the module access to the Node-RED runtime api.
module.exports = function(RED) {
    //#region requires
    const oracledb = require('oracledb')
    oracledb.fetchAsString = [ oracledb.CLOB ]

    //#endregion
    
    //#region Execution Node

    function OracleExecNode(config) {
        RED.nodes.createNode(this,config);
        const node = this;
        node.server = RED.nodes.getNode(config.server);
        
        let dbConfig =  {
            user: node.server.user,
            password: node.server.password,
            connectString : `${node.server.host}:${node.server.port}/${node.server.database}`,
            externalAuth  : false
        };
        
        if(node.server.mode === 'thick'){
            oracledb.initOracleClient({
                libDir: node.server.instantClient
            })
        }

        let connection
        oracledb.getConnection(dbConfig).then(function(conn){
            connection = conn;
        }).catch(function(err){
            node.error(err)
        });

        node.on('close', async ()=>{
            if(connection){
                try {
                    await connection.close();
                } catch (err) {
                    node.error(err)
                }
            }
        })

        node.on('input', async function(msg, send, done) {
            try {
                let sql = msg.topic;
                let binds, options, result;

                binds = {};
                if(msg.payload && msg.payload.params){
                    binds = {
                        ...binds,
                        ...msg.payload.params
                    };
                }

                options = {
                    outFormat: oracledb.OUT_FORMAT_OBJECT,
                }
                if(msg.payload && msg.payload.options){
                    options = {
                        ...options,
                        ...msg.payload.options
                    }
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
            }

            node.send(msg);
        });
    }
    //#endregion


    //#region Config Node
    
    function OracleConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
        this.database = n.database;
        this.user = n.user;
        this.password = n.password;
        this.mode=n.mode;
        this.instantClient=n.instantClient;
    }

    //#endregion
    
    RED.nodes.registerType("oracle",OracleExecNode);
    RED.nodes.registerType("oracle-config",OracleConfigNode);
}
