//board variables
var blockSize = 25;
var rows = 25;
var columns = 25;
var board;
var context; // this is the drawing object


//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;


//snake body
var snakeBody = [];


//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d"); //used to draw on the board

    randomFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10) //every 100 milliseconds
}

function update() {

    if(gameOver){
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        randomFood();
    }
    

    //starting from the tail of the snake, make it go to the next "box"
    for(let i = snakeBody.length - 1 ; i>0; i-- ){
        snakeBody[i] = snakeBody[i-1];
    }

    //the body JUST before the head, goes to the position of the head
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }


    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    //to make snake body grow
    for(let i = 0; i< snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    

    //game over triggers

    //if snake goes out of bounds
    if(snakeX < 0 || snakeX > columns*blockSize - 1 || snakeY < 0 || snakeY >rows*blockSize - 1){
        gameOver = true;
        alert("Game Over *insert dramatic audio*");
    }

    //if snake hits its own body
    for(let i = 0; i<snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over *insert dramatic audio*");
        }
    }


}


//to change direction of snake head
function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }

}

//to give the food a random spawn
function randomFood(){
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}