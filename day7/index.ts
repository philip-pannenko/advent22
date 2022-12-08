import fs from 'fs';
import readline from 'readline';

interface Directory {
    name: string;
    size: number;
    contents: Array<Directory | File>;
}

interface File {
    name: string;
    size: number;
}

(async () => {

    const fileStream = fs.createReadStream('./day7/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    // Store the entire tree
    let directoryTree: Directory = {name: '/', size: 0, contents: []};

    // Create an N(0) lookup for each directory.
    // Each key will have a unique prefix associated with parent directory names.
    //  The value will be a pointer to the directory tree.
    let directoryTreeHash = new Map<string, Directory>([['/', directoryTree]]);

    // Stack of current depth with a direct pointer to the directory tree.
    let currentDirectoryStack: Array<Directory> = [];
    let currentDirectoryStackPrefix = '';

    // Used for calculating sum for a directory
    let directorySum = 0;

    // Determines if calculating a sum is needed
    let isLSMostRecent = false;

    let calculateDirectorySize = () => {
        if (isLSMostRecent) {
            currentDirectoryStack.forEach(directory => {
                directory.size += directorySum;
            })
            directorySum = 0;
            isLSMostRecent = false;
        }
    }

    for await (const line of rl) {

        if (line.charAt(0) === '$') {

            calculateDirectorySize();

            if (line === "$ cd ..") {
                let dir = currentDirectoryStack.pop();
                // @ts-ignore
                currentDirectoryStackPrefix = currentDirectoryStackPrefix.slice(0, -(dir.name.length));
            } else if (line.startsWith("$ cd")) {
                // @ts-ignore
                currentDirectoryStack.push(directoryTreeHash.get(currentDirectoryStackPrefix + line.substring(5)));
                currentDirectoryStackPrefix += line.substring(5);
            } else if (line === "$ ls") {
                isLSMostRecent = true;
            }
        } else {
            let currentDirectory = currentDirectoryStack[currentDirectoryStack.length - 1];
            let content: File | Directory;
            if (line.startsWith('dir')) {
                let name = line.substring(4);
                content = {name: name, size: 0, contents: []};
                directoryTreeHash.set(currentDirectoryStackPrefix + name, content);

            } else {
                let [size, name] = line.split(' ');
                content = {name: name, size: Number.parseInt(size)};
                directorySum += Number.parseInt(size);
            }

            currentDirectory.contents.push(content);
        }
    }

    calculateDirectorySize();

    console.log(Array.from(directoryTreeHash.values()).reduce(
        (sum, directory) =>
            directory.size < 100000 ? sum + directory.size : sum, 0));

})()