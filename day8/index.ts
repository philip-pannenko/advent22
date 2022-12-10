import fs from 'fs';
import readline from 'readline';

(async () => {

    const fileStream = fs.createReadStream('./day8/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    interface Tree {
        top?: Tree;
        bottom?: Tree;
        left?: Tree;
        right?: Tree;
        height: number;
    }

    // Linked list of all the trees
    let forest = new Array<Array<Tree>>();

    let row = 0;
    for await (const line of rl) {

        forest.push(new Array<Tree>());

        line.split('').map(Number).forEach((treeHeight, column) => {

            let tree: Tree = {height: treeHeight};

            let top, left;
            if (row !== 0) {
                top = forest[row - 1][column];
                top.bottom = tree;
                tree.top = top;
            }

            if (column !== 0) {
                left = forest[row][column - 1];
                left.right = tree;
                tree.left = left;
            }

            forest[row].push(tree);

        });

        row++;

    }

    // Check for visibility
    let result = forest.map(forestRow => {
        return forestRow.filter(tree => {

            // Make sure all directions are visible
            return ['left', 'right', 'top', 'bottom'].some(dir => {

                // @ts-ignore
                let neighbor = tree[dir];
                while (neighbor !== undefined) {
                    if (neighbor.height >= tree.height) {
                        // Break since this tree is hidden from this direction
                        return false;
                    }
                    neighbor = neighbor[dir];
                }
                return true;
            });
        });
    })
    
    console.log(result.reduce((cumulativeValue, forestRow) => cumulativeValue + forestRow.length, 0));
    
})()