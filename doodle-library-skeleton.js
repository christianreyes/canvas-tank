/* Doodle Drawing Library * * Drawable and Primitive are base classes and have been implemented for you. * Do not modify them!  * * Stubs have been added to indicate where you need to complete the * implementation. * Please email me if you find any errors! *//* * Root container for all drawable elements. */function Doodle (context) {    this.context = context;    this.children = [];}Doodle.prototype.draw = function() {	// Your draw code here};/* Base class for all drawable objects. * Do not modify this class! */function Drawable (attrs) {    var dflt = {         left: 0,        top: 0,        visible: true,        theta: 0    };    attrs = mergeWithDefault(attrs, dflt);    // constructor code here}Drawable.prototype.draw = function() {    console.log("ERROR: Calling unimplemented draw method on drawable object.");};/* Base class for objects that cannot contain child objects. * Do not modify this class! */function Primitive(attrs) {    var dflt = {        lineWidth: 1,        color: "black"    };    attrs = mergeWithDefault(attrs, dflt);    Drawable.call(this, attrs);    this.lineWidth = attrs.lineWidth;    this.color = attrs.color;}Primitive.inheritsFrom(Drawable);function Text(attrs) {    var dflt = {        content: "",        fill: "black",        font: "12pt Helvetica",        height: 12    };    attrs = mergeWithDefault(attrs, dflt);    Drawable.call(this, attrs);        // add constructor code here}Text.inheritsFrom(Drawable);Text.prototype.draw = function (c) {    // your draw code here};function Image(attrs) {    var dflt = {        width: -1,        height: -1,        src: "",    };    attrs = mergeWithDefault(attrs, dflt);    Drawable.call(this, attrs);    	// rest of constructor code here}Image.inheritsFrom(Drawable);Image.prototype.draw = function (c) {    // draw code here};function Line(attrs) {    var dflt = {        startX: 0,        startY: 0,        endX: 0,        endY: 0    };    attrs = mergeWithDefault(attrs, dflt);    Primitive.call(this, attrs);        // your draw code here}Line.inheritsFrom(Primitive);Line.prototype.draw = function (c) {    // your draw code here};function Path(attrs) {    var dflt = {        type: "straight",        points: []    };    attrs = mergeWithDefault(attrs, dflt);    Primitive.call(this, attrs);        // rest of constructor code here}Path.inheritsFrom(Primitive);Path.prototype.draw = function (c) {    // draw code here};function Arc(attrs) {    var dflt = {        centerX: 0,        centerY: 0,        radius: 0,        startingTheta: 0,        endingTheta: 0,        counterclockwise: false    };    attrs = mergeWithDefault(attrs, dflt);    Primitive.call(this, attrs);	// rest of constructor code here}Arc.inheritsFrom(Primitive);Arc.prototype.draw = function (c) {    // draw code here};function Container(attrs) {    var dflt = {        width: 100,        height: 100,        fill: false,        borderColor: "black",        borderWidth: 0,    };    attrs = mergeWithDefault(attrs, dflt);    Drawable.call(this, attrs);        this.children = [];        // rest of constructor code here.}Container.inheritsFrom(Drawable);Container.prototype.draw = function (c) {    // draw code here};function PolygonContainer(attrs) {    var dflt = {        radius: 100,        sides: 3,	    centerX: 100,	    centerY: 100,	    polygonTheta: 0    };    attrs = mergeWithDefault(attrs, dflt);    Container.call(this, attrs);        // rest of constructor code here}PolygonContainer.inheritsFrom(Container);