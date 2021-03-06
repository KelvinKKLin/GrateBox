//Import Statements
var Heap = require('heap'); //License for the heap package can be found at: https://www.npmjs.com/package/heap

/**
* CAR MODEL
**/
function Car(cartMagnitude, cartAngle, wheelVertex, wheelRadius, axleAngle, mass) {
    this.cartMagnitude = cartMagnitude;
    this.cartAngle = cartAngle;
    this.wheelVertex = wheelVertex;
    this.wheelRadius = wheelRadius;
    this.axleAngle = axleAngle;
    this.mass = mass;
}

function Car2(chromosome){
    this.cartMagnitude = chromosome.slice(0,8);
    this.cartAngle = chromosome.slice(8,16);
    this.wheelVertex = chromosome.slice(16,24);
    this.wheelRadius = chromosome.slice(24,32);
    this.axleAngle = chromosome.slice(32,40);
    this.mass = chromosome[40];
}

Car.prototype = {
    getCartMagnitude : function(){
        return this.cartMagnitude;
    },

    getCartAngle : function(){
        return this.getCartAngle;
    },

     getWheelVertex : function(){
        return this.wheelVertex;
     },

     getWheelRadius : function(){
        return this.wheelRadius;
     },

     getAxleAngle : function(){
        return this.axleAngle;
     },

     getMass : function(){
        return this.mass;
     },

     getFitness : function(){
        return this.cartMagnitude[0]; //TODO: Update this
     },

     getChromosome : function(){
        return this.cartMagnitude.concat(this.cartAngle).concat(this.wheelVertex).concat(this.wheelRadius).concat(this.axleAngle).concat(this.mass);
     },

     setChromosome : function(chromosome){
        this.cartMagnitude = chromosome.slice(0,8);
        this.cartAngle = chromosome.slice(8,16);
        this.wheelVertex = chromosome.slice(16,24);
        this.wheelRadius = chromosome.slice(24,32);
        this.axleAngle = chromosome.slice(32,40);
        this.mass = chromosome[40];
     },

     printChromosome : function(){
        console.log(this.getChromosome());
     }

};

Car2.prototype = {
    getCartMagnitude : function(){
        return this.cartMagnitude;
    },

    getCartAngle : function(){
        return this.getCartAngle;
    },

     getWheelVertex : function(){
        return this.wheelVertex;
     },

     getWheelRadius : function(){
        return this.wheelRadius;
     },

     getAxleAngle : function(){
        return this.axleAngle;
     },

     getMass : function(){
        return this.mass;
     },

     getFitness : function(){
        return this.cartMagnitude[0]; //TODO: Update this
     },

     getChromosome : function(){
        return this.cartMagnitude.concat(this.cartAngle).concat(this.wheelVertex).concat(this.wheelRadius).concat(this.axleAngle).concat(this.mass);
     },

     setChromosome : function(chromosome){
        this.cartMagnitude = chromosome.slice(0,8);
        this.cartAngle = chromosome.slice(8,16);
        this.wheelVertex = chromosome.slice(16,24);
        this.wheelRadius = chromosome.slice(24,32);
        this.axleAngle = chromosome.slice(32,40);
        this.mass = chromosome[40];
     },

     printChromosome : function(){
        console.log(this.getChromosome());
     }

};

/**
* Genetic Algorithm
**/
function selectNextGeneration(cars, n) {
    if (cars.length < n || n<1) {
        return "error";
    }
    else {
        var cars = cars;
        var n = n;
        var topCars = [];

        cars = quicksort(cars, 0, cars.length - 1);

        for (var i = 0; i < n; i++) {
            topCars.push(cars[i]);
        }

        /*var heap = new Heap(function(a, b){
            return b.cartMagnitude()[0] - a.cartMagnitude()[0]; //Defines Max-Heap Property
        });
    
        for(var i = 0; i < cars.length; i++){
            heap.push(cars[i]);
        }
    
        for(var i = 0; i < n; i++){
            topCars.push(heap.pop());
        }*/

        return topCars;
    }
    
};

function crossoverOffspring(cars, topCars){
    var cars2 = [];

    if(topCars.length < 2){
        return "error";
    }

    for(var i = 0; i < topCars.length; i++){
        if(cars2.length < cars.length){
            cars2.push(topCars[i]);
        }
    }

    for(var i = topCars.length; i < cars.length; i++){
        //Mutate Car
        do{
            var parent1Index = getRandomArbitraryInteger(0, topCars.length-1);
            console.log("Parent 1 Index: " + parent1Index);
            var parent2Index = getRandomArbitraryInteger(0, topCars.length-1);
            console.log("Parent 2 Index: " + parent2Index);
            console.log("\n");
        } while (parent1Index === parent2Index);

        var parent1 = topCars[parent1Index].getChromosome();
        var parent2 = topCars[parent2Index].getChromosome();

        var geneIndex = getRandomArbitraryInteger(0, 41);
        console.log("Gene Index: " + geneIndex);

        parent1[geneIndex] = parent2[geneIndex];

        //Push Mutated Car into cars2
        cars2.push( new Car2(parent1) );
    }

    return cars2;

}

function mutateOffsprings(cars, numberOfParents, mutationFactor) {
    if (mutationFactor < 0) {
        return "error";
    }
    else {//For each car
        for (var i = numberOfParents; i < cars.length; i++) {
            var chromosome = cars[i].getChromosome();
            //For each gene in the chromosome
            for (var j = 0; j < chromosome.length; j++) {
                var mutationChance = getRandomArbitrary(0, 1);
                //If the gene should randomly mutate
                if (mutationChance < mutationFactor) {
                    var min = 0;
                    var max = 1;
                    chromosome[j] = getRandomArbitrary(min, max);
                }
            }
            cars[i].setChromosome(chromosome);
        }

        return cars;
    }
    
}

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

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

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

//The following code was obtained from the Mozilla Developer Network Documentation which can be found at:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//The following code was obtained from StackOverflow at:
//http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomArbitraryInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random Values Chosen to Easily Identify Cars
var cartMagnitude = [1, 2, 3, 4, 5, 6, 7, 8];
var cartAngle = [9, 10, 11, 12, 13, 14, 15, 16];
var wheelVertex = [17, 18, 19, 20, 21, 22, 23, 24];
var wheelRadius = [25, 26, 27, 28, 29, 30, 31, 32];
var axleAngle = [33, 34, 35, 36, 37, 38, 39, 40];
var mass = 3.14;

//Random cars
var car1 = new Car(cartMagnitude, cartAngle, wheelVertex, wheelRadius, axleAngle, mass);
var car2 = new Car(cartAngle, cartAngle, cartAngle, cartAngle, cartAngle, 222);
var car3 = new Car(wheelVertex, wheelRadius, axleAngle, cartMagnitude, cartAngle, mass);
var carsArray = [car1, car2, car3];



//The top car should be car 3, then car 2
console.log("Top 1 Car out of 3");
var topCars1 = selectNextGeneration(carsArray, 1);
for(var i = 0; i < topCars1.length; i++){
    topCars1[i].printChromosome();
    console.log("\n");
}

console.log("Top 2 Cars out of 3");
var topCars2 = selectNextGeneration(carsArray, 2);
for(var i = 0; i < topCars2.length; i++){
    console.log("CAR #" + (i+1));
    topCars2[i].printChromosome();
    console.log("\n");
}

topCars2 = crossoverOffspring(carsArray, topCars2);
console.log("Length of topCars2: " + topCars2.length + "\n");
console.log("RESULTS OF CROSSOVER: \n");
for(var i = 0; i < topCars2.length; i++){
    topCars2[i].printChromosome();
    console.log("\n");
}

console.log("MUTATIONS: ")
topCars2 = mutateOffsprings(carsArray, 2, 1);

for(var i = 0; i < topCars2.length; i++){
    topCars2[i].printChromosome();
    console.log("\n");

}



