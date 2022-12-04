import fs from 'fs';
import readline from 'readline';

(async () => {
    const isPart1 = false;

    const fileStream = fs.createReadStream('./day2/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let sum = 0;
    for await (const line of rl) {

        let [them_s, you_s] = line.split(' ');

        let them = them_s.charCodeAt(0) - 65;
        let you = (you_s.charCodeAt(0) - 65) % 23;

        if (isPart1) {
            sum += you + 1;

            // Draw
            if (them === you) {
                sum += 3
            }

            // They Lose
            else if ((them + 1) % 3 === you) {
                sum += 6;
            }

            // They Win
            else if ((them + 2) % 3 === you) {
                sum += 0;
            }

        } else {

            // Intend to draw
            if (you_s === 'Y') {
                sum += them + 1 + 3;
            }
            // Intend to lose
            else if (you_s === 'X') {
                sum += ((them + 2) % 3) + 1;
            }
            // Intend to win
            else if (you_s === 'Z') {
                sum += ((them + 1) % 3) + 1 + 6
            }
        }

    }

    console.log(sum);
})()