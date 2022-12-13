const readline = require("readline");
console.log("Noah Dennis  -  Barton Peveril Sixth Form College");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let possibleShapes = {
    'F': [{x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
    'G': [{x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 1}],
    'I': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}],
    'L': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 1, y: 0}],
    'J': [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 0, y: 0}],
    'N': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 1, y: 3}],
    'M': [{x: 0, y: 3}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}],
    'P': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 1}, {x: 1, y: 2}],
    'Q': [{x: 1, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 1}, {x: 1, y: 2}],
    'T': [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2}, {x: 2, y: 2}],
    'U': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}],
    'V': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 0}, {x: 2, y: 0}],
    'W': [{x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 0}],
    'X': [{x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 1}],
    'Z': [{x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 0}],
    'S': [{x: 2, y: 2}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 0}],
    'Y': [{x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
    'A': [{x: 1, y: 2}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}],
}


class Shape{
    constructor(blocks){
        this.blocks = blocks;
    }

    checkInclusion(block) {
        return (this.blocks.filter(el => el.x == block.x && el.y == block.y).length > 0);
    }

    findEdges() {
        let edges = [];
        let directions = [{y: 1, x: 0, dir: 0}, {x: 1, y: 0, dir: 1}, {x: 0, y: -1, dir: 2}, {x: -1, y: 0, dir: 3}];

        this.blocks.forEach(block => {
            directions.forEach(direction => {
                let newBlock = {x: block.x + direction.x, y: block.y + direction.y};
                if (!this.checkInclusion(newBlock)) {
                    edges.push({x: block.x, y: block.y, dir: direction.dir});
                }
            })
        });

        return edges;
    }
}


rl.question('Input: ', (input) => {
    rl.close();

    let count = 0;
    let shapes = input.split('');

    let shapeA = new Shape(possibleShapes[shapes[0]]);
    let shapeB = new Shape(possibleShapes[shapes[1]]);

    let shapeAEdges = shapeA.findEdges();
    let shapeBEdges = shapeB.findEdges();

    let listOfShapes = [];

    for (let a = 0; a < shapeAEdges.length; a++) {
        for (let b = 0; b < shapeBEdges.length; b++) {
            if (((shapeAEdges[a].dir + shapeBEdges[b].dir) % 2 === 0) && shapeAEdges[a].dir !== shapeBEdges[b].dir) {
                let collisionCheck = CheckCollision(shapeA, shapeB, shapeAEdges[a], shapeBEdges[b]);
                if (collisionCheck !== false) {
                    let total = 0;
                    let itemsIncluded = 0;

                    collisionCheck.forEach(point => {
                        if (listOfShapes.filter(el => el.x === point.x && el.y === point.y).length >= 1) {
                            itemsIncluded++;
                        }
                        total++;
                    })


                    if (total != itemsIncluded) listOfShapes.push(collisionCheck);
                }
            }
        }
    }

    console.log(listOfShapes.length);
})

function CheckCollision(shapeA, shapeB, shapeAEdge, shapeBEdge) {
    const calcPos = (edge) => {
        let shapePos = {x: 0, y: 0};
        if (edge.dir == 0) { 
            shapePos.y -= 1;
        } else if (edge.dir == 1) {
            shapePos.x -= 1;
        } else if (edge.dir == 2) {
            shapePos.y += 1;
        } else {
            shapePos.x += 1;
        }

        return shapePos;
    }

    const transform = (edge, pos, shape) => {
        let xDiff = edge.x - pos.x;
        let yDiff = edge.y - pos.y;
        let positions = [];

        shape.blocks.forEach(pos => {
            positions.push({x: pos.x - xDiff, y: pos.y - yDiff});
        })

        return positions;
    }
    
    let shapeAPos = calcPos(shapeAEdge);
    let shapeBPos = {x: 0, y: 0};

    let positionsA = transform(shapeAEdge, shapeAPos, shapeA);
    let positionsB = transform(shapeBEdge, shapeBPos, shapeB);

    for (let a of positionsA) {
        for (let b of positionsB) {
            if (a.x === b.x && a.y === b.y) return false;
        }
    }


    let mergedPos = [];

    positionsA.forEach(pos => {
        mergedPos.push({x: pos.x, y: pos.y});
    })

    positionsB.forEach(pos => {
        mergedPos.push({x: pos.x, y: pos.y});
    })

    let minX = mergedPos[0].x;
    let minY = mergedPos[0].y;

    mergedPos.forEach(el => {
        if (minX > el.x) minX = el.x; 
        if (minY > el.y) minY = el.y;  
    })

    for (let i = 0; i < mergedPos.length; i++) {
        mergedPos[i].x -= minX;
        mergedPos[i].y -= minY;
    }


    // for (let y = 5; y >= -5; y--) {
    //     let currentLine = ""
    //     for (let x = -5; x <= 5; x++) {
    //         if (positionsA.filter(el => el.x === x && el.y === y).length >= 1 && positionsB.filter(el => el.x === x && el.y === y).length >= 1) {
    //             currentLine += 'X';
    //         } else if (positionsA.filter(el => el.x === x && el.y === y).length >= 1) {
    //                 currentLine += 'A'
    //         } else if (positionsB.filter(el => el.x === x && el.y === y).length >= 1) {
    //             currentLine += 'B'
    //         } else {
    //             currentLine += "~"
    //         }
    //     }
    //     console.log(currentLine);
    // }

    return mergedPos;
}