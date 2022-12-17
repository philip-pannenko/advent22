import fs from 'fs';
import readline from 'readline';

(async () => {

    let isPart1 = false;
    let debug1 = false;
    let debug2 = false;

    const fileStream = fs.createReadStream('./day9/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    interface Coordinates {
        id: string; // simply for troubleshooting
        x: number;
        y: number;
    }

    let knotLength = isPart1 ? 1 : 9;
    let headKnot: Coordinates = {id: 'H', x: 0, y: 0};
    let knots: Array<Coordinates> = [];

    for (let i = 0; i < knotLength; i++) {
        knots.push({id: (i + 1).toString(), x: 0, y: 0});
    }

    let tailRoute = new Set<string>([headKnot.x + ',' + headKnot.y]);
    if (debug2) console.log(`Tail Route: ${headKnot.x},${headKnot.y}`);

    for await (const line of rl) {
        let [dir, distance_s] = line.split(' ');
        let distance = Number.parseInt(distance_s);

        if (debug1) console.log(`Performing Move ${line}`);

        for (let i = 0; i < distance; i++) {

            if (debug1) console.log(` Move ${line} - (${i})`);

            let x: number = 0;
            let y: number = 0;

            // Determine the movement coordinate
            switch (dir) {
                case 'R':
                    x = 1;
                    break;
                case 'L':
                    x = -1;
                    break;
                case 'U':
                    y = 1;
                    break;
                case 'D':
                    y = -1;
                    break;
            }

            // Update the new knot coordinate as the one to have the following knot to compare against
            let previousKnotPreMove = {...headKnot};
            let previousKnotPostMove = headKnot;

            // Move the knot to the new coordinates
            headKnot.x += x;
            headKnot.y += y;

            if (debug1) console.log(`  Moving Knot ${headKnot.id} from ${previousKnotPreMove.x}-${previousKnotPreMove.y} to ${headKnot.x}-${headKnot.y}`)

            // Go through each knot and make modifications based on the previousKnot(Pre|Post)Moves
            knots.forEach((knot, i) => {

                // Duplicate the knot coordinates
                let currentKnotMove = {...knot};

                // Move the current knot diagonally
                if (Math.abs(currentKnotMove.y - previousKnotPostMove.y) == 2 &&
                    Math.abs(currentKnotMove.x - previousKnotPostMove.x) == 2) {
                    currentKnotMove.x = previousKnotPreMove.x;
                    currentKnotMove.y = previousKnotPreMove.y;
                }

                // Move the current knot horizontally
                else if (Math.abs(currentKnotMove.y - previousKnotPostMove.y) == 2) {
                    currentKnotMove.x = previousKnotPostMove.x;
                    currentKnotMove.y = previousKnotPreMove.y;
                }

                // Move the current knot vertically
                else if (Math.abs(currentKnotMove.x - previousKnotPostMove.x) == 2) {
                    currentKnotMove.x = previousKnotPreMove.x;
                    currentKnotMove.y = previousKnotPostMove.y;
                }

                if (debug1) console.log(`  Moving Knot ${currentKnotMove.id} from ${knots[i].x}-${knots[i].y} to ${currentKnotMove.x}-${currentKnotMove.y}`)

                // Overwrite the current knot array reference with the current knot coordinate modifications
                knots[i] = currentKnotMove;

                // Update the new knot coordinate as the one to have the following knot to compare against
                previousKnotPreMove = knot;
                previousKnotPostMove = currentKnotMove;

                // We're at the tail. Record the coordinates!
                if (i === knotLength - 1 && !tailRoute.has(currentKnotMove.x + ',' + currentKnotMove.y)) {
                    if (debug2) console.log(`Tail Route: ${currentKnotMove.x},${currentKnotMove.y}`);
                    tailRoute.add(currentKnotMove.x + ',' + currentKnotMove.y);
                }
            });
        }
    }

    console.log(tailRoute.size);
})()