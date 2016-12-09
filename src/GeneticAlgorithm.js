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