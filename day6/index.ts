import fs from 'fs';
import readline from 'readline';

(async () => {
    
    const fileStream = fs.createReadStream('./day6/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let startOfPacketMarkerBuffer: Array<string> = new Array<string>();
    let startOfPacketMarkerBufferHash: Map<string, number> = new Map<string, number>();
    let startOfPacketMarker = 0;
    
    for await (const line of rl) {

        for (let i = 0; i < line.length; i++) {
            let character = line[i];

            startOfPacketMarkerBuffer.push(character);

            if (startOfPacketMarkerBuffer.length === 5) {

                // Remove the first value from the array buffer
                let charToRemove = startOfPacketMarkerBuffer.shift();

                // @ts-ignore grab the count that represent the amount of times a character exists in the active buffer
                let charToRemoveCount = startOfPacketMarkerBufferHash.get(charToRemove);

                // @ts-ignore the count is always NON-ZERO for items that exists in the active buffer;
                startOfPacketMarkerBufferHash.set(charToRemove, charToRemoveCount - 1);

                // @ts-ignore if the count is ZERO then remove the entry from the hashset
                if (startOfPacketMarkerBufferHash.get(charToRemove) === 0) {
                    // @ts-ignore 
                    startOfPacketMarkerBufferHash.delete(charToRemove);
                }
            }

            // @ts-ignore (one-liner map initiation / increment)
            startOfPacketMarkerBufferHash.set(character, startOfPacketMarkerBufferHash.get(character) + 1 || 1);

            // Look for uniqueness only once the buffer size has been reached
            if (startOfPacketMarkerBufferHash.size === 4) {

                // Convert from zero based to one based for the answer and break out of the loop since the answer has been found
                startOfPacketMarker = i + 1;
                break;

            }

        }

        if (startOfPacketMarker) {
            break;
        }
    }

    console.log(startOfPacketMarker);

})()