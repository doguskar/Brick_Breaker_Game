var cnv = document.getElementById("container");
var ctx = cnv.getContext("2d");
var widthOfBricks = 100;
var heightOfBricks = 25;
var heightOfStick = 10;
var ballColor = '#09f';
var x = cnv.width/2;
var y = cnv.height-50;
var dx = 2;
var dy = -2;
var ballR = 7.5
var stickW = 60;
var stickH = 10;
var stickX = (cnv.width-stickW)/2;
var rightPressed = false;
var leftPressed = false;
var bricks = new Array();
var score = 0;
bricks.push({
	x: 220,
	y: 50,
	color: 'red',
	point: 20,
	status: 1
});
bricks.push({
	x: 350,
	y: 50,
	color: 'blue',
	point: 40,
	status: 1
});
bricks.push({
	x: 480,
	y: 50,
	color: 'green',
	point: 80,
	status: 1
});
bricks.push({
	x: 285,
	y: 100,
	color: 'purple',
	point: 60,
	status: 1
});
bricks.push({
	x: 415,
	y: 100,
	color: 'yellow',
	point: 50,
	status: 1
});
bricks.push({
	x: 300,
	y: 190,
	color: 'black',
	point: 0,
	status: 1,
	obstacle: 1
});

var interval = setInterval(drawGame, 10);

function drawScore(){
	ctx.font = "30px Arial";
	ctx.fillText("Score: " + score, 0, 500);
}
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballR, 0, Math.PI*2, false);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}
function drawStick(){
	ctx.beginPath();
	ctx.rect(stickX, cnv.height-stickH, stickW, stickH);
	ctx.fillStyle = "#09f";
	ctx.fill();
	ctx.closePath();
}
function drawBricks(){
	if(bricks.length > 1){
		for(var i = 0; i < bricks.length; i++){
			if(bricks[i].obstacle == undefined){debugger;
				if(bricks[i].status == 1){
					ctx.beginPath();
					ctx.rect(bricks[i].x, bricks[i].y, widthOfBricks, heightOfBricks);
					ctx.fillStyle = bricks[i].color;
					ctx.fill();
					ctx.closePath();
				}
			}else{
				ctx.beginPath();
				ctx.rect(bricks[i].x, bricks[i].y, 125, 10);
				ctx.fillStyle = bricks[i].color;
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
function collisions(){
	for(var i = 0; i < bricks.length; i++){
		var brick = bricks[i];
		if(brick.status == 1) {
			if(x > brick.x && x < brick.x+widthOfBricks && y > brick.y && y < brick.y+heightOfBricks) {
				dy = -dy;
				if(brick.obstacle == undefined){
					brick.status = 0;
					score += brick.point;
					ballColor = brick.color;
				}
					if(score == 250){
						alert("Congratulations! Score: " + score);
						document.location.reload();
						clearInterval(interval);
					}

			}
		}
	}
}
function drawGame(){
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	
	drawScore();
	drawStick();
	drawBall();
	drawBricks();
	collisions();
	
	if(x + dx > cnv.width-ballR || x + dx < ballR)
        dx = -dx;
    if(y + dy < ballR)
        dy = -dy;
    else if(y + dy > cnv.height-ballR) {
        if(x > stickX && x < stickX + stickW) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
	
	if(rightPressed && stickX < cnv.width-stickW) {
        stickX += 5;
    }
    else if(leftPressed && stickX > 0) {
        stickX -= 5;
    }
	
    x += dx;
    y += dy;
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - cnv.offsetLeft;
    if(relativeX > 0 && relativeX < cnv.width) {
        stickX = relativeX - stickW/2;
    }
}


