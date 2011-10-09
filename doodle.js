// gravity idea: http://www.rodedev.com/tutorials/gamephysics/

var _canvas_width = 800;
var _canvas_height = 600;

var x_pos = _canvas_width / 2;
var y_pos = _canvas_height / 2;

var _doodle = undefined;
var _ground = undefined;
var _truck_container = undefined;
var _launcher = undefined;
var _circle = undefined;
var _arrow = undefined;
var _arrow_container = undefined;
var _move_arr = [];

// in milliseconds
var _time_step = 10;
var _time_s_to_ms = _time_step / 1000;

var _gravity = 5;
var _gravity_increment = _gravity * _time_s_to_ms;

var _x_per_sec = 3;
var _y_per_sec = -4;

var _power = 5;

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

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
		top: _canvas_height - 50 - 80,
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
	
	_arrow_container = new Container({
        width: 18,
		height: 6,
		left: 20,
		top: _canvas_height - 50 - 30,
		borderWidth: 0
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
	
	_arrow_container.children = [end, shaft, point];

    _doodle.children = [ _arrow_container, _ground, _truck_container];

    _doodle.draw();

    //canvas.addEventListener("mousemove", function (event) { canvasMouseMove(canvas, event); });
	window.addEventListener('keydown',doKeyDown,true);

    setInterval(updateAndDraw, _time_step);
};

function canvasMouseMove(canvas, event) {
    var bb = canvas.getBoundingClientRect();
    _x_pos = (event.clientX - bb.left) * (canvas.width / bb.width);
    _y_pos = (event.clientY - bb.top) * (canvas.width / bb.width);
}

function updateAndDraw() {
	//clearDirty([_truck_container, _arrow_container]);
	_doodle.context.clearRect(0,0,_canvas_width, _canvas_height);
	fallingArrow(_x_per_sec, _y_per_sec);
	
    _doodle.draw();
}

function clearDirty(dirty){
	for(var i = 0;i<dirty.length;i++)
	{
		var obj = dirty[i];
		_doodle.context.save();
			_doodle.context.transform(obj.left, obj.top);
			_doodle.context.rotate(-obj.theta);
			_doodle.context.clearRect(0,0,obj.width, obj.height);
		_doodle.context.restore();
	}
}

function fallingArrow(xPerSec, yPerSec) {
    if (_arrow_container.top < _canvas_height) {
        _y_per_sec += _gravity_increment;
		
		var oldLeft = _arrow_container.left;
		var oldTop = _arrow_container.top;
		var newLeft = oldLeft + _x_per_sec;
		var newTop = oldTop + _y_per_sec;
		
		var angToGround = Math.atan( (newTop - oldTop ) / (newLeft - oldLeft) );
		
		_arrow_container.left += _x_per_sec; 
		_arrow_container.top += _y_per_sec;
		_arrow_container.theta = angToGround;

    } else {
		_arrow_container.left = _truck_container.left + _launcher.left; 
		_arrow_container.top = _truck_container.top + _launcher.top;
		_arrow_container.theta = -1 * _launcher.theta;
	
		_x_per_sec = _power * Math.cos(_arrow_container.theta);
        _y_per_sec = -1 * _power * Math.sin(_arrow_container.theta);
    }
}

//http://html5.litten.com/moving-shapes-on-the-html5-canvas-with-the-keyboard/

function doKeyDown(evt){
  switch (evt.keyCode) {
    case 38:  /* Up arrow was pressed */
		if( _launcher.theta + Math.PI/2 > .2){
			_launcher.theta -= .1;
		}
		break;
    case 40:  /* Down arrow was pressed */
		if( _launcher.theta < -.1){
			_launcher.theta += .1
		}
      break;
    case 37:  /* Left arrow was pressed */
		if(_truck_container.left > 5){
			_truck_container.left -= 3;
		}
		break;
    case 39:  /* Right arrow was pressed */
		if(_canvas_width - _truck_container.left + _truck_container.width > 5){
			_truck_container.left += 3;
		}      
		break;
  }
}

	//var sky = new Container({
	//	width: _canvas_width,
	//	height: _canvas_height - 50,
	//	left:0,
	//	top:0,
	//	fill: ""
	//	//gradient: [
	//	//	{position: 0, color: "#0099FF"},
	//	//	{position: 1, color: "#00D6FF"}
	//	//	]
	//});