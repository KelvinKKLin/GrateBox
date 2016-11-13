/*var b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2AABB = Box2D.Collision.b2AABB
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2Fixture = Box2D.Dynamics.b2Fixture
    , b2World = Box2D.Dynamics.b2World
    , b2MassData = Box2D.Collision.Shapes.b2MassData
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    , b2Shape = Box2D.Collision.Shapes.b2Shape
    , b2Joint = Box2D.Dynamics.Joints.b2Joint
    , b2Settings = Box2D.Common.b2Settings
    ;

var world;

function createWorld(){
    var gravity = b2Vec2(0, -9.8);

    world = new b2World(gravity, true);

    var scale = 100;

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);


    //createBox(world, 3, 4.29, 0.5, 0.1);
    createRoad(world, 0, 1, 150);
    createBall(world, 3, 5, 0.5)
    //createCircle(world, 5, 3, 0.5);

    return world;
}


function createBall(world, x, y, r)
{
    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef;

    fix_def.density = 1.0;
    fix_def.friction = 0.5;
    fix_def.restitution = 0.5;

    var shape = new b2CircleShape(r);
    fix_def.shape = shape;

    body_def.position.Set(x , y);

    body_def.linearDamping = 0.0;
    body_def.angularDamping = 0.0;

    body_def.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

    var b = world.CreateBody( body_def );
    b.CreateFixture(fix_def);

    return b;
}


//Create standard boxes of given height , width at x,y
function createBox(world, x, y, width, height, angle)
{
    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef();

    fix_def.density = 1.0;
    fix_def.friction = 0.5;
    fix_def.restitution = 1.5;

    fix_def.shape = new b2PolygonShape();

    fix_def.shape.SetAsBox( width , height );

    body_def.position.Set(x , y);

    var body = world.CreateBody( body_def );
    var fixture = body.CreateFixture(fix_def);
    body.SetPositionAndAngle(body.GetPosition(), angle);
    return body;
}

function createRoad(world, startX, startY, maxNumberOfTiles){
    var lastX = startX;
    var lastY = startY;
    var lastHeight = 0.1
    var angle = 0.78;
    for(var i = 0; i < maxNumberOfTiles; i++){
            lastTile = createBox(world, lastX, lastY, 0.78, lastHeight, angle);
            angle = angle * -1;
            lastX = lastX + 1;
    }
}



function step(cnt){
    var fps = 60;
    var timeStep = 1.0/fps;

    world.Step(timeStep, 8, 3);
    world.ClearForces();

    ctx.clearRect(0, 0, canvas_width, canvas_height);

    draw_world(world, ctx);

    setTimeout('step(' + (cnt || 0) + ')', 10);
}

/*
    Draw a world
    this method is called in a loop to redraw the world
*/ /*
function draw_world(world, context)
{
    //first clear the canvas
    ctx.clearRect( 0 , 0 , canvas_width, canvas_height );

    ctx.fillStyle = '#FFF4C9';
    ctx.fillRect(0,0, canvas_width, canvas_height);

    //convert the canvas coordinate directions to cartesian
    ctx.save();
    ctx.translate(0 , canvas_height);
    ctx.scale(1 , -1);
    world.DrawDebugData();
    ctx.restore();
}

/*
    Convert coordinates in canvas to box2d world
*/ /*
function get_real(p)
{
    return new b2Vec2(p.x + 0, 6 - p.y);
}

// main entry point
$(function()
{
    var canvas = $('#canvas');
    ctx = canvas.get(0).getContext('2d');

    //first create the world
    world = createWorld();

    //get internal dimensions of the canvas
    canvas_width = parseInt(canvas.attr('width'));
    canvas_height = parseInt(canvas.attr('height'));


     window.setInterval(step, 1000 / 60);
});
*/
var b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2AABB = Box2D.Collision.b2AABB
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2Fixture = Box2D.Dynamics.b2Fixture
    , b2World = Box2D.Dynamics.b2World
    , b2MassData = Box2D.Collision.Shapes.b2MassData
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    , b2Shape = Box2D.Collision.Shapes.b2Shape
    , b2Joint = Box2D.Dynamics.Joints.b2Joint
    , b2Settings = Box2D.Common.b2Settings
    , b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
    , b2RevoluteJointDef =  Box2D.Dynamics.Joints.b2RevoluteJointDef
    ;

var world;
var ctx;
var canvas_width;
var canvas_height;
var cameraX = 0;
var car;

//box2d to canvas scale , therefor 1 metre of box2d = 100px of canvas :)
var scale = 100;

/*
    Draw a world
    this method is called in a loop to redraw the world
*/
function draw_world(world, context)
{
    //first clear the canvas
    ctx.clearRect( 0 , 0 , canvas_width, canvas_height );

    ctx.fillStyle = '#555555';
    ctx.fillRect(0,0, canvas_width, canvas_height);

    //convert the canvas coordinate directions to cartesian
    ctx.save();
    ctx.translate(-cameraX , canvas_height);
    ctx.scale(1 , -1);
    world.DrawDebugData();
    ctx.restore();


}

//Create box2d world object
function createWorld()
{
    //Gravity vector x, y - 10 m/s2 - thats earth!!
    var gravity = new b2Vec2(0, -9.8);

    world = new b2World(gravity , true );

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);

    createGround(world, 0, 1, 150);

    //boxWidth, boxHeight, wheel1Radius, wheel2Radius, joint1Vertex,
    //joint2Vertex, maxMotorTorque1, maxMotorTorque2, motorSpeed1, motorSpeed2

    car = createCar(0.75, 0.25, 0.25, 0.25, -0.7, 0.7, 3, 3, -1, -1);


    return world;
}

//0.75, 0.25, 0.25, 0.25, -0.7, 0.7, 5, 2, -5, 3
function createCar(boxWidth, boxHeight, wheel1Radius, wheel2Radius, joint1Vertex, joint2Vertex, maxMotorTorque1, maxMotorTorque2, motorSpeed1, motorSpeed2){
    var a = createDynamicBox(world, 3, 2, boxWidth, boxHeight, 0);
    var b = createBall(world, 3, 2, 0.25);

    //create revolute joint between a and b
    var joint_def = new b2RevoluteJointDef();
    joint_def.bodyA = a;
    joint_def.bodyB = b;

    //connect the centers - center in local coordinate - relative to body is 0,0
    joint_def.localAnchorA = new b2Vec2(joint1Vertex, 0);
    joint_def.localAnchorB = new b2Vec2(0, 0);
    joint_def.maxMotorTorque = maxMotorTorque1;
    joint_def.motorSpeed = motorSpeed1;
    joint_def.enableMotor = true;
    //add the joint to the world
    world.CreateJoint(joint_def);

    var c = createBall(world, 3, 2, 0.25);
    joint_def.bodyA = a;
    joint_def.bodyB = c;

    //connect the centers - center in local coordinate - relative to body is 0,0
    joint_def.localAnchorA = new b2Vec2(joint2Vertex, 0);
    joint_def.localAnchorB = new b2Vec2(0, 0);

    joint_def.maxMotorTorque = maxMotorTorque2;
    joint_def.motorSpeed = motorSpeed2;
    joint_def.enableMotor = true;
    //add the joint to the world
    world.CreateJoint(joint_def);
    return a;
}

//Create a ground below the hellow world boxes
function createGround(world, startX, startY, maxNumberOfTiles)
{
    var lastX = startX;
    var lastY = startY;
    var lastHeight = 0.1
    var angle = 0; //0.78;
    for(var i = 0; i < maxNumberOfTiles; i++){
            lastTile = createBox(world, lastX, lastY, 0.78, lastHeight, angle);
            angle = angle * -1;
            lastX = lastX + 1;
    }
}

//Create standard boxes of given height , width at x,y
function createDynamicBox(world, x, y, width, height)
{
    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef();

    fix_def.density = 2;
    fix_def.friction = 2;
    fix_def.restitution = 0.5;

    fix_def.shape = new b2PolygonShape();

    fix_def.shape.SetAsBox( width/2 , height/2 );

    body_def.position.Set(x , y);
    body_def.linearDamping = 0.5;
    body_def.angularDamping = 0.5;

    body_def.type = b2Body.b2_dynamicBody;

    var b = world.CreateBody( body_def );
    var f = b.CreateFixture(fix_def);

    return b;
}

function createBox(world, x, y, width, height, angle)
{
    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef();

    fix_def.density = 2;
    fix_def.friction = 2;
    fix_def.restitution = 0.5;

    fix_def.shape = new b2PolygonShape();

    fix_def.shape.SetAsBox( width , height );

    body_def.type = b2Body.b2_staticBody;

    body_def.position.Set(x , y);

    var body = world.CreateBody( body_def );
    var fixture = body.CreateFixture(fix_def);
    body.SetPositionAndAngle(body.GetPosition(), angle);
    return body;
}

//Function to create a ball
function createBall(world, x, y, r)
{
    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef;

    fix_def.density = 1.0;
    fix_def.friction = 2;
    fix_def.restitution = 0;

    var shape = new b2CircleShape(r);
    fix_def.shape = shape;

    body_def.position.Set(x , y);

    body_def.linearDamping = 0.0;
    body_def.angularDamping = 0.0;

    body_def.type = b2Body.b2_dynamicBody;

    var b = world.CreateBody( body_def );
    b.CreateFixture(fix_def);

    return b;
}

/*
    This method will draw the world again and again
    called by settimeout , self looped
*/
function step()
{
    var fps = 60;
    var timeStep = 1.0/fps;

    console.log(car.GetLinearVelocity().x);
    cameraX = cameraX + 0.4;

    //move the world ahead , step ahead man!!
    world.Step(timeStep , 8 , 3);
    world.ClearForces();

    draw_world(world, ctx);
}

/*
    Convert coordinates in canvas to box2d world
*/
function get_real(p)
{
    return new b2Vec2(p.x + 0, 6 - p.y);
}

// main entry point
$(function()
{
    var canvas = $('#canvas');
    ctx = canvas.get(0).getContext('2d');

    //first create the world
    world = createWorld();

    //get internal dimensions of the canvas
    canvas_width = parseInt(canvas.attr('width'));
    canvas_height = parseInt(canvas.attr('height'));

    //create the hello world boxes in the world

    //click event handler on our world
    canvas.click( function(e)
    {
        var p = get_real(new b2Vec2(e.clientX / scale, e.clientY / scale));

        //circle
        createBall(world, p.x , p.y, 0.2, {'user_data' : {'fill_color' : 'rgba(204,100,0,0.3)' , 'border_color' : '#555' }});
    });

     window.setInterval(step, 1000 / 60);
});