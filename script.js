//board variables
var blockSize = 25;
var rows = 25;
var columns = 25;
var board;
var context; // this is the drawing object

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d"); //used to draw on the board
}