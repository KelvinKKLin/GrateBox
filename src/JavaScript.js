function init() {
    var poly = [ ]
    var canvas = document.getElementsByTagName('canvas')[0];             //set canvas and dimensions.
    canvas.width = 10000;
    canvas.height = 800;
    var c = canvas.getContext('2d');                                     //set 2d Canvas

    var x = 100;                                                         //set x and y variables
    var y = 100;

    var buffer = 100;

    var X = [];
    var Y = [];
    X[0] = 100;
    Y[0] = 100;
    for (var u = 1; u < 10000; u++) {
        X[u] = X[u - 1] + 300;
        Y[u] = 300 * Math.random();
    }

    function rectan(x, y, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6) { //polar coordinates will be converted to Cartesian coordinates to fit x,y,x1,y1...)
        c.moveTo(x, y);
        c.lineTo(x2, y2);
        c.lineTo(x3, y3);
        c.lineTo(x4, y4);
        c.lineTo(x5, y5);
        c.lineTo(x6, y6);
        c.closePath();
        c.fillStyle = "rgb(200,0,0)";                                   //set color
        c.stroke();

    }

   

    /*function rectan(x, y, Angle, Mag) { //polar coordinates will be converted to Cartesian coordinates to fit x,y,x1,y1...)
        var Angle = [];
        var Mag = [];
		
    	for (i = 0; i < n; i++) {
			x[i] = Mag[i] * cos(Angle[i]);
    		y[i] = Mag[i] * sin(Angle[i]);

    	}

    	c.moveTo(x, y);
    	for (i = 0; i < n; i++) {
			c.lineTo(x[i], y[i]);

    	}

        c.closePath();
        c.fillStyle = "rgb(200,0,0)";                                   //set color
        c.stroke();

    }*/

	
  

    function draw1() {
        c.moveTo(0, 400);
        c.beginPath();
        for (i = 0; i < 1000; i++) {
            c.lineTo(X[i], Y[i]);
            c.moveTo(X[i], Y[i]);


        }

		
    //Path are unfinished, will add a path with uphills and downhills.
    	c.stroke();
    	c.fill();
    	requestAnimationFrame(draw1);
    }


   /* function draw() {                                                  
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.beginPath();
        rectan(0,0,Angle,Mag);
        c.fill();
        x += 8;                                                  //x(speed) will be determinded by GA 
        //y += 8;
        scrollWrapper(372, x - buffer);
        requestAnimationFrame(draw);                             

    }

    //The following function was obtained from Stackoverflow at:
    //http://stackoverflow.com/questions/7909583/2d-side-scrolling-camera-view-in-html5
    function scrollWrapper(x, y){
        //console.log(x + "\t" + y);
        var wrapper = document.getElementById('wrapper');
        wrapper.scrollTop = x;
        wrapper.scrollLeft = y;
    }*/


    function draw() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.beginPath();
        rectan(0 + x, 300 + y, 0 + x, 200 + y, 50 + x, 200 + y, 100 + x, 300 + y, 150 + x, 100 + y, 200 + x, 300 + y);
        c.fill();
        x += 8;                                                  //x(speed) will be determinded by GA 
        //y += 8;
        scrollWrapper(372, x - buffer);
        requestAnimationFrame(draw);

    }
    function scrollWrapper(x, y) {
        //console.log(x + "\t" + y);
        var wrapper = document.getElementById('wrapper');
        wrapper.scrollTop = x;
        wrapper.scrollLeft = y;
    }
    draw();
    draw1();
}

window.addEventListener('load', init, false);