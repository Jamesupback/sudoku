const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver=new Solver;

let validstring='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
let invalidcharastring='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37z'
let solution='135762984946381257728459613694517832812936745357824196473298561581673429269145378'
let not81chara='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'

suite('Unit Tests', () => {
    test("check for 81 characters",done=>{
        assert.equal(solver.validate(validstring),true)
        done();
    })
    
    test("invalid characters in string",done=>{
        assert.equal(solver.validate(invalidcharastring),false)
        done();
    })

    test("characters not of 81 length",done=>{
        assert.equal(solver.validate(not81chara),false)
        done();
    })

    test("valid row placement",done=>{
        assert.equal(solver.checkRowPlacement(validstring,0,3),true)
        done();
    })

    test("invalid row placement",done=>{
        assert.equal(solver.checkRowPlacement(validstring,0,5),false)
        done();
    })

    test("valid col placement",done=>{
        assert.equal(solver.checkColPlacement(validstring,0,5),true)
        done();
    })

    test("invalid col placement",done=>{
        assert.equal(solver.checkColPlacement(validstring,0,3),false)
        done();
    })

    test("valid region",done=>{
        assert.equal(solver.checkRegionPlacement(validstring,0,0,3),true)
        done();
    })

    test("invalid region",done=>{
        assert.equal(solver.checkRegionPlacement(validstring,0,0,1),false)
        done();
    })

    test("valid puzzles pass",done=>{
        assert.equal(solver.validate(validstring),true)
        done();
    })

    test("invalid puzzles fail",done=>{
        assert.equal(solver.validate(invalidcharastring),false)
        done();
    })

    test("solver returns output for a valid string",done=>{
        assert.equal(solver.solve(validstring),solution)
        done();
    })
});
