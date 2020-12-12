const decoder = new TextDecoder();
const input = decoder.decode(await Deno.readAll(Deno.stdin));
const rows = input.split('\n');

const slope = (right: number, down: number): number => {
    const isTree = (c: string) => c === '#';

    let row = 0;
    let col = 0;
    let count = 0;
    while (row < rows.length) {
        if (isTree(rows[row][col])) {
            count++;
        }
        col = (col + right) % rows[row].length;
        row += down;
    }
    return count
}

console.log('PART 1: ', slope(3, 1));
console.log('PART 2: ', slope(1, 1) * slope(3, 1) * slope(5, 1) * slope(7, 1) * slope(1, 2));
