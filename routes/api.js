'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzle=req.body.puzzle;
      if(!req.body.puzzle || !req.body.coordinate|| !req.body.value)
      return res.json({ error: 'Required field(s) missing' })
      
      let regex=/^[\d|\.]+$/
      if(!regex.test(puzzle))
      return res.json({ error: 'Invalid characters in puzzle' })

      if(puzzle.toString().length!=81)
      return res.json({ error: 'Expected puzzle to be 81 characters long' })

      let coregex=/^[a-i][1-9]$/i
      if(!coregex.test(req.body.coordinate))
      return res.json({ error: 'Invalid coordinate'})

      let valregex=/^[1-9]$/i
      if(!valregex.test(req.body.value))
      return res.json({ error: 'Invalid value'})

      let conflicts=[]
      let string=req.body.puzzle
      let row=req.body.coordinate.split('')[0].toUpperCase().charCodeAt(0)-65;
      let col=parseInt(req.body.coordinate.split('')[1],10)-1
      let value=parseInt(req.body.value,10);

      if(solver.existingvalue(string,row,col,value)){
        return res.json({"valid":true})
      }

      if(solver.checkRowPlacement(string,row,value) && solver.checkColPlacement(string,col,value) && solver.checkRegionPlacement(string,row,col,value)){
        return res.json({"valid":true})
      }

      if(!solver.checkRowPlacement(string,row,value)){
        conflicts.push("row")
      }

      if(!solver.checkColPlacement(string,col,value)){
        conflicts.push("column")
      }

      if(!solver.checkRegionPlacement(string,row,col,value)){
        conflicts.push("region")
      }

      return res.json({"valid":false,"conflict":conflicts})
    })
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle=req.body.puzzle;
      if(!puzzle)
      return res.json({ error: 'Required field missing' })
      
      let regex=/^[\d|\.]+$/
      if(!regex.test(puzzle))
      return res.json({ error: 'Invalid characters in puzzle' })

      if(puzzle.toString().length!=81)
      return res.json({ error: 'Expected puzzle to be 81 characters long' })
      
      if(solver.solve(puzzle))
      return res.json({solution:solver.solve(puzzle)})
      else
      return res.json({ error: 'Puzzle cannot be solved' })
      
    });
};
