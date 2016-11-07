var world;
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
var worldScale = 60;

world = new b2World(
      new b2Vec2(0, 9.8)    //gravity
   , true                 //allow sleep
    );

function drawCar(vertex) {
    drawPolygon(vertex);
    drawWheels(vertex);
    var joint_def = new b2RevoluteJointDef();
    joint_def.bodyA = rearwheel;
    joint_def.bodyB = car;
    joint_def.localAnchorA = new b2Vec2(0, 0);
    joint_def.localAnchorB = new b2Vec2(1, 0);
    joint_def.maxMotorTorque = 3;
    joint_def.motorSpeed = -5;
    joint_def.enableMotor = true;
    world.CreateJoint(joint_def);

    var joint_def = new b2RevoluteJointDef();
    joint_def.bodyA = frontwheel;
    joint_def.bodyB = car;
    joint_def.localAnchorA = new b2Vec2(0, 0);
    joint_def.localAnchorB = new b2Vec2(-1, 0);
    joint_def.maxMotorTorque = 3;
    joint_def.motorSpeed = -5;
    joint_def.enableMotor = true;
    world.CreateJoint(joint_def);

}



function drawPolygon(vertex) {
    
    var polygonbodydef = new b2BodyDef;
    polygonbodydef.type = b2Body.b2_dynamicBody;
    var carpolygon = world.CreateBody(polygonbodydef);
    for (var j = 0; j < 8; j++) {
        this.polygonshape = new b2PolygonShape;
        this.carFix = new b2FixtureDef;
        this.carFix.shape = polygonshape;
        for (var i = 0; i < 2; i++) {
            var vec = new b2Vec2();
            vec.Set(points[i].x, points[i].y);
            points[i] = vec;
        }
        this.carFix.shape.SetAsArray(points, points.length);
        carFix.density = 5;
        carFix.friction = 3;
        carFix.filter.groupInedx = -1;
        carFix.restitution = 0.3;
        carpolygon.CreateFixture(this.carFix);


    }
}


function drawWheels(vertex) {
    var wheelshape = new b2CircleShape(20 / worldScale);
    var wheelFixture = new b2FixtureDef;
    wheelFixture.density = 1;
    wheelFixture.friction = 3;
    wheelFixture.filter.groupInedx = -1;
    wheelFixture.restitution = 0.1;
    wheelFixture.shape = wheelshape;
    var wheelbodyDef = new b2BodyDef;
    wheelbodyDef.type = b2Body.b2_dynamicBody;
    wheelbodyDef.position.Set(car.GetWorldCenter().x - (60 / worldScale), car.GetWorldCenter().y + (65 / worldScale));
    var rearwheel = world.CreateBody(wheelbodyDef);
    rearwheel.CreateFixture(wheelFixture);
    wheelbodyDef.position.Set(car.GetWorldCenter().x + (75 / worldScale), car.GetWorldCenter().y + (65 / worldScale));
    var frontwheel = world.CreateBody(wheelbodyDef);
    frontwheel.CreateFixture(wheelFixture);
    addEventListener(event.ENTER_FRAME, update);
}
