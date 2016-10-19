function init() {
    var poly = [ ]
    var canvas = document.getElementsByTagName('canvas')[0];             //set canvas and dimensions.
    canvas.width = 10000;
    canvas.height = 800;
    var c = canvas.getContext('2d');                                     //set 2d Canvas

    var x = 0;                                                         //set x and y variables
    var y = 400;

    var buffer = 100;

    //var X = [400,800,1200,1600];
    //var Y = [400,500,600,700];
    /*X[0] = 100;
    Y[0] = 300;
    var YMAG = [];
    for (var u = 1; u < 10000; u++) {
        X[u] = X[u - 1] + 300;
        Y[u] = 800 * Math.random();
    }*/

    function rectan(x1, y1, x2, y2, x3, y3, x4, y4) { //polar coordinates will be converted to Cartesian coordinates to fit x,y,x1,y1...)
        c.moveTo(x, y);
        c.lineTo(x2, y2);
        c.lineTo(x3, y3);
        c.lineTo(x4, y4);
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
        c.beginPath();
        c.moveTo(0, 400);
       
        c.lineTo(400, 400);
        c.moveTo(400, 400);
        c.lineTo(800, 500);
        c.moveTo(800, 500);
        c.lineTo(1200, 400);
        c.moveTo(1200, 400);
        c.lineTo(1600, 300);
        c.moveTo(1600, 300);
        c.lineTo(2000, 400);
        c.moveTo(2000, 400);
        c.lineTo(2400, 500);
        c.moveTo(2400, 500);
        c.lineTo(2800, 400);
        c.moveTo(2800, 400);
        c.lineTo(3200, 300);
        c.moveTo(3200, 300);
        c.lineTo(3600, 400);
        c.moveTo(3600, 400);
        c.lineTo(4000, 500);
        c.moveTo(4000, 500);
        c.lineTo(4400, 400);
        c.moveTo(4400, 400);
        c.lineTo(4800, 300);
        c.moveTo(4800, 300);
        c.lineTo(5200, 400);
        c.moveTo(5200, 400);
        c.lineTo(5600, 500);
        c.moveTo(5600, 500);
        c.lineTo(6000, 400);
        c.moveTo(6000, 400);
        c.lineTo(6400, 300);
        c.moveTo(6400, 300);
        c.lineTo(6800, 400);
        c.moveTo(6800, 400);
        c.lineTo(7200, 500);
        c.moveTo(7200, 500);
        c.lineTo(7600, 400);
        c.moveTo(7600, 400);
        c.lineTo(8000, 400);
        c.moveTo(8000, 400);

      

        
        
            


        

		
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
        if (x < 400) {
            rectan(x, y, 0 + x, y - 100, 100 + x, y - 100, 100 + x, y);
            c.fill();
            y += 0;
            x += 1;

        }
        else if (x >= 400 && x < 800) {
            rectan(x, y, 24.2535 + x, y - 97.01, 97.01 + 24.2535 + x, y - 72.76, 97.01 + x, y + 24.2535);
            c.fill();
            y += 0.25;
            x += 1;
        }
        else if (x >= 800 && x < 1600) {
            rectan(x, y, x-24.2535 , y - 97.01, 97.01-24.2535 + x, y - 97.01 - 24.2535, 97.01 + x, y - 24.2535);
            c.fill();
            y += -0.25;
            x += 1;
        }
        else if (x >= 1600 && x < 2400) {
            rectan(x, y, 24.2535 + x, y - 97.01, 97.01 + 24.2535 + x, y - 72.76, 97.01 + x, y + 24.2535);
            c.fill();
            y += 0.25;
            x += 1;
        }
        else if (x >= 2400 && x < 3200) {
            rectan(x, y, x - 24.2535, y - 97.01, 97.01 - 24.2535 + x, y - 97.01 - 24.2535, 97.01 + x, y - 24.2535);
            c.fill();
            y += -0.25;
            x += 1;
        }
        else if (x >= 3200 && x < 4000) {
            rectan(x, y, 24.2535 + x, y - 97.01, 97.01 + 24.2535 + x, y - 72.76, 97.01 + x, y + 24.2535);
            c.fill();
            y += 0.25;
            x += 1;
        }
        else if (x >= 4000 && x < 4800) {
            rectan(x, y, x - 24.2535, y - 97.01, 97.01 - 24.2535 + x, y - 97.01 - 24.2535, 97.01 + x, y - 24.2535);
            c.fill();
            y += -0.25;
            x += 1;
        }
        else if (x >= 4800 && x < 5600) {
            rectan(x, y, 24.2535 + x, y - 97.01, 97.01 + 24.2535 + x, y - 72.76, 97.01 + x, y + 24.2535);
            c.fill();
            y += 0.25;
            x += 1;
        }
        else if (x >= 5600 && x < 6400) {
            rectan(x, y, x - 24.2535, y - 97.01, 97.01 - 24.2535 + x, y - 97.01 - 24.2535, 97.01 + x, y - 24.2535);
            c.fill();
            y += -0.25;
            x += 1;
        }
        else if (x >= 6400 && x < 7200) {
            rectan(x, y, 24.2535 + x, y - 97.01, 97.01 + 24.2535 + x, y - 72.76, 97.01 + x, y + 24.2535);
            c.fill();
            y += 0.25;
            x += 1;
        }
        else if (x >= 7200 && x < 7600) {
            rectan(x, y, x - 24.2535, y - 97.01, 97.01 - 24.2535 + x, y - 97.01 - 24.2535, 97.01 + x, y - 24.2535);
            c.fill();
            y += -0.25;
            x += 1;
        }

        if (x >= 7600 && x < 8000) {
            rectan(x, y, 0 + x, y - 100, 100 + x, y - 100, 100 + x, y);
            c.fill();
            y += 0;
            x += 1;

        }








        
          
       


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