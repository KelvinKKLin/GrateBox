var world;


function init() {
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

    world = new b2World(
          new b2Vec2(0, 9.8)    //gravity
       , true                 //allow sleep
    );
    var worldScale = 60;

    drawPolygon();
    createRoad(world, 0, 15, 150);

    /*var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 9;
    bodyDef.position.y = 13;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(100, 0.5);
    world.CreateBody(bodyDef).CreateFixture(fixDef);*/

    function drawPolygon() {
        //**************************polygon1**************************//
        var polygon1 = new b2PolygonShape;
        var polygonFix1 = new b2FixtureDef;
        polygonFix1.shape = polygon1;
        var points = [{ x: 0, y: 0 }, { x: 2, y: -1 }, { x: 4, y: 0 }];

        for (var i = 0; i < 3; i++) {
            var vec = new b2Vec2();
            vec.Set(points[i].x, points[i].y);
            points[i] = vec;
        }

        polygonFix1.shape.SetAsArray(points, points.length);
        polygonFix1.density = 5;
        polygonFix1.friction = 3;
        polygonFix1.filter.groupInedx = -1;
        polygonFix1.restitution = 0.3;

        //**************************polygon2**************************//
        var polygon2 = new b2PolygonShape;
        var polygonFix2 = new b2FixtureDef;
        polygonFix2.shape = polygon2;
        var points = [{ x: 0, y: 0 }, { x: -1, y: -2 }, { x: 2, y: -1 }];


        for (var i = 0; i < 3; i++) {
            var vec = new b2Vec2();
            vec.Set(points[i].x, points[i].y);
            points[i] = vec;
        }
        polygonFix2.shape.SetAsArray(points, points.length);
        polygonFix2.density = 5;
        polygonFix2.friction = 3;
        polygonFix2.filter.groupInedx = -1;
        polygonFix2.restitution = 0.3;

        //**************************polygon3**************************//
        var polygon3 = new b2PolygonShape;
        var polygonFix3 = new b2FixtureDef;
        polygonFix3.shape = polygon3;
        var points = [{ x: 0, y: 0 }, { x: -2, y: 0.5 }, { x: -1, y: -2 }];


        for (var i = 0; i < 3; i++) {
            var vec = new b2Vec2();
            vec.Set(points[i].x, points[i].y);
            points[i] = vec;
        }

        polygonFix3.shape.SetAsArray(points, points.length);
        polygonFix3.density = 5;
        polygonFix3.friction = 3;
        polygonFix3.filter.groupInedx = -1;
        polygonFix3.restitution = 0.3;

        //**************************polygon4**************************//
        var polygon4 = new b2PolygonShape;
        var polygonFix4 = new b2FixtureDef;
        polygonFix4.shape = polygon4;
        var points = [{ x: 0, y: 0 }, { x: -0.25, y: 0.25 }, { x: -2, y: 0.5 }];


        for (var i = 0; i < 3; i++) {
            var vec = new b2Vec2();
            vec.Set(points[i].x, points[i].y);
            points[i] = vec;
        }
        polygonFix4.shape.SetAsArray(points, points.length);
        polygonFix4.density = 5;
        polygonFix4.friction = 3;
        polygonFix4.filter.groupInedx = -1;
        polygonFix4.restitution = 0.3;

        //**************************polygon5**************************//
        var polygon5 = new b2PolygonShape;
        var polygonFix5 = new b2FixtureDef;
        polygonFix5.shape = polygon5;
        var points = [{ x: 0, y: 0 }, { x: 0.75, y: 0.5 }, { x: -0.25, y: 0.25 }];


        for (var i = 0; i < 3; i++) {
            var vec = new b2Vec2();
            vec.Set(points[i].x, points[i].y);
            points[i] = vec;
        }
        polygonFix5.shape.SetAsArray(points, points.length);
        polygonFix5.density = 5;
        polygonFix5.friction = 3;
        polygonFix5.filter.groupInedx = -1;
        polygonFix5.restitution = 0.3;
        //**************************polygon6**************************//
        var polygon6 = new b2PolygonShape;
        var polygonFix6 = new b2FixtureDef;
        polygonFix6.shape = polygon6;
        var points = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0.75, y: 0.5 }];


        for (var i = 0; i < 3; i++) {
            var vec = new b2Vec2();
            vec.Set(points[i].x, points[i].y);
            points[i] = vec;
        }
        polygonFix6.shape.SetAsArray(points, points.length);
        polygonFix6.density = 5;
        polygonFix6.friction = 3;
        polygonFix6.filter.groupInedx = -1;
        polygonFix6.restitution = 0.3;


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


        addEventListener(event.ENTER_FRAME, update);




        var wheelshape = new b2CircleShape(40 / worldScale);
        var wheelFixture = new b2FixtureDef;
        wheelFixture.density = 1;
        wheelFixture.friction = 3;
        wheelFixture.filter.groupInedx = -1;
        wheelFixture.restitution = 0.1;
        wheelFixture.shape = wheelshape;
        var wheelshape2 = new b2CircleShape(70 / worldScale);
        var wheelFixture2 = new b2FixtureDef;
        wheelFixture2.density = 1;
        wheelFixture2.friction = 3;
        wheelFixture2.filter.groupInedx = -1;
        wheelFixture2.restitution = 0.1;
        wheelFixture2.shape = wheelshape2;
        var wheelbodyDef = new b2BodyDef;
        wheelbodyDef.type = b2Body.b2_dynamicBody;
        wheelbodyDef.position.Set(car.GetWorldCenter().x - (80 / worldScale), car.GetWorldCenter().y + (65 / worldScale));
        var rearwheel = world.CreateBody(wheelbodyDef);
        rearwheel.CreateFixture(wheelFixture);
        wheelbodyDef.position.Set(car.GetWorldCenter().x + (100 / worldScale), car.GetWorldCenter().y + (65 / worldScale));
        var frontwheel = world.CreateBody(wheelbodyDef);
        frontwheel.CreateFixture(wheelFixture2);
        addEventListener(event.ENTER_FRAME, update);

        var joint_def = new b2RevoluteJointDef();
        joint_def.bodyA = rearwheel;
        joint_def.bodyB = car;
        joint_def.localAnchorA = new b2Vec2(0, 0);
        joint_def.localAnchorB = new b2Vec2(-2, 0.5);
        joint_def.maxMotorTorque = 30;
        joint_def.motorSpeed = -50;
        joint_def.enableMotor = true;
        world.CreateJoint(joint_def);

        var joint_def = new b2RevoluteJointDef();
        joint_def.bodyA = frontwheel;
        joint_def.bodyB = car;
        joint_def.localAnchorA = new b2Vec2(0, 0);
        joint_def.localAnchorB = new b2Vec2(4, 0);
        joint_def.maxMotorTorque = 30;
        joint_def.motorSpeed = -50;
        joint_def.enableMotor = true;
        world.CreateJoint(joint_def);



    }

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
        console.log(body.GetPosition());
        body.SetPositionAndAngle(body.GetPosition(), angle);
        return body;
    }

    function createRoad(world, startX, startY, maxNumberOfTiles) {
        var lastX = startX;
        var lastY = startY;
        var lastHeight = 0.1
        var angle = 0.2;//0.78;
        for (var i = 0; i < maxNumberOfTiles; i++) {
            lastTile = createBox(world, lastX, lastY, 0.78, lastHeight, angle);
            angle = angle * -1;
            lastX = lastX + 1;
        }
    }







    //Create standard boxes of given height , width at x,y
    

    /*function drawWheel() {
        var wheelshape = new b2CircleShape(40/worldScale);
        var wheelFixture = new b2FixtureDef;
        wheelFixture.density = 1;
        wheelFixture.friction = 3;
        wheelFixture.filter.groupInedx = -1;
        wheelFixture.restitution = 0.1;
        wheelFixture.shape = wheelshape;
        var wheelbodyDef = new b2BodyDef;
        wheelbodyDef.type = b2Body.b2_dynamicBody;
        wheelbodyDef.position.Set(60 / worldScale, 65 / worldScale);
        var rearwheel = world.CreateBody(wheelbodyDef);
        rearwheel.CreateFixture(wheelFixture);
        wheelbodyDef.position.Set(75 / worldScale, 65 / worldScale);
        var frontwheel = world.CreateBody(wheelbodyDef);
        frontwheel.CreateFixture(wheelFixture);
        addEventListener(event.ENTER_FRAME, update);

    };*/





    //create ground









    //create some objects
  
    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(40.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    window.setInterval(update, 1000 / 60);
};

function update() {
    world.Step(
          1 / 60   //frame-rate
       , 10       //velocity iterations
       , 10       //position iterations
    );
    world.DrawDebugData();
    world.ClearForces();
};// JavaScript source code
