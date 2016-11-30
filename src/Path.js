var WORLD_SCALE = 60;
var NUMBER_OF_VERTICES = 4;
var TILE_DENSITY = 5;
var TILE_FRICTION = 1.5;
//var TILE_FILTER_GROUP_INDEX = -1;
var TILE_RESTITUTION = 0.05;

var ORIGIN_X = -10;
var ORIGIN_Y = 8;
var NUMBER_OF_TILES = 1000;
var CHANCE_TO_FLIP_SLOPE = 0.5;
var WIDTH = 6;
var HEIGHT = 0.6;
var SLOPE1 = 12;
var SLOPE2 = 6;
var SLOPE3 = 4;
var SLOPE4 = 3;
var SLOPE5 = 1.5;
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
    randomnum = [0.1, 0.1, -0.2, -0.3, 0.17, -0.28, 0.4, 0.22, -0.35, 0.2, 0.48, -0.5, -0.68, 0.7, -0.8, 0.4, -0.45, 0.65, 0.456, -0.78, 0.63, 0.815, -0.99, 0.74, -0.879, 0.5465, 0.74, -0.38, 0.94, -0.81];
    position[0] = [ORIGIN_X, ORIGIN_Y];
    for (i = 0; i < 20; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE1 * randomnum[i]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE1 * randomnum[i]) + HEIGHT * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE1 * randomnum[i]) - HEIGHT * Math.cos(Math.PI / SLOPE1 * randomnum[i]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE1 * randomnum[i]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };
    for (i = 20; i < 40; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE2 * randomnum[i-20]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE2 * randomnum[i-20]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE2 * randomnum[i-20]) + HEIGHT * Math.sin(Math.PI / SLOPE2 * randomnum[i-20]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE2 * randomnum[i-20]) - HEIGHT * Math.cos(Math.PI / SLOPE2 * randomnum[i-20]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE2 * randomnum[i-20]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE2 * randomnum[i-20]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };
    for (i = 40; i < 60; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE3 * randomnum[i-40]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE3 * randomnum[i-40]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE3 * randomnum[i-40]) + HEIGHT * Math.sin(Math.PI / SLOPE3 * randomnum[i-40]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE3 * randomnum[i-40]) - HEIGHT * Math.cos(Math.PI / SLOPE3 * randomnum[i-40]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE3 * randomnum[i-40]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE3 * randomnum[i-40]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };
    for (i = 60; i < 80; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE4 * randomnum[i - 60]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE4 * randomnum[i - 60]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE4 * randomnum[i - 60]) + HEIGHT * Math.sin(Math.PI / SLOPE4 * randomnum[i - 60]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE4 * randomnum[i - 60]) - HEIGHT * Math.cos(Math.PI / SLOPE4 * randomnum[i - 60]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE4 * randomnum[i - 60]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE4 * randomnum[i - 60]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };
    for (i = 80; i < 100; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE5 * randomnum[i - 80]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE5 * randomnum[i - 80]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE5 * randomnum[i - 80]) + HEIGHT * Math.sin(Math.PI / SLOPE5 * randomnum[i - 80]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE5 * randomnum[i - 80]) - HEIGHT * Math.cos(Math.PI / SLOPE5 * randomnum[i - 80]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE5 * randomnum[i - 80]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE5 * randomnum[i - 80]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };


}// JavaScript source code
