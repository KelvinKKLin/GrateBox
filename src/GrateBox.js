//Symbolic Parameters

/**
* GRAVITY
*
* This variable keeps track of the acceleration of gravity in the simulation.
*/
var GRAVITY = 9.8;

/**
* WORLD_SCALE
*
* This variable keeps track of the scaling factor for the objects in the simulation.
*/
var WORLD_SCALE = 60;

/**
* DRAW_SCALE
*
* This variable keeps track of the scaling factor of the display of the simulation.
*/
var DRAW_SCALE = 40.0;

/**
* FILL_ALPHA
*
* This variable keeps track of the alpha value of the display of the simulation.
*/
var FILL_ALPHA = 0.3;

/**
* LINE_THICKNESS
*
* This variable keeps track of the line thickness.
*/
var LINE_THICKNESS = 1.0;

/**
* VELOCITY_ITERATION
*
* This variable keeps track of the timestep used to update velocity in the
* simulation.
*/
var VELOCITY_ITERATION = 10;

/**
* POSITION_ITERATION
*
* This variable keeps track of the timestep used to update the position in
* the simulation.
*/
var POSITION_ITERATION = 10;

/**
* MOVEMENT_THRESHOLD
*
* This variable keeps track of the minimum amount that a car has to move per
* iteration in order for it to be considered moving.
*/
var MOVEMENT_THRESHOLD = 0.01;

/**
* INTERVAL_RATE
*
* This variable keeps track of how often the simulation updates.
*/
var INTERVAL_RATE = 1000/60;

/**
* TIMEOUT_RATE
*
* This variable keeps track of the maximum lifespan of the car.
*/
var TIMEOUT_RATE = 1000000000;

/**
* DEFAULT_CAM_X
*
* This variable keeps track of the default shift factor for the
* camera in the x-direction.
*/
var DEFAULT_CAM_X = 300;

/**
* CAM_X_TRANSLATION
*
* This variable keeps track of the default shift factor in the
* movement of the camera in the x-direction.
*/
var CAM_X_TRANSLATION = 41;

/**
* CAM_SPEED
*
* This variable keeps track of the default speed of the camera
* in the x-direction.
*/
var CAM_SPEED = 0.025;

/**
* MIN_NUMBER_OF_CARS
*
* This variable keeps track of the minimum number of cars allowed
* in the simulation.
*/
var MIN_NUMBER_OF_CARS = 2;

/**
* NUMBER_OF_GENES
*
* This variable keeps track of the number of genes that each car has.
*/
var NUMBER_OF_GENES = 20;

//Global Variables

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
* populationSize
*
* This constant indicates the size of the initial population of cars.
*/
var populationSize = $('#populationSizeTextField').val();

/**
* parentPool
*
* This constant indicates the size of the pool from which parents creat offspring.
*/
var parentPool = $('#numberOfParentsTextField').val();

/**
* mutationRate
*
* This constant indicates the rate at which mutations occur.
*/
var mutationRate = $('#mutationRateTextField').val();;

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

/**
* frameRate
*
* This is the frame rate for the simulation.
*/
var frameRate = 1/60;

/**
 * currentGeneration
 *
 * This is the current generation that the simulation is in.
 */
var currentGeneration = 1;

/**
 * paused
 *
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
    cars = quicksort(cars, 0, cars.length - 1);

    for (var i = 0; i < n; i++) {
        topCars.push(cars[i]);
    }

    $("#results").append("Top car of generation " + (currentGeneration-1) + " ran for " + topCars[0].getFitness() +" cycles <br/>");
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
                var min = -0.5;
                var max = 0.5;
                var value = 0;
                do{
                    value = getRandomArbitrary(min, max);
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
                var min = -0.5;
                var max = 0.5;
                var value = 0;
                do{
                    value = getRandomArbitrary(min, max);
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
 * MISC
 */

/**
 * This method preforms quicksort on an array of cars according to fitness value.
 *
 * The following code was modified from: https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
 *
 * @param cars {Cars[]} The array of cars to sort
 * @param left {Integer} The left index
 * @param right {Integer} The right index
 * @return The sorted cars array
 */
function quicksort(cars, left, right){
    var index;

    if (cars.length > 1) {
        index = partition(cars, left, right);
        if (left < index - 1) {
            quicksort(cars, left, index - 1);
        }

        if (index < right) {
            quicksort(cars, index, right);
        }
    }

    return cars;
}

/**
 * This method swaps 2 items in an array.
 *
 * The following code was obtained from: https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
 *
 * @param items {Cars[]} An array of cars
 * @param firstIndex {Integer} The index of the first car to swap
 * @param secondIndex {Integer} The index of the second car to swap
 */
function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

/**
 * This method partitions the array into two sets based on a pivot.
 *
 * The following code was modified from: https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
 *
 * @param items {Cars[]} An array of cars
 * @param left {Integer} The left index of the pivot
 * @param right {Integer} The right index of the pivot
 * @return The left index of the partitioned array
 */
function partition(items, left, right) {
    var pivot   = items[((right + left) / 2)]
    var i       = left;
    var j       = right;

    while (i <= j) {
        while (Math.random*100 < pivot) {
            i++;
        }

        while (Math.random * 100 > pivot) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

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