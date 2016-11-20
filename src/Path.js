function createtile(point1X, point1Y, point2X, point2Y, point3X, point3Y, positionX, positionY) {
    var WORLD_SCALE = 60;
    var polygon = new b2PolygonShape;
    var polygonFix = new b2FixtureDef;
    polygonFix.shape = polygon;

    var point = [];

    point = [{ x: 0, y: 0 }, { x: point1X, y: point1Y }, { x: point2X, y: point2Y }, { x: point3X, y: point3Y }];

    for (var i = 0; i < 4; i++) {
        var vec = new b2Vec2();
        vec.Set(point[i].x, point[i].y);
        points[i] = vec;
    }

    polygonFix.shape.SetAsArray(point, point.length);
    polygonFix.density = 5;
    polygonFix.friction = 3;
    polygonFix.filter.groupInedx = -1;
    polygonFix.restitution = 0.3;
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
    position[0] = [-10, 10];
    for (i = 0; i < 100; i++) {
        randomnum = Math.random();
        if (Math.random() > 0.5) {
            randomnum = -randomnum;
        }
        point1x = 3 * Math.cos(Math.PI / 9 * randomnum);
        point1y = -3 * Math.sin(Math.PI / 9 * randomnum);
        point2x = 3 * Math.cos(Math.PI / 9 * randomnum) + 0.3 * Math.sin(Math.PI / 9 * randomnum);
        point2y = -(3 * Math.sin(Math.PI / 9 * randomnum) - 0.3 * Math.cos(Math.PI / 9 * randomnum));
        point3x = 0.3 * Math.sin(Math.PI / 9 * randomnum);
        point3y = 0.3 * Math.cos(Math.PI / 9 * randomnum);
        position[i + 1] = [point1x + position[i][0], point1y + position[i][1]];
        createtile(point1x, point1y, point2x, point2y, point3x, point3y, position[i][0], position[i][1]);
    }
}// JavaScript source code
