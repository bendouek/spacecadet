var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var centerX = (document.body.clientWidth)/2;
var centerY = (document.body.clientHeight)/2;

var pen = new Pen('#ff6600',3);
var shelly = new Turtle(pen,"spaceship.svg");

canvas.setAttribute('width', document.body.clientWidth);
canvas.setAttribute('height', document.body.clientHeight);




function Position(x,y) {
	this.x = x;
	this.y = y;
}




function Pen(colour,lineWidth) {
	this.colour = colour || '#000';
	this.lineColour = colour || '#000';
	this.lineWidth = lineWidth || 0;
}

Pen.prototype.line = function (startPos,endPos) {
    ctx.stroke();
    ctx.beginPath();
	ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(endPos.x, endPos.y);
	ctx.fillStyle = this.colour;
	ctx.fill();
    ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = this.colour;
	ctx.stroke();
}



function Turtle(currentPen,turtleImage) {
	this.position = new Position(centerX,centerY);
	this.image = new Image();
	this.image.src = turtleImage;
	this.pen = currentPen;
	this.angle = 0;
}

Turtle.prototype.changePen = function (newPen) {
	this.pen = newPen;
}

Turtle.prototype.changeImage = function (newImage) {
	this.image.src = newImage;
}

Turtle.prototype.rightTurn = function (newAngle) {
	this.angle += newAngle;
	//this.angle %= 360;
}

Turtle.prototype.leftTurn = function (newAngle) {
	this.angle -= newAngle;
	//this.angle %= 360;
}

Turtle.prototype.moveTo = function (x,y) {
	this.position = new Position(x,y);
}

Turtle.prototype.forward = function (steps) {
	for(var j = 0; j < steps; j += 1){
		var newPosition = new Position( this.position.x+(1*Math.cos( this.angle*(Math.PI/180) )) , this.position.y+(1*Math.sin( this.angle*(Math.PI/180) )) );
		this.pen.line(this.position,newPosition);
		this.position = newPosition;
	}
}

Turtle.prototype.backwards = function (steps) {
	for(var j = 0; j < steps; j += 1){
		this.leftTurn(180);
		newPosition = new Position( 1 * this.position.x+(1*Math.cos(this.angle*(Math.PI/180) )) , 1 * this.position.y+(1*Math.sin(this.angle*(Math.PI/180) )) );
		this.rightTurn(180);
		this.pen.line(this.position,newPosition);
		this.position = newPosition;
	}
}



function clearCanvas () {
	canvas.width = canvas.width;
} 

function canvasBackground (color) {
	ctx.fillRect(0,0,centerX*2,centerY*2);
}

function compute (string, repeat) {
    var str = string;
	var str = str.split(" ");
	//alert("compute: "+ string);

	for(var i=0; i<repeat; i+=1){

		for(var j=0; j<str.length; j+=1){

			if(str[j] == "forward" || str[j] == "fd"){
				//alert("going forward "+ str[j+1]);
				shelly.forward(parseInt(str[j+1]));
			}
			if(str[j] == "backward" || str[j] == "bk"){
				//alert("bk "+ str[j+1]);
				shelly.backwards(parseInt(str[j+1]));
			}
			if(str[j] == "right" || str[j] == "rt"){
				//alert("rt  "+str[j+1]);
				shelly.rightTurn(parseInt(str[j+1]));
			}
			if(str[j] == "left" || str[j] == "lt"){
				//alert("lt "+str[j+1]);
				shelly.leftTurn(parseInt(str[j+1]));
			}
			if(str[j] == "repeat"){
				var matches = string.match(/\[(.*?\[.*?\].*?)\]/);
				if(matches == null) {
					matches = string.match(/\[(.*?)\]/);
					if(matches != null){
						//alert(matches[1]);
						compute(matches[1],parseInt(str[j+1]));
					}
				}
				else {
					//alert(matches[1]);
					compute(matches[1],parseInt(str[j+1]));
				}
				
			}
		}
	}
}


function go () {
	clearCanvas ();
	canvasBackground('#000');
	shelly.angle = 0;
	shelly.position = new Position(centerX,centerY);

	var str = document.getElementById("Logoarea").value; 
	compute(str,1);
}


