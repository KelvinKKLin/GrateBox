// JavaScript source code
Qunit.test("GA-1.1",function(assert){
    assert.equal(mutateOffsprings(carsArray, 1, 0), cars2, "input equals output");
});

Qunit.test("GA-1.2",function(assert){
    assert.equal(mutateOffsprings(carsArray, 1, 1), cars2, "input equals output");
});

Qunit.test("GA-1.3", function (assert) {
    assert.equal(mutateOffsprings(carsArray, 1, -1), cars2, "error");   //all parent pool has been set to 1
});

Qunit.test("GA-2.1", function (assert) {
    assert.equal(selectNextGeneration(carsArray, 3), cars2, "input equals output");  //3 is the parent size
});

Qunit.test("GA-2.2",function(assert){
    assert.equal(selectNextGeneration(carsArray, 2), cars2, "top2 cars used");
    assert.equal(crossOverOffsprings(carsArray, cars2), cars2, "top2 cars of the input equals top2 cars of output");
});

Qunit.test("GA-2.3", function (assert) {
    assert.equal(selectNextGeneration(carsArray, 1), cars2, "top1 cars used");
    assert.equal(crossOverOffsprings(carsArray, cars2), "error", "error has been printed");
});

Qunit.test("GA-2.4", function (assert) {
    assert.equal(selectNextGeneration(carsArray, 0), cars2, "top0 cars used");
    assert.equal(crossOverOffsprings(carsArray, cars2), "error", "error has been printed");
});

Qunit.test("GA-2.5", function (assert) {
    assert.equal(selectNextGeneration(carsArray, -1), cars2, "top0 cars used");
    assert.equal(crossOverOffsprings(carsArray, cars2), "error", "error has been printed");
});

Qunit.test("GA-3.1", function (assert) {
    assert.equal(selectNextGeneration(carsArray, 3), top3cars, "top 3 fitness cars used");
});

Qunit.test("GA-3.2", function (assert) {
    assert.equal(selectNextGeneration(carsArray, carsArray.length+1), "error", "error printed");
});

Qunit.test("GA-3.3", function (assert) {
    assert.equal(selectNextGeneration(carsArray, 0), "error", "error printed");
});

Qunit.test("GA-3.3", function (assert) {
    assert.equal(selectNextGeneration(carsArray, -1), "error", "error printed");
});

Qunit.test("CM-1.3", function (assert) {
    assert.equal(car.getVertexXArray()), cararray.length, "car vertex magnitudes fit");
});

Qunit.test("CM-1.4", function (assert) {
    assert.equal(car.getVertexXArray(angle), "error", "error printed");
});

Qunit.test("CM-1.5", function (assert) {
    assert.equal(drawCar(world, WORLD_SCALE, xvert[0], yvert[0], xvert[1], yvert[1], xvert[2], yvert[2], xvert[3], yvert[3], xvert[4], yvert[4], xvert[5], yvert[5], xvert[6], yvert[6], xvert[7], yvert[7], wheelpos[0], wheelpos[1],wheelpos[2], wheelrad[0], wheelrad[1]), "error", "error printed");
});

Qunit.test("CM-1.6", function (assert) {
    assert.equal(drawCar(world, WORLD_SCALE, xvert[0], yvert[0], xvert[1], yvert[1], xvert[2], yvert[2], xvert[3], yvert[3], xvert[4], yvert[4], xvert[5], yvert[5], xvert[6], yvert[6], xvert[7], yvert[7], wheelpos[0], wheelpos[1], wheelrad[0], wheelrad[1],wheelrad[2]), "error", "error printed");
});

Qunit.test("CM-1.7", function (assert) {
    assert.equal(drawCar(world, WORLD_SCALE, xvert[0], yvert[0],vertexangle, xvert[1], yvert[1], xvert[2], yvert[2], xvert[3], yvert[3], xvert[4], yvert[4], xvert[5], yvert[5], xvert[6], yvert[6], xvert[7], yvert[7], wheelpos[0], wheelpos[1], wheelrad[0], wheelrad[1],wheelrad[2]), "error", "error printed");
});

Qunit.test("CM-1.8", function (assert) {
    assert.equal(drawCar(world, WORLD_SCALE, xvert[0], yvert[0],vertexmag, xvert[1], yvert[1], xvert[2], yvert[2], xvert[3], yvert[3], xvert[4], yvert[4], xvert[5], yvert[5], xvert[6], yvert[6], xvert[7], yvert[7], wheelpos[0], wheelpos[1], wheelrad[0], wheelrad[1],wheelrad[2]), "error", "error printed");
});



