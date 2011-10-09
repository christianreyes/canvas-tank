// gravity idea: http://www.rodedev.com/tutorials/gamephysics/

var _canvas_width = 600;
var _canvas_height = 600;

var _x_pos = -1;
var _y_pos = -1;

var _doodle = undefined;
var _circle = undefined;
var _arrow = undefined;
var _arrow_container = undefined;
var _move_arr = [];

// in milliseconds
var _time_step = 10;
var _time_s_to_ms = _time_step / 1000;

var _gravity = 4;
var _gravity_increment = _gravity * _time_s_to_ms;

var _x_per_sec = 300;
var _y_per_sec = -4.5;

var _flying = false;

var _x_increment = _x_per_sec * _time_s_to_ms;
var _y_increment = _y_per_sec * _time_s_to_ms;

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = _canvas_width;
    canvas.height = _canvas_height;

    _doodle = new Doodle(context);

    _circle = new Arc({
        centerX: _canvas_width / 2,
        centerY: _canvas_height / 2,
        lineWidth: 3,
        radius: 10,
        startingTheta: 0,
        endingTheta: Math.PI * 2
    });
	
	_arrow_container = new Container({
        width: 25,
		height: 20,
		left: 0,
		top: _canvas_width / 2,
		borderWidth: 0
	});
	
	var shaft = new Line({
		startX: 6,
		startY: 10,
		endX: 20,
		endY: 10,
		lineWidth: 1
	});
	
    var point = new Path({
        color: "black",
		fill: "black",
        lineWidth: 1,
        type: "straight",
        points: [
            { x: 20, y: 10 },
            { x: 17, y: 7 },
            { x: 17, y: 13 }
            ]
    });
	
	var end = new Path({
        color: "black",
        lineWidth: 1,
        type: "straight",
        points: [
            { x: 2, y: 8 },
            { x: 6, y: 10 },
            { x: 2, y: 12 }
            ]
    });
	
	_arrow_container.children = [end, shaft, point];
	
	_arrow = new Line({
		startX: 0,
		startY: _canvas_width /2,
		endX: 0 + 10,
		endY: _canvas_height/2 - 2
	});

    _doodle.children = [  _arrow_container];

    _doodle.draw();

    canvas.addEventListener("mousemove", function (event) { canvasMouseMove(canvas, event); });

    setInterval(updateAndDraw, _time_step);
};

function canvasMouseMove(canvas, event) {
    var bb = canvas.getBoundingClientRect();
    _x_pos = (event.clientX - bb.left) * (canvas.width / bb.width);
    _y_pos = (event.clientY - bb.top) * (canvas.width / bb.width);
}

function updateAndDraw() {
	//_doodle.context.clearRect(_arrow.startX - 10,_arrow.startY - 10,_arrow.endX + 10,_arrow.endY + 10);
	_doodle.context.clearRect(0,0,_canvas_width,_canvas_height);
    //followMouse();
	if(_x_pos != -1 && _y_pos != -1){
		if(_flying){
			fallingArrow();
		} else {
			_flying = true;
			_x_per_sec = _x_pos;
			_y_per_sec = -4 /200 * _y_pos;
			fallingArrow();
		}
	}
	
    _doodle.draw();
}

function fallingArrow() {
    if (_arrow_container.top < _canvas_height || _arrow_container.left < _canvas_width) {		
        _y_per_sec += _gravity_increment;
		
		var oldLeft = _arrow_container.left;
		var oldTop = _arrow_container.top;
		var newLeft = oldLeft + _x_per_sec * _time_s_to_ms;
		var newTop = oldTop + _y_per_sec * _time_s_to_ms;
		
		var angToGround = Math.atan( (newTop - oldTop ) / (newLeft - oldLeft) );
		
		_arrow_container.left += _x_per_sec * _time_s_to_ms;
		_arrow_container.top += _y_per_sec * _time_s_to_ms;
		_arrow_container.theta = angToGround;

    } else {
		_flying = false;
		_arrow_container.left = 0; 
		_arrow_container.top = _canvas_width /2;
    }
}

//http://stackoverflow.com/questions/2075013/best-way-to-find-quadratic-regression-curve-in-java

function fallingLine(xPerSec, yPerSec) {
    if (_arrow.startY < _canvas_height) {
        _y_per_sec += _gravity_increment;
		
		_arrow.startX += _x_increment; 
		_arrow.endX += _x_increment;
		
		_arrow.startY = _arrow.endY - _y_per_sec;
		_arrow.endY += _y_per_sec;
		
        //_circle.centerX += _x_per_sec * _time_step / 1000;
        //_circle.centerY += _y_per_sec;
    } else {
		_arrow.startX = 0; 
		_arrow.startY = _canvas_width /2;
		_arrow.endX = 0 + 10;
		_arrow.endY = _canvas_width /2 - 2;
	
        //_circle.centerX = _canvas_width / 2;
        //_circle.centerY = _canvas_height / 2;
        _y_per_sec = -5;
    }
}

// function followMouse() {
    // if (Math.abs(_x_pos - _circle.centerX) > 10) {
        // if (_x_pos > _circle.centerX) {
            // _circle.centerX += 5;
            // _circle.left += 5;
        // } else {
            // _circle.centerX -= 5;
            // _circle.left -= 5;
        // }
    // }

    // if (Math.abs(_y_pos - _circle.centerY) > 5) {
        // if (_y_pos > _circle.centerY) {
            // _circle.centerY += 5;
            // _circle.top += 5;
        // } else {
            // _circle.centerY -= 5;
            // _circle.top -= 5;
        // }
    // }
// }