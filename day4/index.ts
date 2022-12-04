import fs from 'fs';
import readline from 'readline';

(async () => {
    const isPart1 = false;

    const fileStream = fs.createReadStream('./day4/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let sum = 0;

    for await (const line of rl) {

        const [range1, range2] = line.split(',');
        const [range1_begin, range1_end] = range1.split('-').map(Number);
        const [range2_begin, range2_end] = range2.split('-').map(Number);

        if (isPart1) {

            if ((range1_begin <= range2_begin && range1_end >= range2_end) ||
                range1_begin >= range2_begin && range1_end <= range2_end) {
                sum++;
            }

        } else {
            if ((range1_begin <= range2_begin && range1_end >= range2_begin) ||
                (range1_end >= range2_end && range1_begin <= range2_end) ||
                (range1_begin >= range2_begin && range1_end <= range2_end)) {
                sum++;
            }
        }
    }
    console.log(sum);
})()