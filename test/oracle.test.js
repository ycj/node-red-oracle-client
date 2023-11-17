

describe("测试oracle常用操作", ()=>{
    let oracledb, conn
    before(async ()=>{
        oracledb = require('oracledb')
        conn = await oracledb.getConnection({
            user: 'RCHC',
            password: 'RCHC123',
            connectString : '192.168.104.235:49161/xe'
        })
        except(conn).to.be.an('object')
    })

    it("测试查询", async ()=>{
        let data = await conn.execute('select * from ZHZX.RED_TEST where OBJ_ID=1')
        except(data).not.be.null
    })

    after(async ()=>{
        await conn.close()
    })
})