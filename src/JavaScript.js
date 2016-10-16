function init() {
    var poly = [ ]
    var canvas = document.getElementsByTagName('canvas')[0];             //set canvas and dimensions.
    canvas.width = 10000;
    canvas.height = 800;
    var c = canvas.getContext('2d');

    var x = 100;
    var y = 100;

    

    function rectan(x, y, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6) { //draw the polygon(will add every variables like cartMag1,cartAngle1 and wheels soon)
        c.moveTo(x, y);
        c.lineTo(x2, y2);
        c.lineTo(x3, y3);
        c.lineTo(x4, y4);
        c.lineTo(x5, y5);
        c.lineTo(x6, y6);
        c.closePath();
        c.fillStyle = "rgb(200,0,0)";
        c.stroke();

    }

    function draw1() {
        c.beginPath();
        c.moveTo(0, 400);
        c.lineTo(2000, 400);                //Path are unfinished, will add a path with uphills and downhills.
        c.stroke();
        c.fill();
        requestAnimationFrame(draw1);
    }


    function draw() {
        c.clearRect(0, 0, canvas.width, canvas.height);       
        c.beginPath();
        rectan(0+x, 300+y, 0+x, 200+y, 50+x, 200+y, 100+x, 300+y, 150+x, 100+y, 200+x, 300+y);
        c.fill();
        x += 8;                                                  //move the polygon with the x+8 pix speed.
        //y += 8;
        requestAnimationFrame(draw);


    }
    //var polygonX = 10;
    //var polygonY = 10;

    // how far offset the canvas is                                
    //var offsetX = 0;
    //var offsetY = 0;
    //function draw2() {    //Kelvin, work on this function coz i am stucking on this.(How to make the camera move) Thanks.
    //ctx.save();
    //ctx.translate(offsetX, offsetY);
    // clear the viewport
    // ctx.clearRect(-offsetX, -offsetY, 100, 100);

 
    //ctx.fillStyle = 'red';
    //ctx.fillRect(polygonX - offsetX, polygonY - offsetY, 8, 8);

    // draw the other stuff
    //var l = thingsOnMap.length;
    //for (var i = 0; i < l; i++) {
    // var x = thingsOnMap[i][0];
    //var y = thingsOnMap[i][1];
    //ctx.fillStyle = 'lightblue';
    // ctx.fillRect(x, y, 8, 8);
    //ctx.fillStyle = 'black';
    //ctx.fillText(x + ', ' + y, x, y) // just to show where we are drawing these things
    //}

    // ctx.restore();
    // }


    //function clearCamera(){}
    //kill the polygon when it reaches the end.

    draw();
    draw1();
    //draw2();
}

window.addEventListener('load', init, false);