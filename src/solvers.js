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

  const helper = function (matrix, row) {
    // base case
    if (row === n) {
      let board = new Board(matrix);
      if (board.hasAnyColConflicts() === false) {
        console.log(matrix);
      }
      return;
    }

    for (let i = 0; i < matrix[row].length; ++i) {
      let copy = JSON.parse(JSON.stringify(matrix));

      copy[row][i] = 1;

      // console.log('matrix ' + matrix, 'copy ' + copy);

      helper(copy, row + 1);
    }
  };

  helper(matrix, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such 
// that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log(
      'Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such 
// that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
