var WORLD_SCALE = 60;
var NUMBER_OF_VERTICES = 4;
var TILE_DENSITY = 5;
var TILE_FRICTION = 3;
//var TILE_FILTER_GROUP_INDEX = -1;
var TILE_RESTITUTION = 0.3;

var ORIGIN_X = -10;
var ORIGIN_Y = 5;
var NUMBER_OF_TILES = 1000;
var CHANCE_TO_FLIP_SLOPE = 0.5;
var WIDTH = 3;
var HEIGHT = 0.3;
var SLOPE = 6;

function createtile(point1X, point1Y, point2X, point2Y, point3X, point3Y, positionX, positionY) {
    var polygon = new b2PolygonShape;
    var polygonFix = new b2FixtureDef;
    polygonFix.shape = polygon;

    var point = [];

    point = [{ x: 0, y: 0 }, { x: point1X, y: point1Y }, { x: point2X, y: point2Y }, { x: point3X, y: point3Y }];

    for (var i = 0; i < NUMBER_OF_VERTICES; i++) {
        var vec = new b2Vec2();
        vec.Set(point[i].x, point[i].y);
        points[i] = vec;
    }

    polygonFix.shape.SetAsArray(point, point.length);
    polygonFix.density = TILE_DENSITY;
    polygonFix.friction = TILE_FRICTION;
    //polygonFix.filter.groupInedx = TILE_FILTER_GROUP_INDEX;
    polygonFix.restitution = TILE_RESTITUTION;
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
    position[0] = [ORIGIN_X, ORIGIN_Y];
    for (i = 0; i < NUMBER_OF_TILES; i++) {
        randomnum = Math.random();
        if (Math.random() > CHANCE_TO_FLIP_SLOPE) {
            randomnum = -randomnum;
        }
        point1x = WIDTH * Math.cos(Math.PI / SLOPE * randomnum);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE * randomnum);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE * randomnum) + HEIGHT * Math.sin(Math.PI / SLOPE * randomnum);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE * randomnum) - HEIGHT * Math.cos(Math.PI / SLOPE * randomnum));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE * randomnum);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE * randomnum);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    }
}// JavaScript source code
