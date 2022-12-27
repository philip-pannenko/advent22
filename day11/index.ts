import fs from 'fs';
import readline from 'readline';

(async () => {

    let isPart1 = false;
    let debug1 = false;
    const fileStream = fs.createReadStream('./day11/input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    interface Monkey {
        id: number
        items: Array<number>
        operation: Function
        divisibleBy: number
        ifTrueMonkeyId: number
        ifFalseMonkeyId: number

    }

    let relief: number = isPart1 ? 3 : 1;
    let rounds = isPart1 ? 20 : 10000;

    let monkeys = new Array<Monkey>();
    let inspections = new Map<number, number>();

    let divisibility = 1;
    for await (const line of rl) {

        if (line.startsWith('Monkey')) {
            let monkey = {
                id: Number.parseInt(line.match(/[0-9]+/)![0]),
                items: new Array<number>(),
                operation: Function("return -1"),
                divisibleBy: -1,
                ifTrueMonkeyId: -1,
                ifFalseMonkeyId: -1
            };
            monkeys.push(monkey);
            inspections.set(monkey.id, 0);
        } else {
            let monkey = monkeys.at(-1);

            if (line.startsWith('  Starting items: ')) {
                monkey!.items = line.substring(18).split(', ').map(Number);
            } else if (line.startsWith('  Operation: new = ')) {
                monkey!.operation = Function("old", `return ${line.substring(18)}`);
            } else if (line.startsWith('  Test: divisible by ')) {
                monkey!.divisibleBy = Number.parseInt(line.substring(21))
                divisibility *= monkey!.divisibleBy;
            } else if (line.startsWith('    If true: throw to monkey ')) {
                monkey!.ifTrueMonkeyId = Number.parseInt(line.substring(29))
            } else if (line.startsWith('    If false: throw to monkey ')) {
                monkey!.ifFalseMonkeyId = Number.parseInt(line.substring(30))
            }
        }
    }

    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => {
            if (debug1) console.log(`Monkey ${monkey.id}`);
            monkey.items.forEach(item => {

                // Using the `divisibility` parameter only works because the
                //  "divisibility checks" in my input are all prime.
                // Effectively, the operations are all being performed on the remainder
                // TIL: https://en.wikipedia.org/wiki/Modular_arithmetic
                // Didn't know this until I got the answer and had to backtrack as to why it worked :upside_down_face
                let worryLevel = Math.floor((monkey.operation(item) / relief) % divisibility);

                if (debug1) console.log(`  Monkey inspects an item with a worry level of ${item}`);
                if (debug1) console.log(`    Worry level is (${monkey.operation.toString().split('\n')[2].substring(8)}) to ${worryLevel}.`)
                if (debug1) console.log(`    Monkey gets bored with item. Worry level is ${isPart1 ? "divided by 3  to" : ''} ${worryLevel}`)
                if (debug1) console.log(`    Current worry level is divisible by ${monkey.divisibleBy}.`)
                if (debug1) console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.ifTrueMonkeyId}.`)

                monkeys[worryLevel % monkey.divisibleBy === 0 ? monkey.ifTrueMonkeyId : monkey.ifFalseMonkeyId].items.push(worryLevel)
                inspections.set(monkey.id, inspections.get(monkey.id)! + 1);
            });
            monkey.items = [];
        })
    }
    if (debug1) inspections.forEach((value, key) => console.log(`Monkey ${key} inspected items ${value} times.`));

    console.log(Array.from(inspections.values())
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((pv, cv) => pv * cv));


})()