QUnit.test("GA1.1", function (assert) {

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

    var cars2 = [car2, car1];
    var topCars = selectNextGeneration(carsArray, 2);
    carsArray = crossoverOffspring(carsArray, topCars);


    assert.deepEqual(mutateOffsprings(carsArray, 2, 0), cars2, "0 mutation rate passed!");
});

/*QUnit.test("GA1.2", function (assert) {

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

    var cars2 = [car2, car1];
    var topCars = selectNextGeneration(carsArray, 2);
    carsArray = crossoverOffspring(carsArray, topCars);


    assert.deepEqual(mutateOffsprings(carsArray, 2, 0), cars2, "0 mutation rate passed!");
});*/

QUnit.test("GA1.3", function (assert) {

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

    var cars2 = [car2, car1];
    var topCars = selectNextGeneration(carsArray, 2);
    carsArray = crossoverOffspring(carsArray, topCars);


    assert.deepEqual(mutateOffsprings(carsArray, 2, -0.1), "error", "0 mutation rate passed!");
});



QUnit.test("GA2.1", function (assert) {

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

    var cars2 = [car2,car3,car1];
    var topCars = selectNextGeneration(carsArray, 3);


    assert.deepEqual(crossoverOffspring(carsArray, topCars), cars2, "Top 3 Offsprings selection passed!");
});


QUnit.test("GA2.2", function (assert) {

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

    var cars2 = [car2, car1];
    var topCars = selectNextGeneration(carsArray, 2);


    assert.deepEqual(crossoverOffspring(carsArray, topCars), cars2, "Top 2 Offsprings selection passed!");
});

QUnit.test("GA2.3", function (assert) {

    var cartMagnitude = [1, 2, 3, 4, 5, 6, 7, 8];
    var cartAngle = [9, 10, 11, 12, 13, 14, 15, 16];
    var wheelVertex = [17, 18, 19, 20, 21, 22, 23, 24];
    var wheelRadius = [25, 26, 27, 28, 29, 30, 31, 32];
    var axleAngle = [33, 34, 35, 36, 37, 38, 39, 40];
    var mass = 3.14;

    //Random cars
    var car1 = new Car(cartMagnitude, cartAngle, wheelVertex, wheelRadius, axleAngle, mass);
    var carsArray = [car1];

    var topCars = selectNextGeneration(carsArray, 1);


    assert.deepEqual(crossoverOffspring(carsArray, topCars), "error", "error print passed!");
});

QUnit.test("GA2.4", function (assert) {

    var cartMagnitude = [1, 2, 3, 4, 5, 6, 7, 8];
    var cartAngle = [9, 10, 11, 12, 13, 14, 15, 16];
    var wheelVertex = [17, 18, 19, 20, 21, 22, 23, 24];
    var wheelRadius = [25, 26, 27, 28, 29, 30, 31, 32];
    var axleAngle = [33, 34, 35, 36, 37, 38, 39, 40];
    var mass = 3.14;

    //Random cars
    var car1 = new Car(cartMagnitude, cartAngle, wheelVertex, wheelRadius, axleAngle, mass);
    var carsArray = [car1];

    var topCars = selectNextGeneration(carsArray, 0);


    assert.deepEqual(selectNextGeneration(carsArray, 0), "error", "error print passed!");
});

QUnit.test("GA2.5", function (assert) {

    var cartMagnitude = [1, 2, 3, 4, 5, 6, 7, 8];
    var cartAngle = [9, 10, 11, 12, 13, 14, 15, 16];
    var wheelVertex = [17, 18, 19, 20, 21, 22, 23, 24];
    var wheelRadius = [25, 26, 27, 28, 29, 30, 31, 32];
    var axleAngle = [33, 34, 35, 36, 37, 38, 39, 40];
    var mass = 3.14;

    //Random cars
    var car1 = new Car(cartMagnitude, cartAngle, wheelVertex, wheelRadius, axleAngle, mass);
    var carsArray = [car1];

    var topCars = selectNextGeneration(carsArray, -1);


    assert.deepEqual(selectNextGeneration(carsArray, -1), "error", "error print passed!");
});

QUnit.test("GA3.1", function (assert) {

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
    var car4 = new Car(wheelVertex, wheelRadius, axleAngle, cartMagnitude, cartAngle, 111);
    var carsArray = [car1, car2, car3,car4];

    var cars2 = [car1, car2, car3];
    var topCars = selectNextGeneration(carsArray, 3);


    assert.deepEqual(selectNextGeneration(carsArray, 3), cars2, "Top 3 Offsprings selection passed!");
});

QUnit.test("GA3.1", function (assert) {

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
    var car4 = new Car(wheelVertex, wheelRadius, axleAngle, cartMagnitude, cartAngle, 111);
    var carsArray = [car1, car2, car3, car4];

    var cars2 = [car3, car4, car1];


    assert.deepEqual(selectNextGeneration(carsArray, 3), cars2, "Top 3 Offsprings selection passed!");
});

QUnit.test("GA3.2", function (assert) {

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
    var car4 = new Car(wheelVertex, wheelRadius, axleAngle, cartMagnitude, cartAngle, 111);
    var carsArray = [car1, car2, car3, car4];



    assert.deepEqual(selectNextGeneration(carsArray, 5), "error", "Top 3 Offsprings selection passed!");
});

QUnit.test("GA3.3", function (assert) {

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
    var car4 = new Car(wheelVertex, wheelRadius, axleAngle, cartMagnitude, cartAngle, 111);
    var carsArray = [car1, car2, car3, car4];



    assert.deepEqual(selectNextGeneration(carsArray, 0), "error", "Top 3 Offsprings selection passed!");
});

QUnit.test("GA3.4", function (assert) {

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
    var car4 = new Car(wheelVertex, wheelRadius, axleAngle, cartMagnitude, cartAngle, 111);
    var carsArray = [car1, car2, car3, car4];



    assert.deepEqual(selectNextGeneration(carsArray, -1), "error", "Top 3 Offsprings selection passed!");
});







