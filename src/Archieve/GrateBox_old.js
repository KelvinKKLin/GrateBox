/*!
Graphics
*/

function init(){
    var b2Vec2         = Box2D.Common.Math.b2Vec2;
    var b2BodyDef      = Box2D.Dynamics.b2BodyDef;
    var b2Body         = Box2D.Dynamics.b2Body;
    var b2FixtureDef   = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture      = Box2D.Dynamics.b2Fixture;
    var b2World        = Box2D.Dynamics.b2World;
    var b2MassData     = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape  = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw    = Box2D.Dynamics.b2DebugDraw;

    var world          = new b2World(new b2Vec2(0, 9.,8)), true);

    var fixDef         = new b2FixtureDef;
    fixDef.density     = 1.0;
    fixDef.friction    = 0.5;
    fixDef.resitution  = 0.2;

    bodyDef.type       = b2Body.b2_dynamicBody;
    fixDef.shape       = new b2CircleShape(2);
    bodyDef.position.x = 5;
    bodyDef.position.y = 10;
    world.CreateBody(bodyDef).createFixture(fixDef);

    var debugDraw      = new b2DebugDraw();
    documentebugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(40.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);}

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