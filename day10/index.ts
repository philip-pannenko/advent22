import fs from 'fs';
import readline from 'readline';

(async () => {

    let isPart1 = true;
    let debug1 = false;
    let debug2 = false;

    const fileStream = fs.createReadStream('./day10/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let cycle = 1;
    let result: number | string = isPart1 ? 0 : '';

    let signalStrength = 1;

    let crtCycle = 0;
    let crt = new Array<string>(40);

    let sprite = new Array<string>(40).fill('.');
    sprite[0] = '#';
    sprite[1] = '#';
    sprite[2] = '#';

    if (!isPart1 && debug1) console.log(`Sprite position\t : ${sprite.reduce((pv, cv) => pv + cv, '')}\n`);

    for await (const line of rl) {

        let [instruction, value_s] = line.split(' ');
        let value = Number.parseInt(value_s) || 0;
        let executionTime = 0;

        if (instruction === 'noop') {
            executionTime = 1;
        } else if (instruction === 'addx') {
            executionTime = 2;
        }

        if (debug1) console.log(`Start cycle\t${cycle}: begin execution ${line}`);

        for (let i = 0; i < executionTime; i++) {

            if (isPart1) {

                if (debug1) console.log(`During cycle\t${cycle}: (Register X starts at ${signalStrength})`)

                if (cycle === 20 || ((cycle - 20) % 40 === 0)) {
                    if (debug2) console.log(`** Recording signal strength of ${signalStrength * cycle}`);
                    result = <number>result + (signalStrength * cycle);
                }
            }

            if (!isPart1) {

                if (crtCycle % 40 === 0) {
                    result += crt.reduce((pv, cv) => pv + cv, '') + '\n';
                }

                crtCycle = crtCycle % 40;
                crt[crtCycle] = sprite.some((val, i) => val === '#' && crtCycle === i) ? '#' : '.';

                if (debug1) console.log(`During cycle\t${cycle}: CRT draws pixel in position ${crtCycle}`);
                if (debug1) console.log(`Current CRT row\t : ${crt.reduce((pv, cv) => pv + cv, '')}`);

            }

            if (i + 1 === executionTime) {
                signalStrength += value;

                sprite.fill('.');
                sprite[signalStrength - 1] = '#';
                sprite[signalStrength] = '#';
                sprite[signalStrength + 1] = '#';

                if (debug1) console.log(`End of cycle\t${cycle}: finish executing ${line} (Register X is now ${signalStrength})`);
                if (!isPart1 && debug1) console.log(`Sprite position\t : ${sprite.reduce((pv, cv) => pv + cv, '')}\n`);
            } else {
                if (!isPart1 && debug1) console.log('');
            }

            crtCycle++;
            cycle++;

        }

    }

    if (!isPart1) {
        result += crt.reduce((pv, cv) => pv + cv, '') + '\n';
    }

    console.log(result);

})()