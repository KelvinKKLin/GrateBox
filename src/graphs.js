
var timeStep = 1.0 / 60.0;
var doDraw = true;
var box2dfps = 60;
var screenfps = 60;
var canvas = document.getElementById("mainbox");
var ctx = canvas.getContext("2d");
var cameraspeed = 0.05;
var camera_y = 0;
var camera_x = 0;
var camera_target = -1;
var minimapcamera = document.getElementById("minimapcamera").style;
var minimapcanvas = document.getElementById("minimap");
var minimapctx = minimapcanvas.getContext("2d");
var minimapscale = 3;
var gravity = new b2Vec2(0.0, -9.81);
var doSleep = true;
var world;
var zoom = 70;
var mutable_floor = false;
var maxFloorTiles = 200;
var cw_floorTiles = new Array();
var last_drawn_tile = 0;
var groundPieceWidth = 1.5;
var groundPieceHeight = 0.15;
var leaderPosition = new Object();
leaderPosition.x = 0;
leaderPosition.y = 0;

minimapcamera.width = 12*minimapscale+"px";
minimapcamera.height = 6*minimapscale+"px";



function cw_drawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    cw_setCameraPosition();
    ctx.translate(200 - (camera_x * zoom), 200 + (camera_y * zoom));
    ctx.scale(zoom, -zoom);
    drawFloor();
    cw_drawCars();
    ctx.restore();
}

function cw_minimapCamera(x, y) {
    minimapcamera.left = Math.round((2 + camera_x) * minimapscale) + "px";
    minimapcamera.top = Math.round((31 - camera_y) * minimapscale) + "px";
}
function cw_setCameraTarget(k) {
  camera_target = k;
}

function cw_setCameraPosition() {
    if (camera_target >= 0) {
        var cameraTargetPosition = cw_carArray[camera_target].getPosition();
    } else {
        var cameraTargetPosition = leaderPosition;
    }
    var diff_y = camera_y - cameraTargetPosition.y;
    var diff_x = camera_x - cameraTargetPosition.x;
    camera_y -= cameraspeed * diff_y;
    camera_x -= cameraspeed * diff_x;
    cw_minimapCamera(camera_x, camera_y);
}



function cw_drawVirtualPoly(body, vtx, n_vtx) {


    var p0 = body.GetWorldPoint(vtx[0]);
    ctx.moveTo(p0.x, p0.y);
    for (var i = 1; i < n_vtx; i++) {
        p = body.GetWorldPoint(vtx[i]);
        ctx.lineTo(p.x, p.y);
    }
    ctx.lineTo(p0.x, p0.y);
}


function simulationStep() {
    world.Step(1/box2dfps, 20, 20);
}




function cw_init() {
  floorseed = btoa(Math.seedrandom());
  world = new b2World(gravity, doSleep);
  ConnectPath();
  cw_runningInterval = setInterval(simulationStep, Math.round(1000/box2dfps));
  cw_drawInterval    = setInterval(cw_drawScreen,  Math.round(1000/screenfps));
}

function ConnectPath() {
    var last_tile = null;
    var tile_position = new b2Vec2(-5, 0);
    cw_floorTiles = new Array();
    Math.seedrandom(floorseed);
    for (var k = 0; k < maxFloorTiles; k++) {
        if (!mutable_floor) {
            last_tile = CreatePath(tile_position, (Math.random() * 3 - 1.5) * 1.5 * k / maxFloorTiles);
        } else {
            last_tile = CreatePath(tile_position, (Math.random() * 3 - 1.5) * 1.2 * k / maxFloorTiles);
        }
        cw_floorTiles.push(last_tile);
        last_fixture = last_tile.GetFixtureList();
        last_world_coords = last_tile.GetWorldPoint(last_fixture.GetShape().m_vertices[3]);
        tile_position = last_world_coords;
    }
    world.finishLine = tile_position.x;
}


function CreatePath(position, angle) {
    body_def = new b2BodyDef();

    body_def.position.Set(position.x, position.y);
    var body = world.CreateBody(body_def);
    fix_def = new b2FixtureDef();
    fix_def.shape = new b2PolygonShape();
    fix_def.friction = 0.5;

    var coords = new Array();
    coords.push(new b2Vec2(0, 0));
    coords.push(new b2Vec2(0, -groundPieceHeight));
    coords.push(new b2Vec2(groundPieceWidth, -groundPieceHeight));
    coords.push(new b2Vec2(groundPieceWidth, 0));

    var center = new b2Vec2(0, 0);

    var newcoords = RotatePath(coords, center, angle);

    fix_def.shape.SetAsArray(newcoords);

    body.CreateFixture(fix_def);
    return body;
}

function RotatePath(coordinate, center, angle) {
    var newcoords = new Array();
    for (var k = 0; k < coords.length; k++) {
        nc = new Object();
        nc.x = Math.cos(angle) * (coords[k].x - center.x) - Math.sin(angle) * (coords[k].y - center.y) + center.x;
        nc.y = Math.sin(angle) * (coords[k].x - center.x) + Math.cos(angle) * (coords[k].y - center.y) + center.y;
        newcoords.push(nc2);
    }
    return newcoords;



    /*var arrayOfCoords = new Array();

    for(var i = 0; i < coordinate.length; i++){
     newCoords = new Object();
     newCoords.x = Math.cos(angle)*(coordinate[i].x - center.x) - Math.sin(angle)*(coordinate[i].y - center.y) + center.x;
     newCoords.y = Math.sin(angle)*(coordinate[i].x - center.x) + Math.cos(angle)*(coordinate[i].y - center.y) + center.y;
     arrayOfCoords.push(newCoords);
    }

    return arrayOfCoords;*/


}



function drawFloor() {
    ctx.strokeStyle = "#111";
    ctx.fillStyle = "#555";
    ctx.lineWidth = 1 / zoom;
    ctx.beginPath();
    for (var k = Math.max(0, last_drawn_tile - 20) ; k < cw_floorTiles.length; k++) {
        var b = cw_floorTiles[k];
        for (f = b.GetFixtureList() ; f; f = f.m_next) {
            var s = f.GetShape();
            var shapePosition = b.GetWorldPoint(s.m_vertices[0]).x;
            if ((shapePosition > (camera_x - 5)) && (shapePosition < (camera_x + 10))) {
                cw_drawVirtualPoly(b, s.m_vertices, s.m_vertexCount);
            }
            if (shapePosition > camera_x + 10) {
                last_drawn_tile = k;
                break outer_loop;
            }
        }
    }
    ctx.fill();
    ctx.stroke();
}

cw_init();