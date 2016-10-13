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
        return this.cartMagnitude[0];
     }

};

/**
* Genetic Algorithm
**/
function selectNextGeneration(cars, n) {

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

    return topCars;
};


/***********
*Test Cases*
***********/

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
var carsArray = [car1, car2];

//Selecting the of 2 cars
var topCars = selectNextGeneration(carsArray, 1);
for(var i = 0; i < topCars.length; i++){
    console.log(topCars[i].getFitness());
}
