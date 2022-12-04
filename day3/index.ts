import fs from 'fs';
import readline from 'readline';

(async () => {
    const isPart1 = false;

    const fileStream = fs.createReadStream('./day3/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let i = 1;
    let sum = 0;
    for await (const line of rl) {

        let bag1 = line.substring(0, line.length/2).split('');
        let bag2 = line.substring(line.length/2).split('');

        let item = bag2.find( x => {
            let foo = bag1.includes(x)
            return foo;
        }) || '';

        let val = 0;
        if( item === item.toLowerCase()) {
            val = item.charCodeAt(0)-96;
        } else {
            val = item.charCodeAt(0)-64 + 26;
        }

        console.log(i++ + ' ' + item + ' ' + val);
        // mconsole.log(item.charCodeAt(0) + '\n');

        sum += val;

    }

    console.log(sum);
})()