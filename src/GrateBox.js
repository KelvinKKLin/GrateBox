//Symbolic Parameters

/**
* This variable keeps track of the acceleration of gravity in the simulation.
*/
var GRAVITY = 9.8;

/**
* This variable keeps track of the scaling factor for the objects in the simulation.
*/
var WORLD_SCALE = 60;

/**
* This variable keeps track of the scaling factor of the display of the simulation.
*/
var DRAW_SCALE = 40.0;

/**
* This variable keeps track of the alpha value of the display of the simulation.
*/
var FILL_ALPHA = 0.3;

/**
* This variable keeps track of the line thickness.
*/
var LINE_THICKNESS = 1.0;

/**
* This variable keeps track of the timestep used to update velocity in the
* simulation.
*/
var VELOCITY_ITERATION = 10;

/**
* This variable keeps track of the timestep used to update the position in
* the simulation.
*/
var POSITION_ITERATION = 10;

/**
* This variable keeps track of the minimum amount that a car has to move per
* iteration in order for it to be considered moving.
*/
var MOVEMENT_THRESHOLD = 0.01;

/**
* This variable keeps track of how often the simulation updates.
*/
var INTERVAL_RATE = 1000/60;

/**
* This variable keeps track of the maximum lifespan of the car.
*/
var TIMEOUT_RATE = 1000000000;

/**
* This variable keeps track of the default shift factor for the
* camera in the x-direction.
*/
var DEFAULT_CAM_X = 300;

/**
* This variable keeps track of the default shift factor in the
* movement of the camera in the x-direction.
*/
var CAM_X_TRANSLATION = 41;

/**
* This variable keeps track of the default speed of the camera
* in the x-direction.
*/
var CAM_SPEED = 0.025;

/**
* This variable keeps track of the minimum number of cars allowed
* in the simulation.
*/
var MIN_NUMBER_OF_CARS = 2;

/**
* This variable keeps track of the number of genes that each car has.
*/
var NUMBER_OF_GENES = 20;

//Global Variables

/**
* This variable keeps track of points on a car
*/
var points = [];

/**
* This variable holds the car model
*/
var car = 0;

/**
* This variable keeps track of the horizontal velocity of
* the camera.
*/
var camerax = 0;

/**
* This variable keeps track of the vertical velocity of
* the camera.
*/
var cameray = 0;

/**
* This variable keeps track of the change in the horizontal displacement of the camera.
*/
var diffx;

/**
* This variable keeps track of the change in the vertical displacement of the camera.
*/
var diffy;

/**
* This variable keeps track of the game loop thread.
*/
var proc1 = setInterval(update, 1000 / 60);

/**
* This variable keeps track of updateCar thread.
*/
var proc2 = setInterval(nextCar, 1000/60);

/*!
* GENETIC ALGORITHM GLOBAL VARIABLES
*/

//Constants

/**
* This variable indicates the size of the initial population of cars.
*/
var populationSize = $('#populationSizeTextField').val();

/**
* This variable indicates the size of the pool from which parents creat offspring.
*/
var parentPool = $('#numberOfParentsTextField').val();

/**
* This variable indicates the rate at which mutations occur.
*/
var mutationRate = $('#mutationRateTextField').val();;

/**
* This variable array contains the cars in the population cars.
*/
var carsArray = [0,0,0];

/**
* This variable array contains the highest performing cars for the purpose of creating the next generation.
*/
var topCars = [];

/**
* This variable integer indicates the current member of the group of cars.
*/
var currentMember = 0;

/**
* This is the frame rate for the simulation.
*/
var frameRate = 1/60;

/**
 * This is the current generation that the simulation is in.
 */
var currentGeneration = 1;

/**
 * This variable represents whether the user has paused the
 * simulation.
 */
var paused = false;

/*!
    THE VIEW
 */

/**
 * This method initializes the Box2D environment, and any objects within the Box2D world.
 *
 * @return The created Box2D world
 */
function init() {
    world = new b2World(
          new b2Vec2(0, GRAVITY)    //gravity
       , true                 //allow sleep
    );

    if(currentMember < populationSize){
        car = new Car();
        car.generateNewCar();
    } else{
        car = new Car();
        car.setChromosome(carsArray[currentMember%populationSize].getChromosome());
    }

    var xvert = car.getVertexXArray();
    var yvert = car.getVertexYArray();
    var wheelpos = car.getWheelPosArray();
    var wheelrad = car.getWheelRadiusArray();
    var done = false;

    do{
        try{
            car.setCarDef(drawCar(world, WORLD_SCALE, xvert[0], yvert[0], xvert[1], yvert[1], xvert[2], yvert[2], xvert[3], yvert[3], xvert[4], yvert[4], xvert[5], yvert[5], xvert[6], yvert[6], xvert[7], yvert[7], wheelpos[0], wheelpos[1], wheelrad[0], wheelrad[1]));
            done = true;
        } catch(err){
            car.generateNewCar();
        }
    } while(!done);

    connecttile();

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(DRAW_SCALE);
    debugDraw.SetFillAlpha(FILL_ALPHA);
    debugDraw.SetLineThickness(LINE_THICKNESS);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    return world;

};


/**
 * This method updates the screen.
 */
function update() {
    $("#ga-stats").empty();
    $("#ga-stats").append("Population Size: " + populationSize + "<br>");
    $("#ga-stats").append("Parent Pool: " + parentPool + "<br>");
    $("#ga-stats").append("Mutation Rate: " + mutationRate + "<br>");

    world.Step(frameRate, VELOCITY_ITERATION, POSITION_ITERATION);

    world.ClearForces();
    drawworld(world, ctx);

    if(!paused){
        if(Math.abs(diffx) < MOVEMENT_THRESHOLD){
            car.removeHealth();
        } else{
            car.increaseFitness();
        }
    }


};

/**
 * This method selects the next car to be simulated.
 */
function nextCar(){
    var carNumber = (currentMember)%populationSize+1;
    $("#curr-gen").html("Now Running Generation " + currentGeneration + ", Car Number " + carNumber);

    if(car.getHealth() <= 0){
        carsArray[currentMember%populationSize] = car;

        if(currentMember % populationSize == populationSize-1 && currentMember > 0){
            currentGeneration = currentGeneration + 1;

            var topCars = selectNextGeneration(carsArray, parentPool);
            carsArray = crossOverOffsprings(carsArray, topCars);
            carsArray = mutateOffsprings(carsArray, parentPool, 1);
        }
        currentMember = currentMember + 1;


        resetWorld(world);
        resetCamera(world, ctx);
        clearInterval(proc1);
        init();
        proc1 = setInterval(update, INTERVAL_RATE);
    } else if(car.getFitness() > TIMEOUT_RATE){
        car.setFitness(-1);
        car.setHealth(0);
    }
}

/**
 * This method resets the world for the next simulation.
 *
 * @param world    {b2World} The world to be reset.
 */
function resetWorld(world){
    for (var b = world.GetBodyList(); b != null; b = b.GetNext()){
        world.DestroyBody(b);
    }
};

/**
 * This method resets the camera for the next simulation.
 *
 * @param world    {b2World} The world on which the camera is reset.
 * @param context  {Canvas}  The canvas to draw the world on
 */
function resetCamera(world, context){
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.save();
    cameraPos();
    ctx.translate(0, canvas_height);
    world.DrawDebugData();
    ctx.restore();
};

/**
 * This method draws the world on the screen, before it is updated.
 *
 * @param world    {b2World} The world to draw on
 * @param context  {Canvas}  The canvas to draw the world on
 */
function drawworld(world, context){
    ctx.clearRect(0, 0, canvas_width, canvas_height );
    ctx.save();
    cameraPos();
    ctx.translate(DEFAULT_CAM_X - (camerax * CAM_X_TRANSLATION), canvas_height);
    ctx.scale(1, -1);
    world.DrawDebugData();
    ctx.restore();
};


/**
 * This method sets the camera position to the position of the car.
 */
function cameraPos(){
    cameraPositionX = car.getCarDef().GetWorldCenter().x;
    cameraPositionY = car.getCarDef().GetWorldCenter().y;
    diffx = camerax - cameraPositionX;
    diffy = cameray - cameraPositionY;
    camerax -= CAM_SPEED * diffx;
    cameray -= CAM_SPEED * diffy;
};



function resetStats(){
    currentGeneration = 1;
    currentMember = 0;
    $("#results").empty();
    $("#results").append("<h3>Results</h3>");
};

/**
 * function()
 *
 * This method is the entry point to the program.
 */
$(function()
{
    var canvas = $('#canvas');
    ctx = canvas.get(0).getContext('2d');


    //first create the world
    init();

    //get internal dimensions of the canvas
    canvas_width = parseInt(canvas.attr('width'));
    canvas_height = parseInt(canvas.attr('height'));
});

/*!
 * This event handles the event where the user enters a
 * population size.
 */
$('#populationSizeTextField').on('keypress', function (e) {
         if(e.which === 13){

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            var userEnteredValue = $('#populationSizeTextField').val();
            if(!$.isNumeric(userEnteredValue)){
                alert("Please enter a number");
            } else if(userEnteredValue <= 0){
                alert("Please enter a number greater than 0");
            } else if(userEnteredValue <= parentPool){
                alert("Please enter a number that is greater than the parent pool");
            } else{
                populationSize = userEnteredValue;
                resetStats();
            }

            $(this).removeAttr("disabled");
         }
});

/*!
 * This event handles the event where the user enters
 * the number of parents that a generation has.
 */
$('#numberOfParentsTextField').on('keypress', function (e) {
         if(e.which === 13){

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");


            var userEnteredValue = $('#numberOfParentsTextField').val();
            if(!$.isNumeric(userEnteredValue)){
                alert("Please enter a number");
            } else if(userEnteredValue < 2){
                alert("Please enter a number that is 2 or greater");
            } else if(userEnteredValue >= populationSize){
                alert("Please enter a value that is less than the population size");
            } else{
                parentPool = userEnteredValue;
                resetStats();
            }

            $(this).removeAttr("disabled");
         }
});

/*!
 * This event handles the event where the user enters
 *  the mutation rate.
 */
$('#mutationRateTextField').on('keypress', function (e) {
         if(e.which === 13){

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            var userEnteredValue = $('#mutationRateTextField').val();
            if(!$.isNumeric(userEnteredValue)){
                alert("Please enter a number");
            } else if(userEnteredValue < 0){
                alert("Please enter a number that is 0 or greater");
            } else if(userEnteredValue > 1){
                alert("Please enter a number that is 1 or less");
            } else{
                mutationRate = userEnteredValue;
                resetStats();
            }

            $(this).removeAttr("disabled");
         }
});

/*!
 * This event handles the event where the user presses the
 * pause button.
 */
$("#pauseButton").click(function(){
    if(frameRate === 1/60){
        frameRate = 0;
        paused = true;
    } else{
        frameRate = 1/60;
        paused = false;
    }
});