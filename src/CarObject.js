function Car() {
    this.fitness = 0;
    this.health = 10;
    this.carDef = 0;
    this.vertexXArray = [];
    this.vertexYArray = [];
    this.wheelPosArray = [];
    this.wheelRadiusArray = [];
}

/**
 Stuff
 */
Car.prototype = {

    /**
	* Method that generates new car randomly.
	*/
    generateNewCar: function () {
        for (var i = 0; i < 8; i++) {

            var xValue = 0;
            var yValue = 0;

            do {
                xValue = getRandomArbitraryInteger(-3, 3);
            } while (xValue == 0);

            do {
                yValue = getRandomArbitraryInteger(-3, 3);
            } while (yValue == 0);

            this.vertexXArray[i] = xValue;
            this.vertexYArray[i] = yValue;
        }

        for (var i = 0; i < 2; i++) {
            this.wheelPosArray[i] = getRandomArbitraryInteger(1, 8);
            this.wheelRadiusArray[i] = getRandomArbitraryInteger(20, 100);
        }
    },

    /**
	* Method that increases the fitness value of a car by 1.
	*/
    increaseFitness: function () {
        this.fitness = this.fitness + 1;
    },

    /**
	* Method that reduces the health value of a car by 1.
	*/
    removeHealth: function () {
        this.health = this.health - 1;
    },

    /**
	* Method that sets the array of vertices in the horizontal.
	* @param {vertexXArray[]} vertexXArray The array of vertices to be set.
	*/
    setVertexXArray: function (vertexXArray) {
        this.vertexXArray = vertexXArray;
    },

    /**
	* Method that sets a specific vertex in an array of the horizontal vertices to a specific value.
	* @param {vertexXArray[]} vertexXArray The array of vertices where the vertex is present.
	* @param {Integer} i The identify of the specific vertex in the array that is to be altered.
	*/
    setVertexX: function (i, vertexX) {
        this.vertexXArray[i] = vertexX;
    },

    /**
	* Method that sets the array of vertices in the vertical.
	* @param {vertexXArray[]} vertexYArray The array of vertices to be set.
	*/
    setVertexYArray: function (vertexYArray) {
        this.vertexYArray = vertexYArray;
    },

    /**
	* Method that sets a specific vertex in an array of the vertical vertices to a specific value.
	* @param {vertexXArray[]} vertexYArray The array of vertices where the vertex is present.
	* @param {Integer} i The identify of the specific vertex in the array that is to be altered.
	*/
    setVertexY: function (i, vertexY) {
        this.vertexYArray = vertexY;
    },

    /**
    * Method that sets the position of a specific wheel to a specific location.
    * @param {wheelPosArray[]} wheelPos The array that conatins the locations of the wheels.
    * @param {Integer} i The identify of the specific wheel position to be set in the array.
    */
    setWheelPos: function (i, wheelPos) {
        this.wheelPosArray[i] = wheelPos;
    },

    /**
    * Method that sets the radius of a specific wheel.
    * @param {wheelRadius[]} wheelRadius The array that conatins the radiuses of the wheels.
    * @param {Integer} i The identify of the specific wheel radius to be set in the array.
    */
    setWheelRadius: function (i, wheelRadius) {
        this.wheelRadius[i] = wheelRadius;
    },

    /**
    * Method that sets array of wheel radiuses to a specific array.
    * @param {wheelRadius[]} wheelRadiusArray The array that conatins the locations of the wheels.
    */
    setWheelRadiusArray: function (wheelRadiusArray) {
        this.wheelRadius = wheelRadiusArray;
    },

    /**
    * Method that sets the definition of a car.
    * @param {Float} carDef The set value of the ar's definition.
    */
    setCarDef: function (carDef) {
        this.carDef = carDef;
    },

    /**
    * Method that sets the chromosome of a car
    * @param {Chromosome[]} chromosome The chromosome to be altered.
    */
    setChromosome: function (chromosome) {
        this.vertexXArray = chromosome.slice(0, 8);
        this.vertexYArray = chromosome.slice(8, 16);
        this.wheelPosArray = chromosome.slice(16, 18);
        this.wheelRadiusArray = chromosome.slice(18, 20);
    },

    /**
    * Method that sets the health of a car
    * @param {Integer} health The health to be altered.
    */
    setHealth: function (health) {
        this.health = health;
    },

    /**
    * Method that sets the fitness of a car
    * @param {Integer} fitness The fitness to be altered.
    */
    setFitness: function (fitness) {
        this.fitness = fitness;
    },

    /**
    * Method that retrieves the array of horizontal vertices of a car.
    */
    getVertexXArray: function () {
        return this.vertexXArray;
    },

    /**
    * Method that retrieves the array of vertical vertices of a car.
    */
    getVertexYArray: function () {
        return this.vertexYArray;
    },

    /**
    * Method that retrieves the array of wheel positions of a car.
    */
    getWheelPosArray: function () {
        return this.wheelPosArray;
    },

    /**
    * Method that retrieves the array of wheel radiuses of a car.
    */
    getWheelRadiusArray: function () {
        return this.wheelRadiusArray;
    },

    /**
    * Method that retrieves the specific chromosome of a car.
    */
    getChromosome: function () {
        return this.vertexXArray.concat(this.vertexYArray).concat(this.wheelPosArray).concat(this.wheelRadiusArray);
    },

    /**
    * Method that retrieves the health of a car.
    */
    getHealth: function () {
        return this.health;
    },

    /**
    * Method that retrieves the definition of a car.
    */
    getCarDef: function () {
        return this.carDef;
    },

    /**
    * Method that retrieves the fitness of a car.
    */
    getFitness: function () {
        return this.fitness;
    }
};
// JavaScript source code
