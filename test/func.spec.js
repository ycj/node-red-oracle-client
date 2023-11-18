const should = require('should')

describe("模块测试", ()=>{
    it("对象属性探测", ()=>{
        let obj = {name: 'test', age: 10}
        obj.should.have.property('name')
    })
    it("测试 {...object}", ()=>{
        let payload = {name: 'test1', age: 10}
        let obj = {name: 'test2', ...payload}
        // console.log(obj)
        obj.name.should.be.equal('test1')
    })
})