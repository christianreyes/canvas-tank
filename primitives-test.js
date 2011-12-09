window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var doodle = new Doodle(context);
    
    context.save();

    // Draw a frame with a straight path.
    var framePath = new Path({
        color: "black",
        lineWidth: 10,
        type: "straight",
        points: [
            { x: 0, y: 0 },
            { x: 660, y: 0 },
            { x: 660, y: 480 },
            { x: 0, y: 480 },
            { x: 0, y: 0 }
        ]
    });
    doodle.children.push(framePath);
    
    // Draw the first S with a quadratic path.
    var quadraticSbg = new Path({
        color: "black",
        lineWidth: 10,
        type: "quadratic",
        points: [
            { x: 140, y: 100 },
            { cp1x: 15, cp1y: 130, x: 90, y: 180 },
            { cp1x: 215, cp1y: 230, x: 65, y: 260 }
            ]
    });
    var quadraticS = new Path({
        color: "red",
        lineWidth: 8,
        type: "quadratic",
        points: [
            { x: 140, y: 100 },
            { cp1x: 15, cp1y: 130, x: 90, y: 180 },
            { cp1x: 215, cp1y: 230, x: 65, y: 260 }
            ]
    });
    doodle.children.push(quadraticSbg);
    doodle.children.push(quadraticS);
    
    // Draw the second S with a straight path.
    var straightSbg = new Path({
        color: "black",
        lineWidth: 10,
        type: "straight",
        points: [
            { x: 290, y: 100 },
            { x: 210, y: 140 },
            { x: 290, y: 220 },
            { x: 210, y: 270 }
            ]
    });
    var straightS = new Path({
        color: "red",
        lineWidth: 8,
        type: "straight",
        points: [
            { x: 290, y: 100 },
            { x: 210, y: 140 },
            { x: 290, y: 220 },
            { x: 210, y: 270 }
            ]
    });
    doodle.children.push(straightSbg);
    doodle.children.push(straightS);

    // Draw the U with a bezier path.
    var bezierUbg = new Path({
        color: "black",
        lineWidth: 10,
        type: "bezier",
        points: [
            { x: 340, y: 105 },
            { cp1x: 340, cp1y: 310, cp2x: 460, cp2y: 310, x: 460, y: 110 }
            ]
    });
    var bezierU = new Path({
        color: "red",
        lineWidth: 8,
        type: "bezier",
        points: [
            { x: 340, y: 105 },
            { cp1x: 340, cp1y: 310, cp2x: 460, cp2y: 310, x: 460, y: 110 }
            ]
    });
    
    doodle.children.push(bezierUbg);
    doodle.children.push(bezierU);

    // Draw the I with three lines.
    var lineI1bg = new Line({
        startX: 510,
        startY: 115,
        endX: 590, endY: 115,
        lineWidth: 10,
        color: "black"
    });
    var lineI2bg = new Line({
        startX: 510,
        startY: 275,
        endX: 590, endY: 275,
        lineWidth: 10,
        color: "black"
    });
    var lineI3bg = new Line({
        startX: 550,
        startY: 115,
        endX: 550, endY: 275,
        lineWidth: 10,
        color: "black"
    });
    var lineI1 = new Line({
        startX: 510,
        startY: 115,
        endX: 590, endY: 115,
        lineWidth: 8,
        color: "red"
    });
    var lineI2 = new Line({
        startX: 510,
        startY: 275,
        endX: 590, endY: 275,
        lineWidth: 8,
        color: "red"
    });
    var lineI3 = new Line({
        startX: 550,
        startY: 115,
        endX: 550, endY: 275,
        lineWidth: 8,
        color: "red"
    });
    doodle.children.push(lineI1bg);
    doodle.children.push(lineI2bg);
    doodle.children.push(lineI3bg);
    doodle.children.push(lineI1);
    doodle.children.push(lineI2);
    doodle.children.push(lineI3);

    
    // Draw Pacman and pellets with arcs and lines.
    var arc = new Arc({
        color: "black",
        lineWidth: 6,
        centerX: 180,
        centerY: 360,
        radius: 49,
        startingTheta: Math.PI * 0.25,
        endingTheta: Math.PI * 1.75,
        counterclockwise: false
    });
    var pmline1 = new Line({
        color: "black",
        lineWidth: 4,
        startX: 180,
        startY: 360,
        endX: 216.5,
        endY: 396.5
    });
    var pmline2 = new Line({
        color: "black",
        lineWidth: 4,
        startX: 180,
        startY: 360,
        endX: 216.5,
        endY: 323.5
    });
    doodle.children.push(arc);
    doodle.children.push(pmline1);
    doodle.children.push(pmline2);
    for (var i = 0; i < 15; i++) {
        var arc = new Arc({
            color: "yellow",
            lineWidth: 6,
            centerX: 180,
            centerY: 360,
            radius: 50 * (i / 15),
            startingTheta: Math.PI * 0.25,
            endingTheta: Math.PI * 1.75,
            counterclockwise: false
        });
        doodle.children.push(arc);
    }
    
    var leftValue = 250;
    for (var i = 0; i < 3; i++) {
        var cherry = new DoodleImage({
            src: "cherry.jpg",
            left: leftValue,
            top: 310,
            width: 100,
            height: 100
        });
        doodle.children.push(cherry);
        leftValue += 110;
    }

    // Write some text.
    var text = new Text({ left: 360, height: 440, content: "Om nom nom" });

    doodle.children.push(text);
    
    doodle.draw();
};