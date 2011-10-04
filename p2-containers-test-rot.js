window.onload = function () {

    var canvas = document.getElementById("myCanvas");

    var context = canvas.getContext("2d");

    var root = new Doodle(context);
	
	var tri = new PolygonContainer({
		left: 100,
		top: 100,
		centerX: 30,
		centerY: 30,
		sides: 3,
		radius: 100,
	    polygonTheta: Math.PI / 2,
		borderColor: "#ffd34e",
		borderWidth: 5,
		fill: "#fffAD5"
    });
	
	var piOverFour = new Container({
		width: 50,
		height: 50,
		left: 400,
		top: 400,
		fill: "white",
		borderWidth: 10,
        theta:  Math.PI / 4
	});
        
    var rotContainer1 = new Container({ 
        width: 150,
		height: 150,
		left: 900,
		top: 300,
		fill: "cyan",
		borderWidth: 3,
        theta: 3 * Math.PI / 4
	});
    var rotContainer2 = new Container({ 
        width: 100,
		height: 100,
		left: 75,
		top: 5,
		fill: "purple",
		borderWidth: 3,
        theta: Math.PI / 4
	});
    var rotTextContainer = new Container({
        left: 85,
        top: 75,
        theta: Math.PI
    });
    var rotText = new Text({ 
        height: 40,
        left: 5,
        font: "32pt Helvetica",
        fill: "white",
        content: "UP"
    });
	
	var imgFrameFrame = new Container(
	{
		width: 220,
		height: 275,
		fill:"#f5f5f5",
		left: 350, 
		top: 100,
		theta: -1/6,
		borderWidth: 2
	}
	);
	var imgFrame = new Container(
	{
	width: 200,
	height: 200,
	left: 10,
	top: 10,
	borderWidth: 3
	}
	);
	
	imgFrame.children.push(
		new DoodleImage({src: "kitty.jpg" })
		);
	imgFrameFrame.children.push(imgFrame);
    rotContainer1.children.push(rotContainer2);
    rotContainer2.children.push(rotTextContainer);
    rotTextContainer.children.push(rotText);

    root.children = [tri, piOverFour,rotContainer1, imgFrameFrame];
    root.draw();
};