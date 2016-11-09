
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

var points = [];

function init() {
    world = new b2World(
          new b2Vec2(0, 9.8)    //gravity
       , true                 //allow sleep
    );
    var worldScale = 60;

    drawCar(world, worldScale, 4, 0, 2, -1, -1, -2, -2, 0.5, -0.25, 0.25, 0.75, 0.5,3, 0.5, 3.5, 0.5, 4, 1);
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
}

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

    //addEventListener(event.ENTER_FRAME, update);

    var frontwheelX;
    var frontwheelY;
    var rearwheelX;
    var rearwheelY;


    frontwheelX = points[frontwheelPos][2].x;
    frontwheelY = points[frontwheelPos][2].y;


    rearwheelX = points[rearwheelPos][2].x;
    rearwheelY = points[rearwheelPos][2].y;

    var wheelshape = new b2CircleShape(80 / worldScale);
    var wheelFixture = new b2FixtureDef;
    wheelFixture.density = 1;
    wheelFixture.friction = 3;
    wheelFixture.filter.groupIndex = -1;
    wheelFixture.restitution = 0.1;
    wheelFixture.shape = wheelshape;
    var wheelshape2 = new b2CircleShape(50 / worldScale);
    var wheelFixture2 = new b2FixtureDef;
    wheelFixture2.density = 1;
    wheelFixture2.friction = 3;
    wheelFixture2.filter.groupIndex = -1;
    wheelFixture2.restitution = 0.1;
    wheelFixture2.shape = wheelshape2;
    var wheelbodyDef = new b2BodyDef;
    wheelbodyDef.type = b2Body.b2_dynamicBody;
    wheelbodyDef.position.Set(car.GetWorldCenter().x, car.GetWorldCenter().y);
    var rearwheel = world.CreateBody(wheelbodyDef);
    rearwheel.CreateFixture(wheelFixture);
    wheelbodyDef.position.Set(car.GetWorldCenter().x, car.GetWorldCenter().y);
    var frontwheel = world.CreateBody(wheelbodyDef);
    frontwheel.CreateFixture(wheelFixture2);
    addEventListener(event.ENTER_FRAME, update);



    var joint_def = new b2RevoluteJointDef();
    joint_def.bodyA = rearwheel;
    joint_def.bodyB = car;
    joint_def.localAnchorA = new b2Vec2(0, 0);
    joint_def.localAnchorB = new b2Vec2(rearwheelX, rearwheelY);
    joint_def.maxMotorTorque = 300;
    joint_def.motorSpeed = -500;
    joint_def.enableMotor = true;
    world.CreateJoint(joint_def);

    var joint_def = new b2RevoluteJointDef();
    joint_def.bodyA = frontwheel;
    joint_def.bodyB = car;
    joint_def.localAnchorA = new b2Vec2(0, 0);
    joint_def.localAnchorB = new b2Vec2(frontwheelX, frontwheelY);
    joint_def.maxMotorTorque = 100;
    joint_def.motorSpeed = -50;
    joint_def.enableMotor = true;
    world.CreateJoint(joint_def);

    return car;

};

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
    //console.log(body.GetPosition());
    body.SetPositionAndAngle(body.GetPosition(), angle);
    return body;
};

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


function update() {
    world.Step(
          1 / 60   //frame-rate
       , 10       //velocity iterations
       , 10       //position iterations
    );
    world.DrawDebugData();
    world.ClearForces();
};

// main entry point
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