const decoder = new TextDecoder();
const input = decoder.decode(await Deno.readAll(Deno.stdin));

interface Policy {
    min: number;
    max: number;
    char: string;
};

interface Row {
    policy:Policy;
    pass: string;
};


const rows: Row[] = input.split('\n').map(l => {
    const [policy, pass] = l.split(': ');
    const [amount, char] = policy.split(' ');
    const [min, max] = amount.split('-');

    return {
        policy: {
            min: Number(min),
            max: Number(max),
            char: char || ''
        },
        pass: pass || ''
    };
});

const part1 = rows.filter(r => {
    const count = r.pass.match(RegExp(r.policy.char, 'g'))?.length || 0;
    return count >= r.policy.min && count <= r.policy.max;
});

const part2 = rows.filter(r => {
    return (r.pass[r.policy.min - 1] === r.policy.char) !== (r.pass[r.policy.max - 1] === r.policy.char)
})

console.log('PART 1: ', part1.length);
console.log('PART 2: ', part2.length);
