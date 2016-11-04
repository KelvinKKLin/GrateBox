var world;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var box2dfps = 60;
var zoom = 70;

var cw_floorTiles = new Array();

function init() {
  world = new b2World(9.8, true);
  connectRoad(200);
  runningInterval = setInterval(simulationStep, Math.round(1000/60));
  drawInterval = setInterval(drawScreen, Math.round(1000/60));
}

function simulationStep() {
  world.Step(1/box2dfps, 20, 20);
}

function drawScreen() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.scale(zoom, -zoom);
  cw_drawFloor();
  ctx.restore();
}

function createRoad(position, angle, groundPieceWidth, groundPieceHeight){
  /*fixDef = new b2FixtureDef;
  fixDef.shape = new b2PolygonShape;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;
  fixDef.density = 1.0;

  var coords = new Array();
  coords.push(new b2Vec2(0,0));
  coords.push(new b2Vec2(0,-groundPieceHeight));
  coords.push(new b2Vec2(groundPieceWidth,-groundPieceHeight));
  coords.push(new b2Vec2(groundPieceWidth,0));

  var center = new b2Vec2(0,0);

  var newCoords = rotateRoad(coords, center, angle);
  fixDef.shape.SetAsArray(newCoords);

  var bodyDef = new b2BodyDef;
  bodyDef.position.Set(position.x,position.y);

  var body = world.CreateBody(bodyDef).CreateFixture(fixDef);

  return body;*/
  body_def = new b2BodyDef();

  body_def.position.Set(position.x, position.y);
  var body = world.CreateBody(body_def);
  fix_def = new b2FixtureDef();
  fix_def.shape = new b2PolygonShape();
  fix_def.friction = 0.5;

  var coords = new Array();
  coords.push(new b2Vec2(0,0));
  coords.push(new b2Vec2(0,-groundPieceHeight));
  coords.push(new b2Vec2(groundPieceWidth,-groundPieceHeight));
  coords.push(new b2Vec2(groundPieceWidth,0));

  var center = new b2Vec2(0,0);

  var newcoords = rotateRoad(coords, center, angle);

  fix_def.shape.SetAsArray(newcoords);

  body.CreateFixture(fix_def);
  return body;
};

function connectRoad(maxFloorTiles){
/*
  var lastTile = null;
  var tilePosition = new b2Vec2(-5, 0);

  floorTiles = new Array();

  for(var i = 0; i < maxFloorTiles; i++){
    lastTile = createRoad(tilePosition, (Math.random()*3 - 1.5) * 1.2*i/maxFloorTiles, 5, 5);

    floorTiles.push(lastTile);

    sideList = lastTile.GetFixtureList();
    upperRightSideCoord = lastTile.GetWorldPoint(sideList.GetShape().m_vertices[3]);
    tilePosition = upperRightSideCoord;
  }

  world.finishLine = tilePosition.x;
  */

  var last_tile = null;
  var tile_position = new b2Vec2(-5,0);
  cw_floorTiles = new Array();
  for(var k = 0; k < maxFloorTiles; k++) {
    last_tile = createRoad(tile_position, (Math.random()*3 - 1.5) * 1.2*k/maxFloorTiles, 5, 5);
    cw_floorTiles.push(last_tile);
    last_fixture = last_tile.GetFixtureList();
    last_world_coords = last_tile.GetWorldPoint(last_fixture.GetShape().m_vertices[3]);
    tile_position = last_world_coords;
  }
  world.finishLine = tile_position.x;


};

function rotateRoad(coordinate, center, angle){
  var arrayOfCoords = new Array();

  for(var i = 0; i < coordinate.length; i++){
    var newCoords = new Object();
    newCoords.x = Math.cos(angle)*(coordinate[i].x - center.x) - Math.sin(angle)*(coordinate[i].y - center.y) + center.x;
    newCoords.y = Math.sin(angle)*(coordinate[i].x - center.x) + Math.cos(angle)*(coordinate[i].y - center.y) + center.y;
    arrayOfCoords.push(newCoords);
  }

  return arrayOfCoords;
};


function cw_drawFloor() {
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#666";
  ctx.lineWidth = 1/zoom;
  ctx.beginPath();

  outer_loop:
  for(var k = Math.max(0,-20); k < cw_floorTiles.length; k++) {
    var b = cw_floorTiles[k];
    for (f = b.GetFixtureList(); f; f = f.m_next) {
      var s = f.GetShape();
      var shapePosition = b.GetWorldPoint(s.m_vertices[0]).x;
    }
  }
  ctx.fill();
  ctx.stroke();
}

init();
