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
 * car
 *
 * This variable holds the car model
 */
var car = 0;

/**
 * camerax
 *
 * This variable keeps track of the horizontal velocity of
 * the camera.
 */
var camerax = 0;

/**
 * cameray
 *
 * This variable keeps track of the vertical velocity of
 * the camera.
 */
var cameray = 0;

/**
 * diffx
 *
 * This variable keeps track of the change in the horizontal displacement of the camera.
 */
var diffx;

/**
 * diffy
 *
 * This variable keeps track of the change in the vertical displacement of the camera.
 */
var diffy;

/**
 * proc1
 *
 * This variable keeps track of the game loop thread.
 */
var proc1 = setInterval(update, 1000 / 60);

/**
 * proc2
 *
 * This variable keeps track of updateCar thread.
 */
var proc2 = setInterval(nextCar, 1000/60);

/*!
 * GENETIC ALGORITHM GLOBAL VARIABLES
 */

 //Constants

 /**
 * POPULATION_SIZE
 *
 * This constant indicates the size of the initial population of cars.
 */
 var POPULATION_SIZE = 3;

 /**
 * PARENT_POOL
 *
 * This constant indicates the size of the pool from which parents creat offspring.
 */
 var PARENT_POOL = 2;

 /**
 * MUTATION_RATE
 *
 * This constant indicates the rate at which mutations occur.
 */
 var MUTATION_RATE = 0.02;

 //Variables

 /**
 * carsArray
 *
 * This variable array contains the cars in the population cars.
 */
 var carsArray = [0,0,0];

 /**
 * topCars
 *
 * This variable array contains the highest performing cars for the purpose of creating the next generation.
 */
 var topCars = [];

 /**
 * currentMember
 *
 * This variable integer indicates the current member of the group of cars.
 */
 var currentMember = 0;

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
    var WORLD_SCALE = 60;

    if(currentMember < 3){
        car = new Car();
        car.generateNewCar();
    } else{
        car = new Car();
        car.setChromosome(carsArray[currentMember%3].getChromosome());
    }

    console.log("CAR #" + currentMember + " Car: " + carsArray);

    var xvert = car.getVertexXArray();
    var yvert = car.getVertexYArray();
    var wheelpos = car.getWheelPosArray();
    var wheelrad = car.getWheelRadiusArray();
    var done = false;

    do{
        try{
            car.setCarDef(drawCar(world, WORLD_SCALE, xvert[0], yvert[0], xvert[1], yvert[1], xvert[2], yvert[2], xvert[3], yvert[3], xvert[4], yvert[4], xvert[5], yvert[5], xvert[6], yvert[6], xvert[7], yvert[7], wheelpos[0], wheelpos[1], wheelrad[0], wheelrad[1]));
            done = true;
        } catch(err){
            car.generateNewCar();
        }
    } while(!done);

    connecttile();

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(40.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    return world;
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

    world.ClearForces();
    drawworld(world, ctx);
    if(Math.abs(diffx)<0.01){
        car.removeHealth();
    } else{
        car.increaseFitness();
    }
};

/**
 * This method selects the next car to be simulated.
 */
function nextCar(){
    if(car.getHealth() <= 0){
        carsArray[currentMember%3] = car;

        if(currentMember % 3 == 0 && currentMember > 0){
            var topCars = selectNextGeneration(carsArray, PARENT_POOL);
            carsArray = crossOverOffsprings(carsArray, topCars);
            carsArray = mutateOffsprings(carsArray, PARENT_POOL, 1);
        }
        currentMember = currentMember + 1;


        resetWorld(world);
        resetCamera(world, ctx);
        clearInterval(proc1);
        init();
        proc1 = setInterval(update, 1000/60);
    }
}

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
    var WORLD_SCALE = 60;
    if (vertex1X > 0) {

        var a = vertex1X;
        var b = -vertex1Y;
        var c = vertex2X;
        var d = -vertex2Y;
        var m = b / a;

        var y = m * c;

        if (y < d) {
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
        } else if (y = d) {
            vertex2X = vertex2X + 1;
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

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

        }else {
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

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
        }
    }

    if (vertex1X < 0) {
        var a = vertex1X;
        var b = -vertex1Y;
        var c = vertex2X;
        var d = -vertex2Y;
        var m = b / a;

        var y = m * c;

        if (y > d) {
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
        } else if (y = d) {
            vertex2X = vertex2X - 1;
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

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
        }else {
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

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
        }
    }
};

/**
 * This method creates the shape of a wheel for the car given its radius.
 *
 * @param world       {b2World}      The Box2D world where the wheel will be placed in
 * @param WORLD_SCALE  {Integer}      The scaling factor
 * @param radius      {Float}        The radius of the wheel
 * @return            {b2FixtureDef} The shape of the wheel created
 */
function makeWheelShape(world, WORLD_SCALE, radius) {
    var wheelshape = new b2CircleShape(radius / WORLD_SCALE);
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
    var jointdef = new b2RevoluteJointDef();
    jointdef.bodyA = bodyA;
    jointdef.bodyB = bodyB;
    jointdef.localAnchorA = new b2Vec2(0, 0);
    jointdef.localAnchorB = new b2Vec2(wheelPosX, wheelPosY);
    jointdef.maxMotorTorque = 170;
    jointdef.motorSpeed = -300;
    jointdef.enableMotor = true;
    return jointdef;
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
 * @param WORLD_SCALE        {Integer}   The scaling factor for the Box2D world
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
function drawCar(world, WORLD_SCALE, vertex1X, vertex1Y, vertex2X, vertex2Y, vertex3X, vertex3Y, vertex4X, vertex4Y, vertex5X, vertex5Y, vertex6X, vertex6Y, vertex7X, vertex7Y, vertex8X, vertex8Y, frontwheelPos, rearwheelPos, frontWheelRadius, rearWheelRadius) {
    var polygonFix1 = 0;
    var polygonFix2 = 0;
    var polygonFix3 = 0;
    var polygonFix4 = 0;
    var polygonFix5 = 0;
    var polygonFix6 = 0;
    var polygonFix7 = 0;
    var polygonFix8 = 0;

    try{
        var polygonFix1 = makePolygon(1, vertex1X, vertex1Y, vertex2X, vertex2Y);
        var polygonFix2 = makePolygon(2, vertex2X, vertex2Y, vertex3X, vertex3Y);
        var polygonFix3 = makePolygon(3, vertex3X, vertex3Y, vertex4X, vertex4Y);
        var polygonFix4 = makePolygon(4, vertex4X, vertex4Y, vertex5X, vertex5Y);
        var polygonFix5 = makePolygon(5, vertex5X, vertex5Y, vertex6X, vertex6Y);
        var polygonFix6 = makePolygon(6, vertex6X, vertex6Y, vertex7X, vertex7Y);
        var polygonFix7 = makePolygon(7, vertex7X, vertex7Y, vertex8X, vertex8Y);
        var polygonFix8 = makePolygon(8, vertex8X, vertex8Y, vertex1X, vertex1Y);
        done = true;
    } catch(err){
        throw "ERROR";
    }

    var carBodyDef = new b2BodyDef;
    carBodyDef.type = b2Body.b2_dynamicBody;
    carBodyDef.position.Set(320 / WORLD_SCALE, 100 / WORLD_SCALE);

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

    var wheelFixture1 = makeWheelShape(world, WORLD_SCALE, frontWheelRadius);
    var wheelFixture2 = makeWheelShape(world, WORLD_SCALE, rearWheelRadius);

    var wheelbodyDef = new b2BodyDef;
    wheelbodyDef.type = b2Body.b2_dynamicBody;
    wheelbodyDef.position.Set(car.GetWorldCenter().x, car.GetWorldCenter().y);

    var rearwheel = makeWheelFixture(world, car, wheelbodyDef, wheelFixture1);
    var frontwheel = makeWheelFixture(world, car, wheelbodyDef, wheelFixture2);

    var jointdefrear = makeCarJoints(world, rearwheel, car, rearwheelX, rearwheelY);
    world.CreateJoint(jointdefrear);

    var jointdeffront = makeCarJoints(world, frontwheel, car, frontwheelX, frontwheelY);
    world.CreateJoint(jointdeffront);

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
function createtile(point1X, point1Y, point2X, point2Y, point3X, point3Y, positionX, positionY) {
    var WORLD_SCALE = 60;
    var polygon = new b2PolygonShape;
    var polygonFix = new b2FixtureDef;
    polygonFix.shape = polygon;

    var point = [];

    point = [{ x: 0, y: 0 }, { x: point1X, y: point1Y }, { x: point2X, y: point2Y }, { x: point3X, y: point3Y }];

    for (var i = 0; i < 4; i++) {
        var vec = new b2Vec2();
        vec.Set(point[i].x, point[i].y);
        points[i] = vec;
    }

    polygonFix.shape.SetAsArray(point, point.length);
    polygonFix.density = 5;
    polygonFix.friction = 3;
    polygonFix.filter.groupInedx = -1;
    polygonFix.restitution = 0.3;
    var tailBodyDef = new b2BodyDef;
    tailBodyDef.type = b2Body.b2_staticBody;
    tailBodyDef.position.Set(positionX, positionY);

    var tail = world.CreateBody(tailBodyDef);
    tail.CreateFixture(polygonFix);
}

/**
 * This method connects the tiles to each other in a sequential fashion starting from the first tile at the origin.
 */
function connecttile() {
    var randomnum;
    var point1x;
    var point1y;
    var point2x;
    var point2y;
    var point3x;
    var point3y;
    var position = [];
    position[0] = [-10, 10];
    for (i = 0; i < 100; i++) {
        randomnum = Math.random();
        if (Math.random() > 0.5) {
            randomnum = -randomnum;
        }
        point1x = 3 * Math.cos(Math.PI / 9 * randomnum);
        point1y = -3 * Math.sin(Math.PI /9 * randomnum);
        point2x = 3 * Math.cos(Math.PI / 9 * randomnum) + 0.3 * Math.sin(Math.PI / 9 * randomnum);
        point2y = -(3 * Math.sin(Math.PI / 9 * randomnum) - 0.3 * Math.cos(Math.PI / 9 * randomnum));
        point3x = 0.3 * Math.sin(Math.PI / 9 * randomnum);
        point3y = 0.3 * Math.cos(Math.PI / 9 * randomnum);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    }
}

/**
 * This method resets the world for the next simulation.
 *
 * @param world    {b2World} The world to be reset.
 */
function resetWorld(world){
    for (var b = world.GetBodyList(); b != null; b = b.GetNext()){
        world.DestroyBody(b);
    }
};

/**
 * This method resets the camera for the next simulation.
 *
 * @param world    {b2World} The world on which the camera is reset.
 * @param context  {Canvas}  The canvas to draw the world on
 */
function resetCamera(world, context){
    ctx.clearRect( 0 , 0 , canvas_width, canvas_height );
    ctx.save();
    cameraPos();
    ctx.translate(0,canvas_height - 650);
    world.DrawDebugData();
    ctx.restore();
};

/**
 * This method draws the world on the screen, before it is updated.
 *
 * @param world    {b2World} The world to draw on
 * @param context  {Canvas}  The canvas to draw the world on
 */
function drawworld(world, context){
    ctx.clearRect( 0 , 0 , canvas_width, canvas_height );
    ctx.save();
    cameraPos();
    ctx.translate(200 - (camerax * 40), -300+ (cameray * 20));
    world.DrawDebugData();
    ctx.restore();
};


/**
 * This method sets the camera position to the position of the car.
 */
function cameraPos(){
    cameraPositionX = car.getCarDef().GetWorldCenter().x;
    cameraPositionY = car.getCarDef().GetWorldCenter().y;
    diffx = camerax - cameraPositionX;
    diffy = cameray - cameraPositionY;
    camerax -= 0.0125 * diffx;
    cameray -= 0.0125 * diffy;
};

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

/**
* This method crosses over the chromosomes of the offspring
* cars.
* @param {Cars[]} cars The array of cars to crossover
* @param {Integer} topCars The number of cars in the surviving parent generation
* @return {Cars[]} An array of the crossed-over cars
*/
function crossOverOffsprings(cars, topCars){

    var cars2 = [];

    if(topCars.length < 2){
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

        var geneIndex = getRandomArbitraryInteger(0, 20);
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
                var min = -3;
                var max = 3;
                var value = 0;
                do{
                    value = getRandomArbitraryInteger(min, max);
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
                var min = -3;
                var max = 3;
                var value = 0;
                do{
                    value = getRandomArbitraryInteger(min, max);
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
 * THE CAR
 */

/**
* This method establishes the initial values shared by all cares. All cars start with 10 health and have a fitness and carDef of 0.
*/
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
    generateNewCar : function(){
        for(var i = 0; i < 8; i++){

            var xValue = 0;
            var yValue = 0;

            do{
                xValue = getRandomArbitraryInteger(-3, 3);
            } while(xValue == 0);

            do{
                yValue = getRandomArbitraryInteger(-3, 3);
            } while(yValue == 0);

            this.vertexXArray[i] = xValue;
            this.vertexYArray[i] = yValue;
        }

        for(var i = 0; i < 2; i++){
            this.wheelPosArray[i] = getRandomArbitraryInteger(1, 8);
            this.wheelRadiusArray[i] = getRandomArbitraryInteger(20, 100);
        }
    },

	/**
	* Method that increases the fitness value of a car by 1.
	*/
    increaseFitness : function(){
        this.fitness = this.fitness + 1;
    },

	/**
	* Method that reduces the health value of a car by 1.
	*/
    removeHealth : function(){
        this.health = this.health - 1;
    },

    /**
	* Method that sets the array of vertices in the horizontal.
	* @param {vertexXArray[]} vertexXArray The array of vertices to be set.
	*/
    setVertexXArray : function(vertexXArray){
        this.vertexXArray = vertexXArray;
    },

    /**
	* Method that sets a specific vertex in an array of the horizontal vertices to a specific value.
	* @param {vertexXArray[]} vertexXArray The array of vertices where the vertex is present.
	* @param {Integer} i The identify of the specific vertex in the array that is to be altered.
	*/
    setVertexX : function(i, vertexX){
        this.vertexXArray[i] = vertexX;
    },

    /**
	* Method that sets the array of vertices in the vertical.
	* @param {vertexXArray[]} vertexYArray The array of vertices to be set.
	*/
    setVertexYArray : function(vertexYArray){
        this.vertexYArray = vertexYArray;
    },

    /**
	* Method that sets a specific vertex in an array of the vertical vertices to a specific value.
	* @param {vertexXArray[]} vertexYArray The array of vertices where the vertex is present.
	* @param {Integer} i The identify of the specific vertex in the array that is to be altered.
	*/
    setVertexY : function(i, vertexY){
        this.vertexYArray = vertexY;
    },

    /**
    * Method that sets the position of a specific wheel to a specific location.
    * @param {wheelPosArray[]} wheelPos The array that conatins the locations of the wheels.
    * @param {Integer} i The identify of the specific wheel position to be set in the array.
    */
    setWheelPos : function(i, wheelPos){
        this.wheelPosArray[i] = wheelPos;
    },

    /**
    * Method that sets the radius of a specific wheel.
    * @param {wheelRadius[]} wheelRadius The array that conatins the radiuses of the wheels.
    * @param {Integer} i The identify of the specific wheel radius to be set in the array.
    */
    setWheelRadius : function(i, wheelRadius){
        this.wheelRadius[i] = wheelRadius;
    },

    /**
    * Method that sets array of wheel radiuses to a specific array.
    * @param {wheelRadius[]} wheelRadiusArray The array that conatins the locations of the wheels.
    */
    setWheelRadiusArray : function(wheelRadiusArray){
        this.wheelRadius = wheelRadiusArray;
    },

    /**
    * Method that sets the definition of a car.
    * @param {Float} carDef The set value of the ar's definition.
    */
    setCarDef : function(carDef){
        this.carDef = carDef;
    },

    /**
    * Method that sets the chromosome of a car
    * @param {Chromosome[]} chromosome The chromosome to be altered.
    */
    setChromosome : function(chromosome){
        this.vertexXArray = chromosome.slice(0, 8);
        this.vertexYArray = chromosome.slice(8, 16);
        this.wheelPosArray = chromosome.slice(16,18);
        this.wheelRadiusArray = chromosome.slice(18, 20);
    },

    /**
    * Method that retrieves the array of horizontal vertices of a car.
    */
    getVertexXArray : function(){
        return this.vertexXArray;
    },

    /**
    * Method that retrieves the array of vertical vertices of a car.
    */
    getVertexYArray : function(){
        return this.vertexYArray;
    },

    /**
    * Method that retrieves the array of wheel positions of a car.
    */
    getWheelPosArray : function(){
        return this.wheelPosArray;
    },

    /**
    * Method that retrieves the array of wheel radiuses of a car.
    */
    getWheelRadiusArray : function(){
        return this.wheelRadiusArray;
    },

    /**
    * Method that retrieves the specific chromosome of a car.
    */
    getChromosome : function(){
        return this.vertexXArray.concat(this.vertexYArray).concat(this.wheelPosArray).concat(this.wheelRadiusArray);
    },

    /**
    * Method that retrieves the health of a car.
    */
    getHealth : function(){
        return this.health;
    },

    /**
    * Method that retrieves the definition of a car.
    */
    getCarDef : function(){
        return this.carDef;
    },

    /**
    * Method that retrieves the fitness of a car.
    */
    getFitness : function(){
        return this.fitness;
    }
};

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
* @return {Float} A floating point number between min and max.
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