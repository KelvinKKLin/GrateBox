var WORLD_SCALE = 60;
var NUMBER_OF_VERTICES = 4;
var TILE_DENSITY = 5;
var TILE_FRICTION = 3;
//var TILE_FILTER_GROUP_INDEX = -1;
var TILE_RESTITUTION = 0.1;

var ORIGIN_X = -10;
var ORIGIN_Y = 8;
var NUMBER_OF_TILES = 1000;
var CHANCE_TO_FLIP_SLOPE = 0.5;
var WIDTH = 6;
var HEIGHT = 0.6;
var SLOPE1 = 12;
var SLOPE2 = 10;
var SLOPE3 = 8;
var SLOPE4 = 6;
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
    var randonnum = [];
    randomnum = [0.1, 0.3, 0.2, -0.8, 0.01, 0.1, -0.4, 0.12, 0.35, 0.2, 0.68, -0.9, -0.78, 0.1, 0.8, 0.35, -0.45, 0.15, 0.456, -0.68, 0.513, 0.215, -0.49, 0.24, -0.879, 0.2465, 0.24, -0.48, 0.24, 0.51];
    position[0] = [ORIGIN_X, ORIGIN_Y];
    for (i = 0; i < 30; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE1 * randomnum[i]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE1 * randomnum[i]) + HEIGHT * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE1 * randomnum[i]) - HEIGHT * Math.cos(Math.PI / SLOPE1 * randomnum[i]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE1 * randomnum[i]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };
    for (i = 30; i < 60; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE2 * randomnum[i-30]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE2 * randomnum[i-30]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE2 * randomnum[i-30]) + HEIGHT * Math.sin(Math.PI / SLOPE2 * randomnum[i-30]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE2 * randomnum[i-30]) - HEIGHT * Math.cos(Math.PI / SLOPE2 * randomnum[i-30]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE2 * randomnum[i-30]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE2 * randomnum[i-30]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };
    for (i = 60; i < 90; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE3 * randomnum[i-60]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE3 * randomnum[i-60]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE3 * randomnum[i-60]) + HEIGHT * Math.sin(Math.PI / SLOPE3 * randomnum[i-60]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE3 * randomnum[i-60]) - HEIGHT * Math.cos(Math.PI / SLOPE3 * randomnum[i-60]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE3 * randomnum[i-60]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE3 * randomnum[i-60]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };
    for (i = 90; i < 120; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE4 * randomnum[i - 90]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE4 * randomnum[i - 90]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE4 * randomnum[i - 90]) + HEIGHT * Math.sin(Math.PI / SLOPE4 * randomnum[i - 90]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE4 * randomnum[i - 90]) - HEIGHT * Math.cos(Math.PI / SLOPE4 * randomnum[i - 90]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE4 * randomnum[i - 90]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE4 * randomnum[i - 90]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };


}// JavaScript source code
