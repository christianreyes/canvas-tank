function makeSierpinski(centerX, centerY, radius, level) {
    if (level == 1) {
        var result = new PolygonContainer({
        	left: centerX - radius,
        	top: centerY - radius,
            centerX: centerX,
            centerY: centerY,
            sides: 3,
            radius: radius,
            borderColor: "#ffd34e",
            fill: "#105b63",
            borderWidth: 5,
            polygonTheta: Math.PI / 2,
        });
        return result;
    } else {
        var result = new PolygonContainer({
            left: centerX - radius,
        	top: centerY - radius,
            centerX: centerX,
            centerY: centerY,
            sides: 3,
            radius: radius,
            borderColor: "#ffd34e",
            borderWidth: 5,
	    polygonTheta: Math.PI / 2,
            fill: "#fffAD5"
        });

        var top = makeSierpinski(
				 radius,
				 radius / 2,
				 radius / 2,
				 level - 1);
        var left = makeSierpinski(
				  radius - Math.sqrt(3) * radius / 4,
				  radius + radius / 4,
				 radius / 2,
				 level - 1);
        var right = makeSierpinski(
				   radius + Math.sqrt(3) * radius / 4,
				   radius + radius / 4,
				 radius / 2,
				 level - 1);
        result.children = [top, left, right];
        return result;
    }
}





window.onload = function () {

    var canvas = document.getElementById("myCanvas");

    var context = canvas.getContext("2d");

    var root = new Doodle(context);
    
    var sier = makeSierpinski(200, 384, 200, 5);
    
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

    var multiRotContainer = new Container({ 
        width: 400,
		height: 400,
		left: 400,
		top: 400,
		borderWidth: 0
	});
    for(var i = 0; i < 10; i++) {
        var newRot = new Container({ 
            width: 100,
		    height: 25,
		    left: 200,
		    top: 200,
		    borderWidth: 4,
            fill: "green",
            theta: i * Math.PI / 5
	    });
        newRot.children.push( new Text({  left: 20, height: 17, fill: "white", content: "" + newRot.theta.toFixed(2) + " rad" }));
        multiRotContainer.children.push(newRot);
    }


    root.children = [sier, rotContainer1, multiRotContainer,imgFrameFrame];
    root.draw();
};