const should = require('should')

describe("测试oracle常用操作", ()=>{
    let conn

    before(async ()=>{
        let oracledb = require('oracledb')
        oracledb.initOracleClient({
            libDir: 'D:\\database-driver\\instantclient_19_21'
        })
        try{
            conn = await oracledb.getConnection({
                user: 'RCHC',
                password: 'RCHC123',
                connectString : '192.168.104.235:49161/xe'
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

    // it("自增序列", async ()=>{
    //     let result = await conn.execute('select ZHZX.RED_TEST_SEQ.nextval from dual', {}, {outFormat: oracledb.OUT_FORMAT_OBJECT})
    //     console.log(result.rows)
    //     except(result.rows).to.have.lengthOf(1)
    // })

    it("测试插入", async ()=>{
        let result = await conn.execute("insert into ZHZX.RED_TEST (OBJ_ID, NAME, AGE) values (5, 'mysql', 10)", {}, {autoCommit: true})
        console.log(result)
        result.rowsAffected.should.be.equal(1)
    })

    // it("测试插入2"), async ()=>{
    //     let result = await conn.execute('insert into ZHZX.RED_TEST (OBJ_ID, NAME) values (:id, :name)', [{id: 2, name: 'test2'}], {autoCommit: true})
    //     console.log(result)
    //     except(result.rowsAffected).to.equal(1)
    // }

    after(async ()=>{
        if(conn) await conn.close()
    })
})