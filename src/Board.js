// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var count = 0;
      var row = this.get(rowIndex);

      for (let i = 0; i < row.length; ++i) {
        var val = row[i];
        if (count >= 2) {
          return true;
        }
        if (val !== 0) {
          count += 1;
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      var rows = this.get('n');

      for (let i = 0; i < rows; ++i) {
        let hasConflict = this.hasRowConflictAt(i);
        if (hasConflict === true) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var count = 0;
      // var col = this.get(colIndex);

      for (var i = 0; i < this.get('n'); i++) {
        var row = this.get(i);
        var val = row[colIndex];

        if (val !== 0) {
          count++;
        }

        if (count >= 2) {
          return true;
        }
      }
      return false; // fixme
    },

    // TODO fix columns
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var cols = this.get('n');
      for(var i = 0; i < cols; i++){
        let hasConflict = this.hasColConflictAt(i);

        if(hasConflict){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (/*majorDiagonalColumnIndexAtFirstRow*/col, row) {
      //diagonal method will need both columns and rows
      //access row and column simultaneously
      //restrict column to n-1 and row to n-2 at start, then col n-1 row n-1
      let count = 0;
      let n = this.get('n');
      while(row < n && col < n){
        let currentRow = this.get(row);
        let val = currentRow[col];
        row++;
        col++;
        if(val === 1){
          count++;
        }
        if(count > 1){
          return true;
        }
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      let n = this.get('n');
      let hasConflict = false;
      for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
          hasConflict = this.hasMajorDiagonalConflictAt(j, i);
          if(hasConflict === true) {
            break;
          }
        }
        if (hasConflict === true) {
          break;
        }
      }
      return hasConflict; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (col, row) {
      let count = 0;
      let n = this.get('n');
      while(row < n && col >= 0) {
        let currentRow = this.get(row);
        let val = currentRow[col];
        if(val === 1){
          count++;
        }
        row++;
        col--;
        if(count > 1){
          return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      let n = this.get('n');
      let hasConflict = false;
      for(let i = 0; i < n; i++){
        for(let j = n - 1; j >= 0; j--){
          hasConflict = this.hasMinorDiagonalConflictAt(j, i);
          if(hasConflict === true) {
            break;
          }
        }
        if (hasConflict === true) {
          break;
        }
      }
      return hasConflict; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
