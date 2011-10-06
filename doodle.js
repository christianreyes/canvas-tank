var _canvas_width = 600;
var _canvas_height = 600;

var x_pos = _canvas_width / 2;
var y_pos = _canvas_height / 2;

var _doodle = undefined;
var _circle = undefined;

// in milliseconds
var _time_step = 30;

var _gravity = 3;
var _x_per_sec = 50;
var _y_per_sec = -5;

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

    _doodle.children = [_circle];

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
    //followMouse();
    fallingCircle(_x_per_sec, _y_per_sec);
    _doodle.draw();
}

function fallingCircle(xPerSec, yPerSec) {
    if (_circle.centerX < _canvas_height + _circle.radius + _circle.lineWidth) {
        _y_per_sec += _gravity * _time_step / 1000;
        
        _circle.centerX += _x_per_sec * _time_step / 1000;
        _circle.centerY += _y_per_sec;
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