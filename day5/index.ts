import fs from 'fs';
import readline from 'readline';

(async () => {
    const isPart1 = false;

    const fileStream = fs.createReadStream('./day5/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let stack: Array<Array<string>> = [];
    let isStackBuilt = false;
    for await (const line of rl) {

        // Break out of the stack/create generation loop once the last stack/crate line is read
        if (line.length === 0) {
            isStackBuilt = true;
        }

        // First build out the stack/crate data structure
        else if (!isStackBuilt) {

            // Create an empty row of stacks
            if (stack.length === 0) {

                // Note: +1 added to line length to account for non-zero based iteration.
                for (let i = 0; i < (line.length / 4) + 1; i++) {
                    stack.push([]);
                }
            }

            let stackIterator = 0;

            for (let i = 0; i < line.length; i++) {

                // Begin to break out of the stack/create generation loop once the last stack/crate line is detected
                if (line.charAt(1) === '1') {
                    break;
                }

                // The format of each crate within is stack is a size of 4 characters
                const crateIterator = i % 4;

                if (crateIterator === 0) {
                    // Increment the amount of stacks for this row once the crate is all done for the stack
                    stackIterator++;
                }

                    // else if (crateIterator === 2 || crateIterator === 3) {
                    // do nothing
                // }

                else if (crateIterator === 1) {
                    // Only do processing on the stack if the crate exists
                    if (line[i] !== ' ') {
                        stack[stackIterator].unshift(line[i]);
                    }
                }
            }
        } else {

            const [, quantity, , from, , to] = line.split(' ').map(Number);

            if (isPart1) {
                for (let i = 0; i < quantity; i++) {
                    stack[to].push(stack[from].pop() || '');
                }
            } else {
                let crates: Array<string> = [];
                for (let i = 0; i < quantity; i++) {
                    crates.unshift(stack[from].pop() || '');
                }
                stack[to] = [...stack[to], ...crates];
            }

        }

    }
    
    //Remove the zero-based empty array at index zero from the display; 
    stack.shift();

    console.log(stack.reduce(
        (previousValue, currentValue) =>
            previousValue + currentValue.pop()
        , ''));

})()