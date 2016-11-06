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
    ;


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
    createRoad(world, 0, 4.29, 150);

    return world;
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
    body.SetPositionAndAngle(body.GetPosition(), 1);
    return body;
}

function createRoad(world, startX, startY, maxNumberOfTiles){
    var lastX = startX;
    var lastY = startY;
    var lastHeight = 0.1
    for(var i = 0; i < maxNumberOfTiles; i++){
            lastTile = createBox(world, lastX, lastY, 1, lastHeight, 0);
            lastX = lastX + 1;
            lastHeight = lastHeight ;
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
*/
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


     window.setInterval(step, 1000 / 60);
});