/* Doodle Drawing Library
 *
 * Drawable and Primitive are base classes and have been implemented for you.
 * Do not modify them! 
 *
 * Stubs have been added to indicate where you need to complete the
 * implementation.
 * Please email me if you find any errors!
 */
/*
 * Root container for all drawable elements.
 */

function Doodle(context) {
    this.context = context;
    this.children = [];
}

Doodle.prototype.draw = function() {
	// Your draw code here
    for(var i=0;i<this.children.length;i++){
        this.children[i].draw(this.context);
    }
};


/* Base class for all drawable objects.
 * Do not modify this class!
 */
function Drawable (attrs) {
    var dflt = { 
        left: 0,
        top: 0,
        visible: true,
        theta: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    this.left = attrs.left;
    this.top = attrs.top;
    this.visible = attrs.visible;
    this.theta = attrs.theta;
}

Drawable.prototype.draw = function() {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
};


/* Base class for objects that cannot contain child objects.
 * Do not modify this class!
 */
function Primitive(attrs) {
    var dflt = {
        lineWidth: 1,
        color: "black"
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.lineWidth = attrs.lineWidth;
    this.color = attrs.color;
}
Primitive.inheritsFrom(Drawable);


function Text(attrs) {
    var dflt = {
        content: "",
        fill: "black",
        font: "12pt Helvetica",
        height: 12
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.content = attrs.content;
    this.fill = attrs.fill;
    this.font = attrs.font;
    this.height = attrs.height;
    // add constructor code here
}
Text.inheritsFrom(Drawable);

Text.prototype.draw = function (c) {
    // your draw code here
    c.fillStyle = this.fill;
    c.font = this.font;
    c.fillText(this.content, this.left, this.top);
};

function Image(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: "",
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.width = attrs.width;
    this.height = attrs.height;
    this.src = attrs.src;
	// rest of constructor code here
}
Image.inheritsFrom(Drawable);

Image.prototype.draw = function (c) {
    // draw code here
};


function Line(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    this.startX = attrs.startX;
    this.startY = attrs.startY;
    this.endX = attrs.endX;
    this.endY = attrs.endY;
    // your draw code here
}
Line.inheritsFrom(Primitive);

Line.prototype.draw = function (c) {
    // your draw code here
    c.beginPath();
    c.moveTo(this.startX,this.startY);
    c.lineTo(this.endX, this.endY);
    c.closePath();
    c.stroke();
};

function Path(attrs) {
    var dflt = {
        type: "straight",
        points: []
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    this.type = attrs.type;
    this.points = attrs.points;
    // rest of constructor code here
}
Path.inheritsFrom(Primitive);

Path.prototype.draw = function (c) {
    // draw code here
};


function Arc(attrs) {
    var dflt = {
        centerX: 0,
        centerY: 0,
        radius: 0,
        startingTheta: 0,
        endingTheta: 0,
        counterclockwise: false
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    this.centerX = attrs.centerX;
    this.centerY = attrs.centerY;
    this.radius = attrs.radius;
    this.startingTheta = attrs.startingTheta;
    this.endingTheta = attrs.endingTheta;
    this.counterclockwise = attrs.counterclockwise;
	// rest of constructor code here
}
Arc.inheritsFrom(Primitive);

Arc.prototype.draw = function (c) {
    // draw code here
};

function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: false,
        borderColor: "black",
        borderWidth: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);    
    this.children = [];
    this.width = attrs.width;
    this.height = attrs.height;
    this.fill = attrs.fill;
    this.borderColor = attrs.borderColor;
    // rest of constructor code here.
}
Container.inheritsFrom(Drawable);

Container.prototype.draw = function (c) {
    // draw code here
};

function PolygonContainer(attrs) {
    var dflt = {
        radius: 100,
        sides: 3,
	    centerX: 100,
	    centerY: 100,
	    polygonTheta: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    Container.call(this, attrs);
    this.radius = attrs.radius;
    this.sides = attrs.sides;
    this.centerX = attrs.centerX;
    this.centerY = attrs.centerY;
    this.polygonTheta = attrs.polygonTheta;
    // rest of constructor code here
}
PolygonContainer.inheritsFrom(Container);