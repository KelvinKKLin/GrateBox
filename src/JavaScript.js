function init() {
    var poly = [ ]
    var canvas = document.getElementsByTagName('canvas')[0];             //set canvas and dimensions.
    canvas.width = 10000;
    canvas.height = 800;
    var c = canvas.getContext('2d');                                     //set 2d Canvas

    var x = 100;                                                         //set x and y variables
    var y = 100;

    var buffer = 100;

   

    function rectan(x, y, Angle, Mag) { //polar coordinates will be converted to Cartesian coordinates to fit x,y,x1,y1...)
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

    }

	
  

    function draw1() {

    	var fuckingX = [100, 200, 300, 400];
    	var fuckingY = [350, 370, 400, 500];
    	c.beginPath();
    	c.moveTo(0, 400);
    	for (var i = 0; i < 100; i++) {
    		var rand1 = x + 10000;
    		var rand2 = 600;
    		c.lineTo(rand1, rand2);
    		c.moveTo(rand1, rand2);
    	}
		
    //Path are unfinished, will add a path with uphills and downhills.
    	c.stroke();
    	c.fill();
    	requestAnimationFrame(draw1);
    }


    function draw() {                                                  
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
    }


    draw();
    draw1();
}

window.addEventListener('load', init, false);