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

    world = new b2World(
          new b2Vec2(0, 9.8)    //gravity
       , true                 //allow sleep
    );


    this.bodyDef = new b2BodyDef;
    this.bodyDef.type = b2Body.b2_dynamicBody;
    this.PolygonfixDef = new b2FixtureDef;
    this.PolygonfixDef.shape = new b2PolygonShape;
    this.PolygonfixDef.density = 1.0;
    this.PolygonfixDef.friction = 0.5;
    this.PolygonfixDef.restitution = 0.2;
  
    var points = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 2 }];

    for (var i = 0; i < 4; i++) {
        var vec = new b2Vec2();
        vec.Set(points[i].x, points[i].y);
        points[i] = vec;
    }

    this.PolygonfixDef.shape.SetAsArray(points, points.length);

    this.bodyDef.position.x = 5;
    this.bodyDef.position.y = 5;
    this.world.CreateBody(this.bodyDef).CreateFixture(this.PolygonfixDef);

    this.CircleFixDef = new b2FixtureDef;
    this.CircleFixDef.shape = new b2CircleShape(1);
    this.CircleFixDef.density = 1.0;
    this.CircleFixDef.friction = 0.5;
    this.CircleFixDef.restitution = 0.2;
    this.world.CreateBody(this.bodyDef).CreateFixture(this.CircleFixDef);

    this.Circle1FixDef = new b2FixtureDef;
    this.Circle1FixDef.shape = new b2CircleShape(1);
    this.Circle1FixDef.density = 1.0;
    this.Circle1FixDef.friction = 0.5;
    this.Circle1FixDef.restitution = 0.2;
    this.world.CreateBody(this.bodyDef).CreateFixture(this.Circle1FixDef);


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
