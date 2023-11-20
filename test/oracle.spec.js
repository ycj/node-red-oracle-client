const should = require('should')

describe("测试oracle常用操作", ()=>{
    const oracledb = require('oracledb')
    let conn

    before(async ()=>{
        oracledb.initOracleClient({
            libDir: 'D:\\database-driver\\instantclient_19_21'
        })
        try{
            conn = await oracledb.getConnection({
                user:           process.env.ORACLE_USER,
                password:       process.env.ORACLE_PASSWORD,
                connectString : process.env.ORACLE_URL
            })
        }
        catch(err){
            console.error(err)
        }
    })

    it("测试查询", async ()=>{
        let result = await conn.execute('select * from ZHZX.RED_TEST', {}, {outFormat: oracledb.OUT_FORMAT_OBJECT})
        console.log(result.rows)
        result.rows.length.should.be.above(0)
    })

    it("测试插入", async ()=>{
        let result = await conn.execute("insert into ZHZX.RED_TEST (OBJ_ID, NAME, AGE) values (5, 'mysql', 10)", {}, {autoCommit: true})
        console.log(result)
        result.rowsAffected.should.be.equal(1)
    })

    after(async ()=>{
        if(conn) await conn.close()
    })
})