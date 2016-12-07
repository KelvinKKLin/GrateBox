//Symbolic Parameters

/**
* NUMBER_OF_VERTICES
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var NUMBER_OF_VERTICES = 4;

/**
* TILE_DENSITY
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var TILE_DENSITY = 5;

/**
* TILE_FRICTION
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var TILE_FRICTION = 1.5;

/**
* TILE_RESTITUTION
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var TILE_RESTITUTION = 0.05;

/**
* ORIGIN_X
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var ORIGIN_X = -10;

/**
* ORIGIN_Y
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var ORIGIN_Y = 8;

/**
* WIDTH
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var WIDTH = 6;

/**
* HEIGHT
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var HEIGHT = 0.6;

/**
* SLOPE1
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var SLOPE1 = 12;

/**
* SLOPE2
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var SLOPE2 = 6;

/**
* SLOPE3
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var SLOPE3 = 4;

/**
* SLOPE4
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var SLOPE4 = 3;

/**
* SLOPE5
*
* This variable keeps track of the scale of the world for the objects in the simulation.
*/
var SLOPE5 = 1.5;

/**
 * TILES_PER_PART
 *
 * This variable keeps track of the number of tiles per part of the road.
 */
var TILES_PER_PART = 20;

/**
 * This method creates a tile for the road.
 *
 * @param point1X {Integer} The x-coordinate of the upper right hand vertex
 * @param point1Y {Integer} The y-coordinate of the upper right hand vertex
 * @param point2X {Integer} The x-coordinate of the lower right hand vertex
 * @param point2Y {Integer} The y-coordinate of the lower right hand vertex
 * @param point3X {Integer} The x coordinate of the lower left hand vertex
 * @param point3Y {Integer} The y-coordinate of the lower left hand vertex
 * @param point4X {Integer} The x-coordinate of the upper left hand vertex
 * @param point4Y {Integer} The y-coordinate of the upper left hand vertex
 */
function createtile(point1X, point1Y, point2X, point2Y, point3X, point3Y, point4X, point4Y) {
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
    tailBodyDef.position.Set(point4X, point4Y);

    var tail = world.CreateBody(tailBodyDef);
    tail.CreateFixture(polygonFix);
}

/**
 * This method connects the tiles to each other in a sequential fashion starting from the first tile at the origin.

 * The road is split into 5 components, each with a different slope.
 * An array of random numbers is used in order to create the illusion of randomness, while enforcing comparability between cars of different
 * generations.
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

    //Part 1 of the road
    for (i = 0; i < TILES_PER_PART * 1; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE1 * randomnum[i]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE1 * randomnum[i]) + HEIGHT * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE1 * randomnum[i]) - HEIGHT * Math.cos(Math.PI / SLOPE1 * randomnum[i]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE1 * randomnum[i]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE1 * randomnum[i]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };

    //Part 2 of the road
    for (i = TILES_PER_PART * 1; i < TILES_PER_PART * 2; i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]) + HEIGHT * Math.sin(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]) - HEIGHT * Math.cos(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE2 * randomnum[i-(TILES_PER_PART*1)]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };

    //Part 3 of the road
    for (i = (TILES_PER_PART*2); i < (TILES_PER_PART*3); i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]) + HEIGHT * Math.sin(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]) - HEIGHT * Math.cos(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE3 * randomnum[i-(TILES_PER_PART*2)]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };

    //Part 4 of the road
    for (i = (TILES_PER_PART*3); i < (TILES_PER_PART*4); i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]) + HEIGHT * Math.sin(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]) - HEIGHT * Math.cos(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE4 * randomnum[i - (TILES_PER_PART*3)]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };

    //Part 5 of the road
    for (i = (TILES_PER_PART*4); i < (TILES_PER_PART*5); i++) {
        point1x = WIDTH * Math.cos(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]);
        point1y = -WIDTH * Math.sin(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]);
        point2x = WIDTH * Math.cos(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]) + HEIGHT * Math.sin(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]);
        point2y = -(WIDTH * Math.sin(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]) - HEIGHT * Math.cos(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]));
        point3x = HEIGHT * Math.sin(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]);
        point3y = HEIGHT * Math.cos(Math.PI / SLOPE5 * randomnum[i - (TILES_PER_PART*4)]);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    };


}// JavaScript source code
