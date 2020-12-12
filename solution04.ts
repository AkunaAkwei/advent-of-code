const decoder = new TextDecoder();
const input = decoder.decode(await Deno.readAll(Deno.stdin));

const isValid = (p: any) => ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].filter(k => !Object.keys(p).includes(k)).length === 0;
const passports = input.split(/\s{2}/).map(p => p.split(/\s/).map(e => {
    const [key, value] = e.split(':');
    return {[key]: value};
}).reduce((acc, cur) => ({...acc, ...cur}), {}));

console.log('PART 1: ', passports.filter(p => isValid(p)).length);

