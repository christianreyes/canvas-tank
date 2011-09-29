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
        this.context.save();
        this.children[i].draw(this.context);
        this.context.restore();
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
    this.attrs = mergeWithDefault(attrs, dflt);
    //this.left = attrs.left;
    //this.top = attrs.top;
    //this.visible = attrs.visible;
    //this.theta = attrs.theta;
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
    //this.lineWidth = attrs.lineWidth;
    //this.color = attrs.color;
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
    //this.content = attrs.content;
    //this.fill = attrs.fill;
    //this.font = attrs.font;
    //this.height = attrs.height;
    // add constructor code here
}
Text.inheritsFrom(Drawable);

Text.prototype.draw = function (c) {
    // your draw code here
    c.fillStyle = this.fill;
    c.font = this.font;
    c.fillText(this.content, this.attrs.left, this.attrs.top);
};

function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: ""
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
	// rest of constructor code here
}
DoodleImage.inheritsFrom(Drawable);

DoodleImage.prototype.draw = function (c) {
    var img = new Image();
    img.onload = function(){
        c.drawImage(img,this.left,this.top);
    };
    img.src = this.attrs.src;
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
    // your draw code here
}
Line.inheritsFrom(Primitive);

Line.prototype.draw = function (c) {
    // your draw code here
    c.beginPath();

    if(typeof(this.attrs.lineWidth) != "undefined"){
         c.lineWidth = this.attrs.lineWidth;
    }
    if(typeof(this.attrs.color) != "undefined"){
         c.strokeStyle = this.attrs.color;
    }

    c.moveTo(this.attrs.startX,this.attrs.startY);
    c.lineTo(this.attrs.endX, this.attrs.endY);
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
    // rest of constructor code here
}
Path.inheritsFrom(Primitive);

Path.prototype.draw = function (c) {
    // draw code here
    c.beginPath();
    c.moveTo(this.attrs.points[0].x, this.attrs.points[0].y);
    
    if(typeof(this.attrs.lineWidth) != "undefined"){
         c.lineWidth = this.attrs.lineWidth;
    }
    if(typeof(this.attrs.color) != "undefined"){
         c.strokeStyle = this.attrs.color;
    }

    switch(this.attrs.type){
        case "straight":
            for(var i=1;i<this.attrs.points.length;i++){
                var p = this.attrs.points[i];
                c.lineTo(p.x, p.y);
                c.moveTo(p.x, p.y);
            }
            break;
        case "quadratic":
            for(var i=1;i<this.attrs.points.length;i++){
                var p = this.attrs.points[i];
                c.quadraticCurveTo(p.cp1x, p.cp1y, p.x, p.y);
                c.moveTo(p.x, p.y);
            }
            break;
        case "bezier":
            for(var i=1;i<this.attrs.points.length;i++){
                var p = this.attrs.points[i];
                c.bezierCurveTo(p.cp1x, p.cp1y, p.cp2x, p.cp2y, p.x, p.y);
                c.moveTo(p.x, p.y);
            }
            break;
    }
    
    c.closePath();
    c.stroke();

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
	// rest of constructor code here
}
Arc.inheritsFrom(Primitive);

Arc.prototype.draw = function (c) {
    // draw code here
    c.beginPath();

    if(typeof(this.attrs.lineWidth) != "undefined"){
         c.lineWidth = this.attrs.lineWidth;
    }
    if(typeof(this.attrs.color) != "undefined"){
         c.strokeStyle = this.attrs.color;
    }

    c.arc(this.attrs.centerX,this.attrs.centerY,this.attrs.radius, this.attrs.startingTheta, this.attrs.endingTheta, this.attrs.counterclockwise );
    //c.closePath();
    c.stroke();
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
    // rest of constructor code here
}
PolygonContainer.inheritsFrom(Container);