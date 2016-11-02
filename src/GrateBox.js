﻿/*!
Graphics
*/

/**
* Displays a path on the screen.
*/
function displayPath(){

};

/**
* Displays the cars on the screen.
* @param {Cars[]} cars The array of cars to display
*/
function displayCar(cars){

};

/**
* Tests to see if the furthest car is alive, and if
* not, it resets the camera.
*/
function cleanCamera(){

};



/*!
Genetic Algorithm
*/

/**
* This method creates a new generation of cars.
* @param {Integer} The number of cars in the generation
* @return {Car[]} An array of cars, denoting the new generation.
*/
function createGeneration(n){

}

/**
* This method selects for the next generation of cars.
* @param {Cars[]} cars The array of cars to choose from.
* @param {Integer} n The number of cars to select for.
* @return {Cars[]} An array of the top n cars.
*/
function selectNextGeneration(cars, n){

};

/**
* This method crosses over the chromosomes of the offspring
* cars.
* @param {Cars[]} cars The array of cars to crossover
* @param {Integer} topCars The number of cars in the surviving parent generation
* @return {Cars[]} An array of the crossed-over cars
*/
function crossOverOffsprings(cars, topCars){

};

/**
* This method mutates the genes in the offspring's chromosomes.
* @param {Cars[]} cars The array of cars to crossover
* @param {Integer} numberOfParents The number of parents in the cars array
* @param {Float} mutationFactor The likelihood of mutation
* @return {Cars[]} An array of the mutated cars
*/
function mutateOffsprings(cars, numberOfParents, mutationFactor){

};

/*!
Car Model
*/

/**
* This method returns the chromosome of the car.
* @return {Object[]} A multi-typed array representing the chromosome of the car.
*/
function getChromosome(){

}

/*!
Misc
*/

/**
* This method generates a random integer between min and max, exclusive.
* @param {Integer} min The lower bound
* @param {Integer} max The upper bound
* @return {Integer} A random number between min and max
*/
function getRandomArbitraryInteger(min, max){

};

/**
* This method generates a random floating point number between min and
* max, exclusive.
* @param {Integer} min The lower bound
* @param {Integer} max The upper bound
* @param {Float} A floating point number between min and max.
*/
function getRandomArbitrary(min, max){

};