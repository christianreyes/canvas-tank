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

    root.children = [imgFrameFrame];
    root.draw();
};