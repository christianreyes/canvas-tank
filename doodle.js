var _canvas_width = 600;
var _canvas_height = 600;

var x_pos = _canvas_width / 2;
var y_pos = _canvas_height / 2;

var _doodle = undefined;
var _circle = undefined;
var _arrow = undefined;

// in milliseconds
var _time_step = 30;

var _gravity = 3;
var _x_per_sec = 100;
var _y_per_sec = -7;

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
	
	_arrow = new Line({
		startX: 0,
		startY: _canvas_width /2,
		endX: 0 + 10,
		endY: _canvas_height/2 - 2
	});

    _doodle.children = [ _arrow];

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
	_doodle.context.clearRect(0,0,_canvas_width,_canvas_height);
    //followMouse();
    fallingCircle(_x_per_sec, _y_per_sec);
    _doodle.draw();
}

function fallingCircle(xPerSec, yPerSec) {
    if (_arrow.startY < _canvas_height) {
        _y_per_sec += _gravity * _time_step / 1000;
		
		_arrow.startX += _x_per_sec * _time_step / 1000; 
		_arrow.endX += _x_per_sec * _time_step / 1000;
		
		_arrow.startY = _arrow.endY - _gravity * _time_step / 1000;
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
        _y_per_sec = -7;
    }
}

function followMouse() {
    if (Math.abs(_x_pos - _circle.centerX) > 10) {
        if (_x_pos > _circle.centerX) {
            _circle.centerX += 5;
            _circle.left += 5;
        } else {
            _circle.centerX -= 5;
            _circle.left -= 5;
        }
    }

    if (Math.abs(_y_pos - _circle.centerY) > 5) {
        if (_y_pos > _circle.centerY) {
            _circle.centerY += 5;
            _circle.top += 5;
        } else {
            _circle.centerY -= 5;
            _circle.top -= 5;
        }
    }
}