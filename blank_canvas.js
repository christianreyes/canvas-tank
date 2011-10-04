window.onload = function () {

    var canvas = document.getElementById("myCanvas");

    var context = canvas.getContext("2d");

    var root = new Doodle(context);
    
    root.draw();
};