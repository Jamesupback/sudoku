class SudokuSolver {
  existingvalue(puzzleString,row,col,value) {
    let stringarr = puzzleString.replaceAll(".", "0").split("").map(Number);
    let sudokuarr = [];
    while(stringarr.length>0)
      sudokuarr.push(stringarr.splice(0,9))
    if(sudokuarr[row][col]==value)
    return true
  return false
  }

  validate(puzzleString){
    let regex=/^[\d|\.]+$/
    if(!regex.test(puzzleString))
    return false

    if(puzzleString.toString().length!=81)
    return false

    return true
  }

  checkRowPlacement(puzzleString, row, value) {
    let stringarr = puzzleString.replaceAll(".", "0").split("").map(Number);
    let sudokuarr = [];
    while(stringarr.length>0)
      sudokuarr.push(stringarr.splice(0,9))

    for(let i=0;i<9;i++){
      if(sudokuarr[row][i]==value)
      return false
      }
    return true
}

  checkColPlacement(puzzleString, column, value) {
    let stringarr = puzzleString.replaceAll(".", "0").split("").map(Number);
    let sudokuarr = [];
    while(stringarr.length>0)
      sudokuarr.push(stringarr.splice(0,9))

      for(let i=0;i<9;i++){
        if(sudokuarr[i][column]==value)
        return false
      }
      return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {

    let stringarr = puzzleString.replaceAll(".", "0").split("").map(Number);
    let sudokuarr = [];
    while(stringarr.length>0)
      sudokuarr.push(stringarr.splice(0,9))

      let start_row=row-row%3;
      let start_col=column-column%3;

      for(let i=0;i<3;i++)
      for(let j=0;j<3;j++){
        if(sudokuarr[i+start_row][j+start_col]==value)
        return false;
      }
      return true;
    
  }

  solve(puzzleString) {
    let stringarr = puzzleString.replaceAll(".", "0").split("").map(Number);
    let sudokuarr = [];
    while(stringarr.length>0){
      sudokuarr.push(stringarr.splice(0,9))
  } 
    function SudokuSolver(grid,row,col){
      if(row==8 && col==9)
      return true

      if(col==9){
        row++;
        col=0;
      }

      if(grid[row][col]!=0)
       return SudokuSolver(grid,row,col+1)

      for(let num=1;num<10;num++){
        if(isvalid(grid,row,col,num)){
          grid[row][col]=num;
          if(SudokuSolver(grid,row,col+1))
          return true
        }
        grid[row][col]=0;
      }
      return false
    }

    function isvalid(grid,row,col,num){
      for(let i=0;i<9;i++){
        if(grid[row][i]==num)
        return false
      }

      for(let i=0;i<9;i++){
        if(grid[i][col]==num)
        return false
      }

      let start_row=row-row%3;
      let start_col=col-col%3;

      for(let i=0;i<3;i++)
      for(let j=0;j<3;j++){
        if(grid[i+start_row][j+start_col]==num)
        return false;
      }
      return true;
    }


    
// function print(grid)
// {
//     for(let i = 0; i < 9; i++)
//     {
//         for(let j = 0; j < 9; j++)
//         process.stdout.write(grid[i][j] + " ");
             
//         console.log();
//     }
// }
  if(SudokuSolver(sudokuarr,0,0))
   return sudokuarr.flat().join('')
  else
  return false
  }
}

module.exports = SudokuSolver;
