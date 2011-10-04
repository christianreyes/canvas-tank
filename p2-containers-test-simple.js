window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var root = new Doodle(context);
	
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
			fill:"#333",
			left: 10,
			top: 10,
			borderWidth: 3
		}
	);
	
	imgFrame.children.push(
		new DoodleImage({src: "kitty.jpg" })
		);
	imgFrameFrame.children.push(imgFrame);

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
	
    root.children = [imgFrameFrame, multiRotContainer];
    root.draw();
};