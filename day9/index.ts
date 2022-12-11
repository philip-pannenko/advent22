import fs from 'fs';
import readline from 'readline';

(async () => {

    const fileStream = fs.createReadStream('./day9/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    interface Rope {
        x: number;
        y: number;
    }

    let headRope = Array<Rope>({x: 0, y: 0});
    let tailRope = Array<Rope>({x: 0, y: 0});
    let tailRoute = new Set<string>([tailRope[0].x + '-' + tailRope[0].y]);

    for await (const line of rl) {
        let [dir, distance_s] = line.split(' ');
        let distance = Number.parseInt(distance_s);

        for (let i = 0; i < distance; i++) {
            let x: number = 0;
            let y: number = 0;

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

            // Grab the most recent x/y coordinates and create a new placement
            //  onto which to increment by.
            let currentHead = headRope[headRope.length - 1];

            let nextHead = {...currentHead};
            nextHead.x += x;
            nextHead.y += y;

            headRope.push(nextHead);

            let currentTail = tailRope[tailRope.length - 1];
            if (Math.abs(nextHead.x - currentTail.x) === 2 ||
                Math.abs(nextHead.y - currentTail.y) === 2) {

                let nextTail = {...currentTail};
                nextTail.x = currentHead.x;
                nextTail.y = currentHead.y;

                tailRope.push(nextTail);

                tailRoute.add(nextTail.x + '-' + nextTail.y);

            }

        }

    }

    console.log(tailRoute.size);
})()