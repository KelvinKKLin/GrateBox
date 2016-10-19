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
        return this.cartAngle;
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

//Random Values Chosen to Easily Identify Cars
var cartMagnitude = [1, 2, 3, 4, 5, 6, 7, 8];
var cartAngle = [9, 10, 11, 12, 13, 14, 15, 16];
var wheelVertex = [17, 18, 19, 20, 21, 22, 23, 24];
var wheelRadius = [25, 26, 27, 28, 29, 30, 31, 32];
var axleAngle = [33, 34, 35, 36, 37, 38, 39, 40];
var mass = 3.14;

//Random cars
var car1 = new Car(cartMagnitude, cartAngle, wheelVertex, wheelRadius, axleAngle, mass);

console.log("CART MAGNITUDE: ");
console.log(car1.getCartMagnitude());
console.log("\n");

console.log("CART ANGLE: ");
console.log(car1.getCartAngle());
console.log("\n");

console.log("CART MAGNITUDE: ");
console.log(car1.getWheelVertex());
console.log("\n");

console.log("WHEEL RADIUS: ");
console.log(car1.getWheelRadius());
console.log("\n");

console.log("AXLE ANGLE: ");
console.log(car1.getAxleAngle());
console.log("\n");

console.log("MASS: ");
console.log(car1.getMass());
console.log("\n");

console.log("CHROMOSOME: ");
console.log(car1.getChromosome());
console.log("\n");