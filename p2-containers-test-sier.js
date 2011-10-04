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
            polygonTheta: -Math.PI / 2,
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
	    polygonTheta: -Math.PI / 2,
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
    
    var sier = makeSierpinski(500, 384, 200, 5);
    
    root.children = [sier];
    root.draw();
};