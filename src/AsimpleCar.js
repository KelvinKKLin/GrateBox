/**
 * b2Vec2
 *
 * This imports the Box2D Vector and any associated methods.
 */
var b2Vec2 = Box2D.Common.Math.b2Vec2
       , b2BodyDef = Box2D.Dynamics.b2BodyDef
       , b2Body = Box2D.Dynamics.b2Body
       , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
       , b2Fixture = Box2D.Dynamics.b2Fixture
       , b2World = Box2D.Dynamics.b2World
       , b2MassData = Box2D.Collision.Shapes.b2MassData
       , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
       , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
       , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
       , b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
       , b2Joint = Box2D.Dynamics.b2Joint
    ;


/**
 * points
 *
 * This variable keeps track of points on a car
 */
var points = [];

/**
 * cameraX
 *
 * This variable keeps track of the horizontal velocity of
 * the camera.
 */
var cameraX = 0;


/*!
    THE VIEW
 */

/**
 * This method initializes the Box2D environment, and any objects within the Box2D world.
 *
 * @return The created Box2D world
 */
function init() {
    world = new b2World(
          new b2Vec2(0, 9.8)    //gravity
       , true                 //allow sleep
    );
    var worldScale = 60;

    drawCar(world, worldScale, 2, -1, 4, 0, -1, -2, -2, 0.5, -0.25, 0.25, 0.75, 0.5,3, 0.5, 3.5, 0.5, 4, 1);
    createRoad(world, 0, 15, 150);

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(40.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    window.setInterval(update, 1000 / 60);
    return world;
};


/**
 * This method creates a polygon for the car given 4 points on the Cartesian plane.
 * It assumes that one of the points of the polygon will be at the origin.
 *
 * @param num       {Integer}      The index of the polygon of the car
 * @param vertex1X  {Integer}      The x-coordinate of the first vertex
 * @param vertex1Y  {Integer}      The y-coordinate of the first vertex
 * @param vertex2X  {Integer}      The x-coordinate of the second vertex
 * @param vertex2Y  {Integer}      The y-coordinate of the second vertex
 * @return          {b2FixtureDef} The polygon created
 */
function makePolygon(num, vertex1X, vertex1Y, vertex2X, vertex2Y){
    var polygon = new b2PolygonShape;
    var polygonFix = new b2FixtureDef;
    polygonFix.shape = polygon;
    points[num] = [{ x: 0, y: 0 }, { x: vertex2X, y: vertex2Y }, { x: vertex1X, y: vertex1Y }];

    for (var i = 0; i < 3; i++) {
        var vec = new b2Vec2();
        vec.Set(points[num][i].x, points[num][i].y);
        points[num][i] = vec;
    }

    polygonFix.shape.SetAsArray(points[num], points[num].length);
    polygonFix.density = 5;
    polygonFix.friction = 3;
    polygonFix.filter.groupInedx = -1;
    polygonFix.restitution = 0.3;
    return polygonFix;
};

/**
 * This method creates the shape of a wheel for the car given its radius.
 *
 * @param world       {b2World}      The Box2D world where the wheel will be placed in
 * @param worldScale  {Integer}      The scaling factor
 * @param radius      {Float}        The radius of the wheel
 * @return            {b2FixtureDef} The shape of the wheel created
 */
function makeWheelShape(world, worldScale, radius){
    var wheelshape = new b2CircleShape(radius / worldScale);
    var wheelFixture = new b2FixtureDef;
    wheelFixture.density = 1;
    wheelFixture.friction = 3;
    wheelFixture.filter.groupIndex = -1;
    wheelFixture.restitution = 0.1;
    wheelFixture.shape = wheelshape;
    return wheelFixture;
};

/**
 * This method creates joints used to connect the wheels to the car chassis.
 *
 * @param world      {b2World}            The Box2D world where the joint will be placed in
 * @param bodyA      {b2BodyDef}          The first object to connect the joint to
 * @param bodyB      {b2BodyDef}          The second object to connect the joint to
 * @param wheelPosX  {Integer}            The x-coordinate of the wheel
 * @param wheelPosY  {Integer}            The y-coordinate of the wheel
 * @return           {b2RevoluteJointDef} The joint connecting bodyA to bodyB
 */
function makeCarJoints(world, bodyA, bodyB, wheelPosX, wheelPosY){
    var joint_def = new b2RevoluteJointDef();
    joint_def.bodyA = bodyA;
    joint_def.bodyB = bodyB;
    joint_def.localAnchorA = new b2Vec2(0, 0);
    joint_def.localAnchorB = new b2Vec2(wheelPosX, wheelPosY);
    joint_def.maxMotorTorque = 300;
    joint_def.motorSpeed = -500;
    joint_def.enableMotor = true;
    return joint_def;
};

/**
 * This method connects the wheel to the car chassis.
 *
 * @param world            {b2World}      The Box2D world where the wheel will be placed in
 * @param car              {b2BodyDef}    The car to connect the wheels to
 * @param wheelbodyDef     {b2BodyDef}    The body (physics) definition of the wheel
 * @param wheelFixture     {b2FixtureDef} The shape definition of the wheel
 * @return                 {Body}         The wheel
 */
function makeWheelFixture(world, car, wheelbodyDef, wheelFixture){
    var wheel = world.CreateBody(wheelbodyDef);
    wheel.CreateFixture(wheelFixture);
    wheelbodyDef.position.Set(car.GetWorldCenter().x, car.GetWorldCenter().y);
    return wheel;
}

/**
 * This method creates a car to the screen.
 *
 * @param world             {b2World}   The Box2D world where the car will be placed in
 * @param worldScale        {Integer}   The scaling factor for the Box2D world
 * @param vertex1X          {Integer}   The x-coordinate of the first vertex
 * @param vertex1Y          {Integer}   The y-coordinate of the first vertex
 * @param vertex2X          {Integer}   The x-coordinate of the second vertex
 * @param vertex2Y          {Integer}   The y-coordinate of the second vertex
 * @param vertex3X          {Integer}   The x-coordinate of the third vertex
 * @param vertex3Y          {Integer}   The y-coordinate of the third vertex
 * @param vertex4X          {Integer}   The x-coordinate of the fourth vertex
 * @param vertex4Y          {Integer}   The y-coordinate of the fourth vertex
 * @param vertex5X          {Integer}   The x-coordinate of the fifth vertex
 * @param vertex5Y          {Integer}   The y-coordinate of the fifth vertex
 * @param vertex6X          {Integer}   The x-coordinate of the sixth vertex
 * @param vertex6Y          {Integer}   The y-coordinate of the sixth vertex
 * @param vertex7X          {Integer}   The x-coordinate of the seventh vertex
 * @param vertex7Y          {Integer}   The y-coordinate of the seventh vertex
 * @param vertex8X          {Integer}   The x-coordinate of the eighth vertex
 * @param vertex8Y          {Integer}   The y-coordinate of the eighth vertex
 * @param frontwheelPos     {Integer}   The vertex that the front wheel is attached to
 * @param rearWheelPos      {Integer}   The vertex that the back wheel is attached to
 * @return                  {b2BodyDef} The completed car
 */
function drawCar(world, worldScale, vertex1X, vertex1Y, vertex2X, vertex2Y, vertex3X, vertex3Y, vertex4X, vertex4Y, vertex5X, vertex5Y, vertex6X, vertex6Y, vertex7X, vertex7Y, vertex8X, vertex8Y,frontwheelPos,rearwheelPos) {
    var polygonFix1 = makePolygon(1, vertex1X, vertex1Y, vertex2X, vertex2Y);
    var polygonFix2 = makePolygon(2, vertex2X, vertex2Y, vertex3X, vertex3Y);
    var polygonFix3 = makePolygon(3, vertex3X, vertex3Y, vertex4X, vertex4Y);
    var polygonFix4 = makePolygon(4, vertex4X, vertex4Y, vertex5X, vertex5Y);
    var polygonFix5 = makePolygon(5, vertex5X, vertex5Y, vertex6X, vertex6Y);
    var polygonFix6 = makePolygon(6, vertex6X, vertex6Y, vertex7X, vertex7Y);
    var polygonFix7 = makePolygon(7, vertex7X, vertex7Y, vertex8X, vertex8Y);
    var polygonFix8 = makePolygon(8, vertex8X, vertex8Y, vertex1X, vertex1Y);


    var carBodyDef = new b2BodyDef;
    carBodyDef.type = b2Body.b2_dynamicBody;
    carBodyDef.position.Set(320 / worldScale, 100 / worldScale);

    var car = world.CreateBody(carBodyDef);
    car.CreateFixture(polygonFix1);
    car.CreateFixture(polygonFix2);
    car.CreateFixture(polygonFix3);
    car.CreateFixture(polygonFix4);
    car.CreateFixture(polygonFix5);
    car.CreateFixture(polygonFix6);
    car.CreateFixture(polygonFix7);
    car.CreateFixture(polygonFix8);

    var frontwheelX;
    var frontwheelY;
    var rearwheelX;
    var rearwheelY;

    frontwheelX = points[frontwheelPos][2].x;
    frontwheelY = points[frontwheelPos][2].y;
    rearwheelX = points[rearwheelPos][2].x;
    rearwheelY = points[rearwheelPos][2].y;

    var wheelFixture1 = makeWheelShape(world, worldScale, 200);
    var wheelFixture2 = makeWheelShape(world, worldScale, 200);

    var wheelbodyDef = new b2BodyDef;
    wheelbodyDef.type = b2Body.b2_dynamicBody;
    wheelbodyDef.position.Set(car.GetWorldCenter().x, car.GetWorldCenter().y);

    var rearwheel = makeWheelFixture(world, car, wheelbodyDef, wheelFixture1);
    var frontwheel = makeWheelFixture(world, car, wheelbodyDef, wheelFixture2);

    var joint_def_rear = makeCarJoints(world, rearwheel, car, rearwheelX, rearwheelY);
    world.CreateJoint(joint_def_rear);

    var joint_def_front = makeCarJoints(world, frontwheel, car, frontwheelX, frontwheelY);
    world.CreateJoint(joint_def_front);

    return car;
};

/**
 * This method creates a box with a specified width and height rotated at a specified angle on the screen.
 *
 * @param world    {b2World} The Box2D world that the box is created in
 * @param x        {Integer} The x-coordinate of the upper left corner
 * @param y        {Integer} The y-coordinate of the upper left corner
 * @param width    {Integer} The width of the box
 * @param height   {Integer} The height of the box
 * @param angle    {Float}   The rotation of the box, counterclockwise from the horizontal, in radians
 * @return         {Body}    The box
 */
function createBox(world, x, y, width, height, angle) {
    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef();

    fix_def.density = 1.0;
    fix_def.friction = 0.5;
    fix_def.restitution = 0;

    fix_def.shape = new b2PolygonShape();

    fix_def.shape.SetAsBox(width, height);

    body_def.position.Set(x, y);

    var body = world.CreateBody(body_def);
    var fixture = body.CreateFixture(fix_def);
    body.SetPositionAndAngle(body.GetPosition(), angle);
    return body;
};

/**
 * This method creates a road on the screen
 *
 * @param world             {b2World} The Box2D world that the box is created in
 * @param startX            {Integer} The x-coordinate of the upper left corner of the first tile
 * @param startY            {Integer} The y-coordinate of the upper left corner of the first tile
 * @param maxNumberOfTiles  {Integer} The number of tiles the road is made out of
 */
function createRoad(world, startX, startY, maxNumberOfTiles) {
    var lastX = startX;
    var lastY = startY;
    var lastHeight = 0.1
    var angle = 0;//0.78;
    for (var i = 0; i < maxNumberOfTiles; i++) {
        lastTile = createBox(world, lastX, lastY, 0.78, lastHeight, angle);
        angle = angle * -1;
        lastX = lastX + 1;
    }
};

/**
 * This method updates the screen.
 */
function update() {
    world.Step(
          1 / 60   //frame-rate
       , 10       //velocity iterations
       , 10       //position iterations
    );
    cameraX = cameraX + 3;
    draw_world(world, ctx);
    //world.DrawDebugData();
    world.ClearForces();
};

/**
 * This method draws the world on the screen, before it is updated.
 *
 * @param world    {b2World} The world to draw on
 * @param context  {Canvas}  The canvas to draw the world on
 */
function draw_world(world, context){
    //first clear the canvas
    ctx.clearRect( 0 , 0 , canvas_width, canvas_height );

    ctx.save();
    ctx.translate(-cameraX , canvas_height-650);

    world.DrawDebugData();
    ctx.restore();

};

/*!
 * THE GENETIC ALGORITHM
 */

/**
* This method creates a new generation of cars.
* @param {Integer} n The number of cars in the generation
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
    var cars = cars;
    var n = n;
    var topCars = [];
    var heap = new Heap(function(ab){
        return b.getFitness() - a.getFitness();
    });

    for(var i = 0; i < cars.length; i++){
        heap.push(cars[i]);
    }

    for(var i = 0; i < n; i++){
        topCars.push(heap.pop());
    }

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
 * THE CAR
 */
 //var Car = function(){
//
 //};

//Car.prototype.setAllStats(vertexXArray, vertexYArray, wheelsArray) = function(){
//    this.vertexXArray = vertexXArray;
//    this.vertexYArray = vertexYArray;
//    this.wheelsArray  = wheelsArray;
//};


/*!
 * MISC
 */

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
* @param {Float} A floating point number between min and max.
*/
function getRandomArbitrary(min, max){
    //The following code was obtained from
    ////https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.random() * (max - min) + min;
};

/**
 * function()
 *
 * This method is the entry point to the program.
 */
$(function()
{
    var canvas = $('#canvas');
    ctx = canvas.get(0).getContext('2d');

    //first create the world
    init();

    //get internal dimensions of the canvas
    canvas_width = parseInt(canvas.attr('width'));
    canvas_height = parseInt(canvas.attr('height'));
});