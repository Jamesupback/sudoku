const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let validpuzzle='5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
let solution='568913724342687519197254386685479231219538467734162895926345178473891652851726943';
let invalidcharapuzzle='5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...z';
let invalidlengthpuzzle='5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...345';
let cantsolvepuzzle="1.5..2.84..63.12.7.2..5.....9..1....8.2.3634.3.7.2..9.47...8..1..16....926914.37."
suite('Functional Tests', () => {
    suite("/api/solve tests",()=>{
        test("solving a valid puzzle string",done=>{
            chai.request(server)
                .post("/api/solve")
                .send({"puzzle":validpuzzle})
                .end((err,res)=>{
                    assert.equal(res.status,200);
                    assert.equal(res.body.solution,solution)
                })
                done();
        })
        
        test("solving a missing puzzle string",done=>{
            chai.request(server)
                .post('/api/solve')
                .send({puzzle:''})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,'Required field missing')
                })
                done();
        })

        test("solving a puzzle with invalid characters",done=>{
            chai.request(server)
                .post('/api/solve')
                .send({puzzle:invalidcharapuzzle})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,"Invalid characters in puzzle")
                })
                done();
        })

        test("solving puzzle with incorrect length",done=>{
            chai.request(server)
                .post('/api/solve')
                .send({puzzle:invalidlengthpuzzle})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,"Expected puzzle to be 81 characters long")
                })
                done();
        })

        test("solving a puzzle that can't be solved",done=>{
            chai.request(server)
                .post('/api/solve')
                .send({puzzle:cantsolvepuzzle})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,'Puzzle cannot be solved')
                })
                done();
        })

    })

    suite("/api/check tests",()=>{
        test("check puzzle placement with all fields",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:validpuzzle,coordinate:'a2',value:'4'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.valid,true)
                })
                done();
        })

        test("single placement conflict",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:validpuzzle,coordinate:'a2',value:'7'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.valid,false)
                    assert.equal(res.body.conflict[0],'row')
                })
                done();
        })

        test("multiple placement conflict",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:validpuzzle,coordinate:'a2',value:'2'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.valid,false)
                    assert.equal(res.body.conflict[0],'row')
                    assert.equal(res.body.conflict[1],'column')
                })
                done();
        })

        test("all placement conflicts",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:validpuzzle,coordinate:'a2',value:'9'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.valid,false)
                    assert.equal(res.body.conflict[0],'row')
                    assert.equal(res.body.conflict[1],'column')
                    assert.equal(res.body.conflict[2],'region')
                })
                done();
        })

        test("missing required fields",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:validpuzzle})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,"Required field(s) missing")
                })
                done();
        })

        
        test("invalid characters in string",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:invalidcharapuzzle,coordinate:'a2',value:'3'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,"Invalid characters in puzzle")
                })
                done();
        })

        test("incorrect length of string",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:invalidlengthpuzzle,coordinate:'a2',value:'3'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,"Expected puzzle to be 81 characters long")
                })
                done();
        })

        test("invalid placement of coordinates",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:validpuzzle,coordinate:'z2',value:'3'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,"Invalid coordinate")
                })
                done();
        })

        test("invalid placement of coordinates",done=>{
            chai.request(server)
                .post('/api/check')
                .send({puzzle:validpuzzle,coordinate:'a2',value:'34'})
                .end((err,res)=>{
                    assert.equal(res.status,200)
                    assert.equal(res.body.error,"Invalid value")
                })
                done();
        })
    })
});

