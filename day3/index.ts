import fs from 'fs';
import readline from 'readline';

(async () => {
    const isPart1 = false;

    const fileStream = fs.createReadStream('./day3/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let sum = 0;

    // used for part2
    let groupIncrement = 0;
    let groupBadgeCandidates = new Map<string, number>();

    for await (const line of rl) {

        if (isPart1) {

            let rucksack1 = line.substring(0, line.length / 2).split('');
            let rucksack2 = line.substring(line.length / 2).split('');

            let badge = rucksack2.find(x => rucksack1.includes(x)) || '';

            // -96 and -64 are the ASCII offset; +26 is the puzzle's capital letter value offset
            sum += badge.charCodeAt(0) + (badge === badge.toLowerCase() ? -96 : -64 + 26);

        } else {

            const rucksack = line.split('');
            const rucksackBadgeCandidates = new Map<string, number>();

            rucksack.forEach(x => {
                rucksackBadgeCandidates.set(x, 1);
            });

            rucksackBadgeCandidates.forEach((v, k) => {
                // @ts-ignore (https://github.com/microsoft/TypeScript/issues/9619)
                groupBadgeCandidates.set(k, groupBadgeCandidates.has(k) ? groupBadgeCandidates.get(k) + v : v);
            })

            groupIncrement++;

            if (groupIncrement >= 3) {
                for (const [k, v] of groupBadgeCandidates.entries()) {
                    if (v === 3) {
                        // -96 and -64 are the ASCII offset; +26 is the puzzle's capital letter value offset
                        sum += k.charCodeAt(0) + (k === k.toLowerCase() ? -96 : -64 + 26);
                        break;
                    }
                }
                groupIncrement = 0;
                groupBadgeCandidates = new Map<string, number>();
            }
        }
    }
    console.log(sum);
})()