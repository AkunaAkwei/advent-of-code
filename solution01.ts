const decoder = new TextDecoder();
const input = decoder.decode(await Deno.readAll(Deno.stdin));

const numbers: number[] = input.split('\n').map(s => Number(s));

const pairs = [];
for (const a of numbers) {
    for (const b of numbers) {
        pairs.push([a, b]);
    }
}

const tuples = [];
for (const a of numbers) {
    for (const b of numbers) {
        for (const c of numbers) {
            tuples.push([a, b, c]);
        }
    }
}

const sum2020 = (p: number[]) => p.reduce((acc: number, cur: number) => acc + cur, 0) === 2020;
const product = (acc: number, curr: number) => acc * curr;

console.log('PART 1: ', pairs.filter(sum2020).shift()?.reduce(product, 1));
console.log('PART 2: ', tuples.filter(sum2020).shift()?.reduce(product, 1));
