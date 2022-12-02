import fs from 'fs';
import readline from 'readline';

(async () => {

    const fileStream = fs.createReadStream('./day1/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let max: number[] = [];
    let sum = 0;

    // added two extra whitespaces to the input to account for the last line.
    for await (const line of rl) {
        if (line.length != 0) {
            sum += parseInt(line);
        } else {
            max.push(sum)
            max = max.sort((a, b) => a - b);
            if (max.length > 3) max.shift();
            sum = 0;
        }
    }
    console.log(max.reduce((accumulator, currentValue) => accumulator + currentValue));
})()