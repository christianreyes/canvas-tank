/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title:			Project 2: Doodle!
Author : 		Christian Reyes 
Description:    Javascript for Doodle
Course:         05-433D SSUI Web Lab
Created : 		29 Sep 2011
Modified : 		 9 Oct 2011
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

// gravity idea: http://www.rodedev.com/tutorials/gamephysics/

// global variables for the canvas dimensions
var _canvas_width = 800;
var _canvas_height = 500;

// easy to access objects
var _doodle = undefined;
var _ground = undefined;
var _truck_container = undefined;
var _arrows = []; 

// contains the balloons flying across the screen
var _balloons = [];

// in milliseconds
var _time_step = 10;
var _time_s_to_ms = _time_step / 1000;

// magical gravity values. px per frame
var _gravity = 5;
var _gravity_increment = _gravity * _time_s_to_ms;

// magnitude of the shot in px per sec
var _power = 8;

var _kill_radius = 12;

// _fire true means the arrow is flying in the air and another can't be fired
// _fire false means that another arrow can be fired
var _fire = false;

// text object which contains the numerical score
var _score = undefined;

// upper and lower bounds for the xVelocity of the balloons
var _balloon_min_x = 1;
var _balloon_max_x = 3;

var _arrow_degree_vary = .1;

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

	// set the canvas to the proper width and height
	canvas.style.width = _canvas_width + "px";
	canvas.style.height = _canvas_height + "px";
    canvas.width = _canvas_width;
    canvas.height = _canvas_height;

    _doodle = new Doodle(context);
	
	_ground = new Container({
		width: _canvas_width,
		height: 50,
		left: 0,
		fill: "brown",
		top: _canvas_height - 50,
		borderWidth: 2
	});

	_truck_container = new Container({
		width: 80,
		height: 80,
		left: 10,
		top: _canvas_height - _ground.height - 80,
		borderWidth: 0
	});

	_launcher = new Container({
		top: 55,
		left: 10,
		width: 40,
		height: 10,
		theta: -Math.PI / 3,
		fill: "#156100",
		borderWidth: 1
	});

	var wheel1 = new Arc({
        centerX: 11,
        centerY: 72,
        lineWidth: 1,
        radius: 7,
		fill: "#333",
        startingTheta: 0,
        endingTheta: Math.PI * 2
    });
	
	var wheel2 = new Arc({
        centerX: 28,
        centerY: 72,
        lineWidth: 1,
        radius: 7,
		fill: "#333",
        startingTheta: 0,
        endingTheta: Math.PI * 2
    });
	
	var wheel3 = new Arc({
        centerX: 68,
        centerY: 72,
        lineWidth: 1,
		fill: "#333",
        radius: 7,
        startingTheta: 0,
        endingTheta: Math.PI * 2
    });
	
	var body = new Container({
        top: 60,
		left:0,
        height: 8,
		width: 80,
		fill: "#156100",
        borderWidth: 1
    });
	
	_truck_container.children = [wheel1, wheel2, wheel3, body, _launcher];
	
	var scoreText = new Text({
		left: 20, 
		height: 40, 
		content: "Score: " 
	});
	
	_score = new Text({ 
		left: 80, 
		height: 40, 
		content: "0" 
	});

    _doodle.children = [ scoreText, _score, _ground, _truck_container];

    _doodle.draw();

	// track the keys pressed
	window.addEventListener('keydown',doKeyDown,true);

	// create balloons every 1.75 seconds
	setInterval(createBalloons, 1750);
	
	// draw the frame every _time_step ms
    setInterval(updateAndDraw, _time_step);
};

function createBalloons(){
	var balloon_container = new Container({
		top: Math.random() * (_canvas_height - 70),
		left: _canvas_width + 10,
		height: 16,
		width: 16,
		borderWidth: 0,
		xVelocity: _balloon_min_x + (Math.random()* (_balloon_max_x - _balloon_min_x))
	}); // xVelocity between the min and max
	
	var balloon = new Arc({
        centerX: 8,
        centerY: 8,
        lineWidth: 1,
		fill: "red",
        radius: 6,
        startingTheta: 0,
        endingTheta: Math.PI * 2
    });
	
	balloon_container.children = [balloon];
	_doodle.children.push(balloon_container);
	
	// keeps track of the balloons
	_balloons.push(balloon_container);
}

function moveBalloons(){
	for(var b=0;b<_balloons.length;b++){
		var balloonC = _balloons[b];
		
		// move the balloon left
		balloonC.left -= balloonC.xVelocity;
		
		// if the balloon is off the screen make it disappear
		if(balloonC.left + 15 < 0){
			// remove balloon from objects to be drawn and objects to be moved
			_balloons.splice(b,1);
			for(var i =0;i<_doodle.children.length;i++){
				if(_doodle.children[i] == balloonC){
					_doodle.children.splice(i,1);
				}
			}
		}
	}
}

function killBalloons(){
	// if the arrow is 15 px or less close to the balloon. Make the balloon dissapear and add 1 to the score
	for(var b=0;b<_balloons.length;b++){
		var balloon = _balloons[b];
		
		for(var a=0;a<_arrows.length;a++){
			var arrow=_arrows[a];
			
			if( Math.abs(balloon.left - arrow.left) <= _kill_radius && Math.abs(balloon.top - arrow.top) <= _kill_radius){
					// remove balloon from objects to be drawn and objects to be moved
					_balloons.splice(b,1);
					for(var i =0;i<_doodle.children.length;i++){
						if(_doodle.children[i] == balloon){
							_doodle.children.splice(i,1);
							// increase the score by one
							_score.content = parseInt(_score.content,10) + 1;
						}
					}
			} 
		}
	}
}

function updateAndDraw() {
	_doodle.context.clearRect(0,0,_canvas_width, _canvas_height - 50);
	
	killBalloons();
	moveBalloons();
	moveArrows();
	
	// update the canvas
    _doodle.draw();
}

function moveArrows() {
	// if the arrow is in the canvas, move it
	for(var i=0;i<_arrows.length;i++){
		var arrow = _arrows[i];
		if (arrow.top < _canvas_height && arrow.left < _canvas_width) {	
			arrow.yVelocity += _gravity_increment;
			
			var oldLeft = arrow.left;
			var oldTop = arrow.top;
			var newLeft = oldLeft + arrow.xVelocity;
			var newTop = oldTop + arrow.yVelocity;
			
			var angToGround = Math.atan( (newTop - oldTop ) / (newLeft - oldLeft) );
			
			arrow.left += arrow.xVelocity; 
			arrow.top += arrow.yVelocity;
			arrow.theta = angToGround;

		} else {
			// if the arrow is out of the canvas, kill it
			_arrows.splice(i,1);
			for(var j =0;j<_doodle.children.length;j++){
				if(_doodle.children[j] == arrow){
					_doodle.children.splice(j,1);
				}
			}
		}
	}
}

//http://html5.litten.com/moving-shapes-on-the-html5-canvas-with-the-keyboard/
//http://www.cambiaresearch.com/c4/702b8cd1-e5b0-42e6-83ac-25f0306e3e25/javascript-char-codes-key-codes.aspx

function doKeyDown(evt){
  switch (evt.keyCode) {
    case 38:  /* Up arrow was pressed. move the arrow and launcher accordingly */
		if( _launcher.theta + Math.PI/2 > .2){
			_dirty = true;
			_launcher.theta -= .05;
			// don't change the arrow if it's currently flying
			if(!_fire) {
				_arrow_container.theta = _launcher.theta;
				_arrow_container.xVelocity = _power * Math.cos(-1 * _arrow_container.theta);
				_arrow_container.yVelocity = -1 * _power * Math.sin(-1 *_arrow_container.theta);
			}
		}
		break;
    case 40:  /* Down arrow was pressed. move the arrow and launcher accordingly */
		if( _launcher.theta < -.05){
			_launcher.theta += .05
			if(!_fire){
				_arrow_container.theta = _launcher.theta;
				_arrow_container.xVelocity = _power * Math.cos(-1 * _arrow_container.theta);
				_arrow_container.yVelocity = -1 * _power * Math.sin(-1 * _arrow_container.theta);
			}
		}
      break;
    case 37:  /* Left arrow was pressed. move the arrow and launcher accordingly */
		if(_truck_container.left > 5){
			_truck_container.left -= 3;
			if(!_fire) {
				_arrow_container.left = _truck_container.left + _launcher.left; 
			}
		}
		break;
    case 39:  /* Right arrow was pressed */
		if(_canvas_width - _truck_container.left + _truck_container.width > 5){
			_truck_container.left += 3;
			if(!_fire) {
				_arrow_container.left = _truck_container.left + _launcher.left; 
			}
		}      
		break;
	case 32:  /* Space bar was pressed. Launch an arrow */
		createArrow();
		break;
  }
}

function createArrow(){
	var arrow_container = new Container({
        width: 18,
		height: 6,
		left: _truck_container.left + _launcher.left,
		top: _truck_container.top + _launcher.top,
		theta: _launcher.theta + Math.random() * _arrow_degree_vary,
		borderWidth: 0,
		xVelocity: _power * Math.cos(-1 * (_launcher.theta + Math.random() * _arrow_degree_vary)),
		yVelocity: -1 * _power * Math.sin(-1 * (_launcher.theta+ Math.random() * _arrow_degree_vary))
	});
	
	var shaft = new Line({
		startX: 2,
		startY: 3,
		endX: 16,
		endY: 3,
		lineWidth: 1
	});
	
    var point = new Path({
        color: "black",
		fill: "black",
        lineWidth: 1,
        type: "straight",
        points: [
            { x: 18, y: 3 },
            { x: 15, y: 0 },
            { x: 15, y: 6 }
            ]
    });
	
	var end = new Path({
        color: "black",
        lineWidth: 1,
        type: "straight",
        points: [
            { x: 0, y: 1 },
            { x: 4, y: 3 },
            { x: 0, y: 5 }
            ]
    });
	
	arrow_container.children = [end, shaft, point];
	
	_arrows.push(arrow_container);
	_doodle.children.push(arrow_container);
}