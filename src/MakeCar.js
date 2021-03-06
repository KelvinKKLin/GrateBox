//Symbolic Parameters

/**
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var WORLD_SCALE = 60;

/**
* This variable keeps track of the number of verticies needed to define a polygon.
*/
var NUMBER_OF_VERTICES = 3;

/**
* This variable keeps track of the density of a polygon.
*/
var POLYGON_DENSITY = 5;

/**
* This variable keeps track of the friction of a polygon.
*/
var POLYGON_FRICTION = 3;

/**
* This variable keeps track of the filter group applied to the polygon.
*/
var POLYGON_FILTER_GROUP_INDEX = -1;

/**
* This variable keeps track of the restitution of the polygon.
*/
var POLYGON_RESTITUTION = 0.3;

/**
* This variable keeps track of the density of a wheel.
*/
var WHEEL_DENSITY = 1;

/**
* This variable keeps track of the friction of a wheel.
*/
var WHEEL_FRICTION = 3;

/**
* This variable keeps track of the filter group applied to a wheel.
*/
var WHEEL_FILTER_GROUP_INDEX = -1;

/**
* This variable keeps track of the restitution of a wheel.
*/
var WHEEL_RESTITUTION = 0.1;

/**
* This variable keeps track of the maximum torque that a joint can support.
*/
var JOINT_MAX_TORQUE = 250;

/**
* This variable keeps track of the maximum speed that a joint can support.
*/
var JOINT_SPEED = -50;

/**
* This variable keeps track of the scaling factor in the x-direction.
*/
var X_SCALE = 320;

/**
* This variable keeps track of the scaling factor in the y-direction.
*/
var Y_SCALE = 100;

/**
 * This method creates a polygon given the x and y coordinate of 2 vertices,
 * and it joins them at the origin.
 *
 * @param num       {Integer}   The ID of the polygon
 * @param vertex1X  {Integer}   The x-coordinate of the first vector
 * @param vertex1Y  {Integer}   The y-coordinate of the first vector
 * @param vertex2X  {Integer}   The x-coordinate of the second vector
 * @param vertex2Y  {Integer}   The y-coordinate of the second vector
 */
function makePolygon(num, vertex1X, vertex1Y, vertex2X, vertex2Y) {
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

            for (var i = 0; i < NUMBER_OF_VERTICES; i++) {
                var vec = new b2Vec2();
                vec.Set(points[num][i].x, points[num][i].y);
                points[num][i] = vec;
            }

            polygonFix.shape.SetAsArray(points[num], points[num].length);
            polygonFix.density = POLYGON_DENSITY;
            polygonFix.friction = POLYGON_FRICTION;
            polygonFix.filter.groupIndex = POLYGON_FILTER_GROUP_INDEX;
            polygonFix.restitution = POLYGON_RESTITUTION;
            return polygonFix;
        } else if (y = d) {
            vertex2X = vertex2X + 1;
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

            for (var i = 0; i < NUMBER_OF_VERTICES; i++) {
                var vec = new b2Vec2();
                vec.Set(points[num][i].x, points[num][i].y);
                points[num][i] = vec;
            }

            polygonFix.shape.SetAsArray(points[num], points[num].length);
            polygonFix.density = POLYGON_DENSITY;
            polygonFix.friction = POLYGON_FRICTION;
            polygonFix.filter.groupIndex = POLYGON_FILTER_GROUP_INDEX;
            polygonFix.restitution = POLYGON_RESTITUTION;
            return polygonFix;

        } else {
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

            for (var i = 0; i < NUMBER_OF_VERTICES; i++) {
                var vec = new b2Vec2();
                vec.Set(points[num][i].x, points[num][i].y);
                points[num][i] = vec;
            }

            polygonFix.shape.SetAsArray(points[num], points[num].length);
            polygonFix.density = POLYGON_DENSITY;
            polygonFix.friction = POLYGON_FRICTION;
            polygonFix.filter.groupIndex = POLYGON_FILTER_GROUP_INDEX;
            polygonFix.restitution = POLYGON_RESTITUTION;
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

            for (var i = 0; i < NUMBER_OF_VERTICES; i++) {
                var vec = new b2Vec2();
                vec.Set(points[num][i].x, points[num][i].y);
                points[num][i] = vec;
            }

            polygonFix.shape.SetAsArray(points[num], points[num].length);
            polygonFix.density = POLYGON_DENSITY;
            polygonFix.friction = POLYGON_FRICTION;
            polygonFix.filter.groupIndex = POLYGON_FILTER_GROUP_INDEX;
            polygonFix.restitution = POLYGON_RESTITUTION;
            return polygonFix;
        } else if (y = d) {
            vertex2X = vertex2X - 1;
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

            for (var i = 0; i < NUMBER_OF_VERTICES; i++) {
                var vec = new b2Vec2();
                vec.Set(points[num][i].x, points[num][i].y);
                points[num][i] = vec;
            }

            polygonFix.shape.SetAsArray(points[num], points[num].length);
            polygonFix.density = POLYGON_DENSITY;
            polygonFix.friction = POLYGON_FRICTION;
            polygonFix.filter.groupIndex = POLYGON_FILTER_GROUP_INDEX;
            polygonFix.restitution = POLYGON_RESTITUTION;
            return polygonFix;
        } else {
            var polygon = new b2PolygonShape;
            var polygonFix = new b2FixtureDef;
            polygonFix.shape = polygon;

            points[num] = [{ x: 0, y: 0 }, { x: vertex1X, y: vertex1Y }, { x: vertex2X, y: vertex2Y }];

            for (var i = 0; i < NUMBER_OF_VERTICES; i++) {
                var vec = new b2Vec2();
                vec.Set(points[num][i].x, points[num][i].y);
                points[num][i] = vec;
            }

            polygonFix.shape.SetAsArray(points[num], points[num].length);
            polygonFix.density = POLYGON_DENSITY;
            polygonFix.friction = POLYGON_FRICTION;
            polygonFix.filter.groupIndex = POLYGON_FILTER_GROUP_INDEX;
            polygonFix.restitution = POLYGON_RESTITUTION;
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
    wheelFixture.density = WHEEL_DENSITY;
    wheelFixture.friction = WHEEL_FRICTION;
    wheelFixture.filter.groupIndex = WHEEL_FILTER_GROUP_INDEX;
    wheelFixture.restitution = WHEEL_RESTITUTION;
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
function makeCarJoints(world, bodyA, bodyB, wheelPosX, wheelPosY) {
    var jointdef = new b2RevoluteJointDef();
    jointdef.bodyA = bodyA;
    jointdef.bodyB = bodyB;
    jointdef.localAnchorA = new b2Vec2(0, 0);
    jointdef.localAnchorB = new b2Vec2(wheelPosX, wheelPosY);
    jointdef.maxMotorTorque = JOINT_MAX_TORQUE;
    jointdef.motorSpeed = JOINT_SPEED;
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
function makeWheelFixture(world, car, wheelbodyDef, wheelFixture) {
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

    try {
        var polygonFix1 = makePolygon(1, vertex1X, vertex1Y, vertex2X, vertex2Y);
        var polygonFix2 = makePolygon(2, vertex2X, vertex2Y, vertex3X, vertex3Y);
        var polygonFix3 = makePolygon(3, vertex3X, vertex3Y, vertex4X, vertex4Y);
        var polygonFix4 = makePolygon(4, vertex4X, vertex4Y, vertex5X, vertex5Y);
        var polygonFix5 = makePolygon(5, vertex5X, vertex5Y, vertex6X, vertex6Y);
        var polygonFix6 = makePolygon(6, vertex6X, vertex6Y, vertex7X, vertex7Y);
        var polygonFix7 = makePolygon(7, vertex7X, vertex7Y, vertex8X, vertex8Y);
        var polygonFix8 = makePolygon(8, vertex8X, vertex8Y, vertex1X, vertex1Y);
        done = true;
    } catch (err) {
        throw "ERROR";
    }

    var carBodyDef = new b2BodyDef;
    carBodyDef.type = b2Body.b2_dynamicBody;
    carBodyDef.position.Set(X_SCALE / WORLD_SCALE, Y_SCALE / WORLD_SCALE);

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


