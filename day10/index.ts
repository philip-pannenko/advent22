import fs from 'fs';
import readline from 'readline';

(async () => {

    let debug1 = false;
    let debug2 = false;

    const fileStream = fs.createReadStream('./day10/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let cycle = 1;
    let sum = 0;

    let signalStrength = 1;
    for await (const line of rl) {

        let [instruction, value_s] = line.split(' ');
        let value = Number.parseInt(value_s) || 0;
        let executionTime = 0;

        if (instruction === 'noop') {
            executionTime = 1;
        } else if (instruction === 'addx') {
            executionTime = 2;
        }

        for (let i = 0; i < executionTime; i++) {

            if (debug1) console.log(`Start of cycle ${cycle} for ${line}`);

            if (debug1) console.log(`During cycle ${cycle}, X = ${signalStrength}`)

            if (cycle === 20 || ((cycle - 20) % 40 === 0)) {
                if (debug2) console.log(`** Recording signal strength of ${signalStrength * cycle}`);
                sum += signalStrength * cycle;
            }

            cycle++;

            if (debug1 && i + 1 != executionTime) console.log(`End of cycle ${cycle} for ${line}`);
        }

        signalStrength += value;

        if (debug1) console.log(`End of cycle ${cycle}, X = ${signalStrength}`)

    }

    console.log(sum);

})()