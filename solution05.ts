const decoder = new TextDecoder();
const input = decoder.decode(await Deno.readAll(Deno.stdin));

const passes = input.split('\n');

function parse(input: string, lowerChar: string, upperChar: string): number {
    if (!input) return 0;
    if (!lowerChar) return 0;
    if (!upperChar) return 0;

    let lower = 0;
    let upper = (1 << input.length) - 1;
    const length = () => upper - lower;
    for (const c of input) {
        switch (c) {
            case lowerChar: upper -= (length() >> 1) + 1; break;
            case upperChar: lower += (length() >> 1) + 1; break;
            default: throw `unknown character '${c}'`; 
        }
    }

    if (lower !== upper) {
        throw `something went wrong: calculated ${lower} - ${upper} for ${input}`;
    }
    return lower;
}
const part1 = passes.map(p => (parse(p.substring(0, 7), 'F', 'B') * 8) + parse(p.substring(7, 11), 'L', 'R'));
console.log('PART 1: ', part1.sort((a, b) => Number(b) - Number(a)).shift());
