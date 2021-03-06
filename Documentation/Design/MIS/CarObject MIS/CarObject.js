//Symbolic Parameters

/**
* This variable keeps track of the car's health
*/
var CAR_HEALTH = 10;

/**
* This variable keeps track of the car's fitness
*/
var CAR_FITNESS = 0;

/**
* This variable keeps track of the number of vectors that a car has
*/
var NUMBER_OF_VECTORS = 8;

/**
* This variable keeps track of the minimum radius a wheel can have
*/
var MIN_WHEEL_RADIUS = 20;

/**
* This variable keeps track of the maximum radius a wheel can have
*/
var MAX_WHEEL_RADIUS = 100;

/**
* This variable keeps track of the number of wheels a car can have
*/
var NUMBER_OF_WHEELS = 2;

/**
* This variable keeps track of the starting location of the X-vector
* on the car's chromosome.
*/
var VECT_X_LOC = 0;

/**
* This variable keeps track of the starting location of the Y-vector
* on the car's chromosome.
*/
var VECT_Y_LOC = 8;

/**
* This variable keeps track of the starting location of the wheel
* position array on the car's chromosome.
*/
var WHEEL_POS_LOC = 16;

/**
* This variable keeps track of the starting location of the wheel radi
* on the car's chromosome.
*/
var WHEEL_RADIUS_LOC = 18;

/**
 * @constructor Car
 */
function Car() {
    this.fitness = CAR_FITNESS;
    this.health = CAR_HEALTH;
    this.carDef = 0;
    this.vertexXArray = [];
    this.vertexYArray = [];
    this.wheelPosArray = [];
    this.wheelRadiusArray = [];
}


/**
* Method that generates new car randomly.
*/
function generateNewCar(){
    for (var i = 0; i < NUMBER_OF_VECTORS; i++) {

        var xValue = 0;
        var yValue = 0;

        var minRange = -3;
        var maxRange = 3;

        do {
            xValue = getRandomArbitraryInteger(minRange, maxRange);
        } while (xValue == 0);

        do {
            yValue = getRandomArbitraryInteger(minRange, maxRange);
        } while (yValue == 0);

        this.vertexXArray[i] = xValue;
        this.vertexYArray[i] = yValue;
    }

    for (var i = 0; i < NUMBER_OF_WHEELS; i++) {
        this.wheelPosArray[i] = getRandomArbitraryInteger(1, NUMBER_OF_VECTORS);
        this.wheelRadiusArray[i] = getRandomArbitraryInteger(MIN_WHEEL_RADIUS, MAX_WHEEL_RADIUS);
    }
};

/**
* Method that increases the fitness value of a car by 1.
*/
function increaseFitness(){
    this.fitness = this.fitness + 1;
};

/**
* Method that reduces the health value of a car by 1.
*/
function removeHealth(){
    this.health = this.health - 1;
};

/**
* Method that sets the array of vertices in the horizontal.
* @param {vertexXArray[]} vertexXArray The array of vertices to be set.
*/
function setVertexXArray(vertexXArray){
    this.vertexXArray = vertexXArray;
};

/**
* Method that sets a specific vertex in an array of the horizontal vertices to a specific value.
* @param {vertexXArray[]} vertexXArray The array of vertices where the vertex is present.
* @param {Integer} i The identify of the specific vertex in the array that is to be altered.
*/
function setVertexX(i, vertexX){
    this.vertexXArray[i] = vertexX;
};

/**
* Method that sets the array of vertices in the vertical.
* @param {vertexXArray[]} vertexYArray The array of vertices to be set.
*/
function setVertexYArray(vertexYArray){
    this.vertexYArray = vertexYArray;
};

/**
* Method that sets a specific vertex in an array of the vertical vertices to a specific value.
* @param {vertexXArray[]} vertexYArray The array of vertices where the vertex is present.
* @param {Integer} i The identify of the specific vertex in the array that is to be altered.
*/
function setVertexY(i, vertexY){
    this.vertexYArray = vertexY;
};

/**
* Method that sets the position of a specific wheel to a specific location.
* @param {wheelPosArray[]} wheelPos The array that conatins the locations of the wheels.
* @param {Integer} i The identify of the specific wheel position to be set in the array.
*/
function setWheelPos(i, wheelPos){
    this.wheelPosArray[i] = wheelPos;
};

/**
* Method that sets the radius of a specific wheel.
* @param {wheelRadius[]} wheelRadius The array that conatins the radiuses of the wheels.
* @param {Integer} i The identify of the specific wheel radius to be set in the array.
*/
function setWheelRadius(i, wheelRadius){
    this.wheelRadius[i] = wheelRadius;
};

/**
* Method that sets array of wheel radiuses to a specific array.
* @param {wheelRadius[]} wheelRadiusArray The array that conatins the locations of the wheels.
*/
function setWheelRadiusArray(wheelRadiusArray){
    this.wheelRadius = wheelRadiusArray;
};

/**
* Method that sets the definition of a car.
* @param {Float} carDef The set value of the ar's definition.
*/
function setCarDef(carDef){
    this.carDef = carDef;
};

/**
* Method that sets the chromosome of a car
* @param {Chromosome[]} chromosome The chromosome to be altered.
*/
function setChromosome(chromosome){
    this.vertexXArray = chromosome.slice(VECT_X_LOC, VECT_Y_LOC);
    this.vertexYArray = chromosome.slice(VECT_Y_LOC, WHEEL_POS_LOC);
    this.wheelPosArray = chromosome.slice(WHEEL_POS_LOC, WHEEL_RADIUS_LOC);
    this.wheelRadiusArray = chromosome.slice(WHEEL_RADIUS_LOC, WHEEL_RADIUS_LOC+NUMBER_OF_WHEELS);
};

/**
* Method that sets the health of a car
* @param {Integer} health The health to be altered.
*/
function setHealth(health){
    this.health = health;
};

/**
* Method that sets the fitness of a car
* @param {Integer} fitness The fitness to be altered.
*/
function setFitness(fitness){
    this.fitness = fitness;
};

/**
* Method that retrieves the array of horizontal vertices of a car.
* @returns {Integer[]} The x-vertex array
*/
function getVertexXArray(){
    return this.vertexXArray;
};

/**
* Method that retrieves the array of vertical vertices of a car.
* @returns {Integer[]} The y-vertex array
*/
function getVertexYArray(){
    return this.vertexYArray;
};

/**
* Method that retrieves the array of wheel positions of a car.
* @returns {Integer[]} The wheel position array
*/
function getWheelPosArray(){
    return this.wheelPosArray;
};

/**
* Method that retrieves the array of wheel radiuses of a car.
* @returns {Integer[]} The wheel radius array
*/
function getWheelRadiusArray(){
    return this.wheelRadiusArray;
};

/**
* Method that retrieves the specific chromosome of a car.
* @returns {Integer[]} The car's chromosome
*/
function getChromosome(){
    return this.vertexXArray.concat(this.vertexYArray).concat(this.wheelPosArray).concat(this.wheelRadiusArray);
};

/**
* Method that retrieves the health of a car.
* @returns {Integer} The health of the car
*/
function getHealth(){
    return this.health;
};

/**
* Method that retrieves the definition of a car.
* @returns {BodyDef} The car's body definition
*/
function getCarDef(){
    return this.carDef;
};

/**
* Method that retrieves the fitness of a car.
* @returns {Integer} The car's fitness
*/
function getFitness(){
    return this.fitness;
};
