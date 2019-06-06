/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead 
// search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each other
/*
 * @param {int} n
 * @return {array} (arrays in array)
 */
window.findNRooksSolution = function (n) {
  let solution = undefined; //fixme
  let board = new Board({ 'n': n });

  let matrix = [];
  for (let i = 0; i < n; ++i) {
    matrix.push(board.attributes[i].slice());
  }

  const helper = function (matrix, row, availableCols) {
    // base case
    if (row === n) {
      let board = new Board(matrix);
      solution = matrix;
      return;
    }

    else if (solution === undefined) {
      for (let i = 0; i < availableCols.length; ++i) {
        let copy = JSON.parse(JSON.stringify(matrix));
        let index = availableCols[i];
        copy[row][index] = 1;

        // console.log('matrix ' + matrix, 'copy ' + copy);
        let copyAvailableCols = availableCols.slice()
        copyAvailableCols.splice(i, 1);
        helper(copy, row + 1, copyAvailableCols);
      }
    }
  };

  helper(matrix, 0, _.range(0, n));
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such 
// that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme
  let board = new Board({ 'n': n });

  let matrix = [];
  for (let i = 0; i < n; ++i) {
    matrix.push(board.attributes[i].slice());
  }

  const helper = function (matrix, row, availableCols) {
    // base case
    if (row === n) {
      let board = new Board(matrix);
      solutionCount++;
      return;
    }

    for (let i = 0; i < availableCols.length; ++i) {
      let copy = JSON.parse(JSON.stringify(matrix));
      let index = availableCols[i];
      copy[row][index] = 1;

      let copyAvailableCols = availableCols.slice()
      copyAvailableCols.splice(i, 1);
      helper(copy, row + 1, copyAvailableCols);
    }
  };

  helper(matrix, 0, _.range(0, n));
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  let board = new Board({ 'n': n });
  let solution = board.rows();
  let keepGoing = true;

  let matrix = [];
  for (let i = 0; i < n; ++i) {
    matrix.push(board.attributes[i].slice());
  }

  const helper = function (matrix, row, availableCols) {
    // base case
    if (row === n) {
      let board = new Board(matrix);
      if (board.hasAnyMajorDiagonalConflicts() === false &&
          board.hasAnyMinorDiagonalConflicts() === false &&
          keepGoing === true) {
        console.log(matrix);
        solution = matrix;
        keepGoing = false;
      }
      return;
    }

    else if (keepGoing === true) {  
      for (let i = 0; i < availableCols.length; ++i) {
        let copy = JSON.parse(JSON.stringify(matrix));
        let index = availableCols[i];
        copy[row][index] = 1;

        // console.log('matrix ' + matrix, 'copy ' + copy);
        let copyAvailableCols = availableCols.slice()
        copyAvailableCols.splice(i, 1);
        helper(copy, row + 1, copyAvailableCols);
      }
    }

  };

  helper(matrix, 0, _.range(0, n));
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such 
// that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; //fixme
  let board = new Board({ 'n': n });

  let matrix = [];
  for (let i = 0; i < n; ++i) {
    matrix.push(board.attributes[i].slice());
  }

  const helper = function (matrix, row, availableCols) {
    // base case
    if (row === n) {
      let board = new Board(matrix);
      if (board.hasAnyMajorDiagonalConflicts() === false &&
          board.hasAnyMinorDiagonalConflicts() === false) {
        solutionCount++;
      }
      return;
    }

    for (let i = 0; i < availableCols.length; ++i) {
      let copy = JSON.parse(JSON.stringify(matrix));
      let index = availableCols[i];
      copy[row][index] = 1;

      // console.log('matrix ' + matrix, 'copy ' + copy);
      let copyAvailableCols = availableCols.slice()
      copyAvailableCols.splice(i, 1);
      helper(copy, row + 1, copyAvailableCols);
    }
  };

  helper(matrix, 0, _.range(0, n));
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
