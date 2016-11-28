/**
* b2Vec2
*
* This imports the Box2D Vector and any associated methods.
*/
var userinputpopulation = document.getElementById(POPULATION_SIZE);
var userinputparents = document.getElementById(NumberofParent);
var userinputMutation = document.getElementById(MutationRate);

/**
* points
*
* This variable keeps track of points on a car
*/
var points = [];

/**
* car
*
* This variable holds the car model
*/
var car = 0;

/**
* camerax
*
* This variable keeps track of the horizontal velocity of
* the camera.
*/
var camerax = 0;

/**
* cameray
*
* This variable keeps track of the vertical velocity of
* the camera.
*/
var cameray = 0;

/**
* diffx
*
* This variable keeps track of the change in the horizontal displacement of the camera.
*/
var diffx;

/**
* diffy
*
* This variable keeps track of the change in the vertical displacement of the camera.
*/
var diffy;

/**
* proc1
*
* This variable keeps track of the game loop thread.
*/
var proc1 = setInterval(update, 1000 / 60);

/**
* proc2
*
* This variable keeps track of updateCar thread.
*/
var proc2 = setInterval(nextCar, 1000/60);

/*!
* GENETIC ALGORITHM GLOBAL VARIABLES
*/

//Constants

/**
* POPULATION_SIZE
*
* This constant indicates the size of the initial population of cars.
*/
var POPULATION_SIZE = 3;

/**
* PARENT_POOL
*
* This constant indicates the size of the pool from which parents creat offspring.
*/
var PARENT_POOL = 2;

/**
* MUTATION_RATE
*
* This constant indicates the rate at which mutations occur.
*/
var MUTATION_RATE = 0.02;

//Variables

/**
* carsArray
*
* This variable array contains the cars in the population cars.
*/
var carsArray = [0,0,0];

/**
* topCars
*
* This variable array contains the highest performing cars for the purpose of creating the next generation.
*/
var topCars = [];

/**
* currentMember
*
* This variable integer indicates the current member of the group of cars.
*/
var currentMember = 0;

var GRAVITY = 9.8;
var WORLD_SCALE = 60;
var NUMBER_OF_MEMBERS = 3;
var DRAW_SCALE = 40.0;
var FILL_ALPHA = 0.3;
var LINE_THICKNESS = 1.0;

var FRAME_RATE = 1/60;
var VELOCITY_ITERATION = 10;
var POSITION_ITERATION = 10;
var MOVEMENT_THRESHOLD = 0.01;

var INTERVAL_RATE = 1000/60;
var TIMEOUT_RATE = 1000000000;

var DEFAULT_CAM_X = 200;
var CAM_X_TRANSLATION = 42;

var CAM_SPEED = 0.025;

var MIN_NUMBER_OF_CARS = 2;
var NUMBER_OF_GENES = 20;

var currentGeneration = 1;
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

    if(currentMember < NUMBER_OF_MEMBERS){
        car = new Car();
        car.generateNewCar();
    } else{
        car = new Car();
        car.setChromosome(carsArray[currentMember%NUMBER_OF_MEMBERS].getChromosome());
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
    world.Step(FRAME_RATE, VELOCITY_ITERATION, POSITION_ITERATION);

    world.ClearForces();
    drawworld(world, ctx);
    if(Math.abs(diffx) < MOVEMENT_THRESHOLD){
        car.removeHealth();
    } else{
        car.increaseFitness();
    }
};

/**
 * This method selects the next car to be simulated.
 */
function nextCar(){
    var carNumber = (currentMember)%3+1;
    $("#curr-gen").html("Now Running Generation " + currentGeneration + ", Car Number " + carNumber);

    if(car.getHealth() <= 0){
        carsArray[currentMember%NUMBER_OF_MEMBERS] = car;

        if(currentMember % NUMBER_OF_MEMBERS == NUMBER_OF_MEMBERS-1 && currentMember > 0){
            currentGeneration = currentGeneration + 1;

            var topCars = selectNextGeneration(carsArray, PARENT_POOL);
            carsArray = crossOverOffsprings(carsArray, topCars);
            carsArray = mutateOffsprings(carsArray, PARENT_POOL, 1);
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
 * This method creates a box with a specified width and height rotated at a specified angle on the screen.
 *
 * @param world    {b2World} The Box2D world that the box is created in
 * @param x        {Integer} The x-coordinate of the upper left corner
 * @param y        {Integer} The y-coordinate of the upper left corner
 * @param width    {Integer} The width of the box
 * @param height   {Integer} The height of the box
 * @param angle    {Float}   The rotation of the box, counterclockwise from the horizontal, in radians
 * @return         {Body}    The box
 */


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

/*!
 * THE GENETIC ALGORITHM
 */

/**
* This method selects for the next generation of cars.
* @param {Cars[]} cars The array of cars to choose from.
* @param {Integer} n The number of cars to select for.
* @return {Cars[]} An array of the top n cars.
*/
function selectNextGeneration(cars, n){
    var cars = cars;
    var n = n;
    var topCars = [];
    var heap = new Heap(function(a, b){
        return b.getFitness() - a.getFitness(); //Defines Max-Heap Property
    });

    for(var i = 0; i < cars.length; i++){
        heap.push(cars[i]);
    }

    for(var i = 0; i < n; i++){
        topCars.push(heap.pop());
    }

    $("#results").append("Top car of generation " + currentGeneration + " ran for " + topCars[0].getFitness() +" cycles <br/>");
    return topCars;
};

/**
* This method crosses over the chromosomes of the offspring
* cars.
* @param {Cars[]} cars The array of cars to crossover
* @param {Integer} topCars The number of cars in the surviving parent generation
* @return {Cars[]} An array of the crossed-over cars
*/
function crossOverOffsprings(cars, topCars){

    var cars2 = [];

    if(topCars.length < MIN_NUMBER_OF_CARS){
        return cars;
    }

    for(var i = 0; i < topCars.length; i++){
        if(cars2.length < cars.length){
            cars2.push(topCars[i]);
        }
    }

    for(var i = topCars.length; i < cars.length; i++){

        do{
            var parent1Index = getRandomArbitraryInteger(0, topCars.length - 1);
            var parent2Index = getRandomArbitraryInteger(0, topCars.length - 1);
        } while(parent1Index == parent2Index);

        var parent1 = topCars[parent1Index].getChromosome();
        var parent2 = topCars[parent2Index].getChromosome();

        var geneIndex = getRandomArbitraryInteger(0, NUMBER_OF_GENES);
        parent1[geneIndex] = parent2[geneIndex];

        var newCar = new Car();
        newCar.setChromosome(parent1);
        cars2.push(newCar);
    }
    return cars2;
};

/**
* This method mutates the genes in the offspring's chromosomes.
* @param {Cars[]} cars The array of cars to crossover
* @param {Integer} numberOfParents The number of parents in the cars array
* @param {Float} mutationFactor The likelihood of mutation
* @return {Cars[]} An array of the mutated cars
*/
function mutateOffsprings(cars, numberOfParents, mutationFactor){
    for(var i = numberOfParents; i < cars.length; i++){
        var vertexX = cars[i].getVertexXArray();
        var vertexY = cars[i].getVertexYArray();
        var wheelPos = cars[i].getWheelPosArray();
        var wheelRadius = cars[i].getWheelRadiusArray();

        for(var j = 0; j < vertexX.length; j++){
            var mutationChance = getRandomArbitrary(0, 1);
            if(mutationChance < mutationFactor){
                var min = -3;
                var max = 3;
                var value = 0;
                do{
                    value = getRandomArbitraryInteger(min, max);
                } while(value == 0);

                var newCar = new Car();
                var chromosome = cars[i].getChromosome();
                newCar.setChromosome(chromosome);
                newCar.setVertexX(j, value);
                cars[i] = newCar;
            }
        }

        for(var j = 0; j < vertexY.length; j++){
            var mutationChance = getRandomArbitrary(0, 1);
            if(mutationChance < mutationFactor){
                var min = -3;
                var max = 3;
                var value = 0;
                do{
                    value = getRandomArbitraryInteger(min, max);
                } while(value == 0);

                var newCar = new Car();
                var chromosome = cars[i].getChromosome();
                newCar.setChromosome(chromosome);
                newCar.setVertexY(j, value);
                cars[i] = newCar;
            }
        }

        for(var j = 0; j < wheelPos.length; j++){
            var mutationChance = getRandomArbitrary(0, 1);
            if(mutationChance < mutationFactor){
                var min = 1;
                var max = 8;
                value = getRandomArbitraryInteger(min, max);

                var newCar = new Car();
                var chromosome = cars[i].getChromosome();
                newCar.setChromosome(chromosome);
                newCar.setWheelPos(j, value);
                cars[i] = newCar;

            }
        }

        for(var j = 0; j < wheelRadius.length; j++){
            var mutationChance = getRandomArbitrary(0, 1);
            if(mutationChance < mutationFactor){
                var min = 20;
                var max = 100;
                value = getRandomArbitraryInteger(min, max);
                wheelRadius[j] = value;

                var newCar = new Car();
                var chromosome = cars[i].getChromosome();
                console.log(chromosome);
                newCar.setChromosome(chromosome);
                newCar.setWheelRadiusArray(wheelRadius);

                cars[i] = newCar;
            }
        }
    }
    return cars;
};

/*!
 * THE CAR
 */

/**
* This method establishes the initial values shared by all cares. All cars start with 10 health and have a fitness and carDef of 0.
*/

/*!
 * MISC
 */

/**
* This method generates a random integer between min and max, exclusive.
* @param {Integer} min The lower bound
* @param {Integer} max The upper bound
* @return {Integer} A random number between min and max
*/
function getRandomArbitraryInteger(min, max){
    //The following code was obtained from
    ////http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
* This method generates a random floating point number between min and
* max, exclusive.
* @param {Integer} min The lower bound
* @param {Integer} max The upper bound
* @return {Float} A floating point number between min and max.
*/
function getRandomArbitrary(min, max){
    //The following code was obtained from
    ////https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.random() * (max - min) + min;
};



/**
 * function()
 *
 * This method is the entry point to the program.
 */
$(function()
{
    $("#ga-stats").append("Population Size: " + POPULATION_SIZE + "<br>");
    $("#ga-stats").append("Parent Pool: " + PARENT_POOL + "<br>");
    $("#ga-stats").append("Mutation Rate: " + MUTATION_RATE + "<br>");


    var canvas = $('#canvas');
    ctx = canvas.get(0).getContext('2d');


    //first create the world
    init();

    //get internal dimensions of the canvas
    canvas_width = parseInt(canvas.attr('width'));
    canvas_height = parseInt(canvas.attr('height'));
});



