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
    ;
    var worldScale = 60;

    world = new b2World(
          new b2Vec2(0, 9.8)    //gravity
       , true                 //allow sleep
    );

    // ****************the car**************//
    var carshape = new b2PolygonShape;
    carshape.SetAsBox(120/worldScale, 20/worldScale);
    var carFix = new b2FixtureDef;
    carFix.density = 5;
    carFix.friction = 3;
    carFix.filter.groupInedx = -1;
    carFix.restitution = 0.3;
    carFix.shape = carshape;
    var carBodyDef = new b2BodyDef;
    carBodyDef.type = b2Body.b2_dynamicBody;
    carBodyDef.position.Set(320/worldScale, 100/worldScale);
    //****************the Trunk**************//
    var trunkshape = new b2PolygonShape;
    trunkshape.SetAsOrientedBox(40/worldScale, 40/worldScale, new b2Vec2(-80/worldScale, -60/worldScale));
    var trunkfix = new b2FixtureDef;
    trunkfix.density = 5;
    trunkfix.friction = 3;
    trunkfix.filter.groupInedx = -1;
    trunkfix.restitution = 0.3;
    trunkfix.shape = trunkshape;
    //****************the Hood***************//
    /*var hoodshape = new b2PolygonShape;
    var carVector = new Vector.b2Vec2;
    carVector[0] = new b2Vec2(-1, -0.5);
    carVector[1] = new b2Vec2(-1, -2.5);
    carVector[2] = new b2Vec2(3, -0.5);
    hoodshape.SetAsVector(carVector, 3);
    var hoodfix = new b2FixtureDef;
    hoodfix.density = 5;
    hoodfix.friction = 3;
    hoodfix.filter.groupInedx = -1;
    hoodfix.restitution = 0.3;
    hoodfix.shape = carshape;*/
    var car = world.CreateBody(carBodyDef);
    car.CreateFixture(carFix);
    car.CreateFixture(trunkfix);
    addEventListener(event.ENTER_FRAME, update);
    //car.CreateFixture(hoodfix);
    //****************Axle***************//
    /*var axleshape = new b2PolygonShape;
    axleshape.SetAsBox(20/worldScale, 20/worldScale);
    var axlefix = new b2FixtureDef;
    axlefix.density = 0.5;
    axlefix.friction = 3;
    axlefix.filter.groupInedx = -1;
    axlefix.restitution = 0.3;
    axlefix.shape = axleshape;
    var axlebodyDef = new b2BodyDef;
    axlebodyDef.type = b2Body.b2_dynamicBody;
    axlebodyDef.position.Set(car.GetWorldCenter.x - (60/worldScale), car.GetWorldCenter.y + (65/worldScale));
    var rearaxle = world.CreateBody(axlebodyDef);
    rearaxle.CreateFixture(axlefix);
    axlebodyDef.position.Set(car.GetWorldCenter.x + (75/worldScale), car.GetWorldCenter.y + (65/worldScale));
    var frontaxle = world.CreateBody(axlebodyDef);
    frontaxle.CreateFixture(axlefix);*/
    
    //****************wheel***************//
    /*var wheelshape = new b2CircleShape(40/worldScale);
    var wheelFixture = new b2FixtureDef;
    wheelFixture.density = 1;
    wheelFixture.friction = 3;
    wheelFixture.filter.groupInedx = -1;
    wheelFixture.restitution = 0.1;
    wheelFixture.shape = wheelshape;
    var wheelbodyDef = new b2BodyDef;
    wheelbodyDef.type = b2Body.b2_dynamicBody;
    wheelbodyDef.position.Set(car.GetWorldCenter.x - (60 / worldScale), car.GetWorldCenter.y + (65 / worldScale));
    var rearwheel = world.CreateBody(wheelbodyDef);
    rearwheel.CreateFixture(wheelFixture);
    wheelbodyDef.position.Set(car.GetWorldCenter.x + (75 / worldScale), car.GetWorldCenter.y + (65 / worldScale));
    var frontwheel = world.CreateBody(wheelbodyDef);
    frontwheel.CreateFixture(wheelFixture);*/
    addEventListener(event.ENTER_FRAME, update);


    














  
    









    this.body2Def = new b2BodyDef;
    this.body2Def.type = b2Body.b2_staticBody;
    this.fixDef = new b2FixtureDef;
    this.fixDef.shape = new b2PolygonShape;
    this.fixDef.shape.SetAsBox(5, 0.25);
    this.body2Def.position.Set(5, 20);
    this.world.CreateBody(this.body2Def).CreateFixture(this.fixDef);





    //create ground









    //create some objects
  
    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(worldScale);
    debugDraw.SetFillAlpha(0.5);
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
