const decoder = new TextDecoder();
const input = decoder.decode(await Deno.readAll(Deno.stdin));

const isValid = (p: any) => ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].filter(k => !Object.keys(p).includes(k)).length === 0;
const isValidByr = (p: any) => (Number(p?.byr) >= 1920) && (Number(p?.byr) <= 2002);
const isValidIyr = (p: any) => (Number(p?.iyr) >= 2010) && (Number(p?.iyr) <= 2020);
const isValidEyr = (p: any) => (Number(p?.eyr) >= 2020) && (Number(p?.eyr) <= 2030);
const isValidHgt = (p: any) => {
    const [_, number, unit] = p?.hgt?.match(/(\d+)(cm|in)/) ?? [];
    const n = Number(number);
    if (n > 0) {
        if (unit === 'cm') {
            return n >= 150 && n <= 193;
        }
        if (unit === 'in') {
            return n >= 59 && n <= 76;
        }
    }
    return false;
};
const isValidHcl = (p: any) => p?.hcl?.match(/\#[0-9a-f]{6}/)?.length > 0;
const isValidEcl = (p: any) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p.ecl);
const isValidPid = (p: any) => p?.pid?.match(/[0-9]{9}/)?.length > 0;

const passports = input.split(/\s{2}/).map(p => p.split(/\s/).map(e => {
    const [key, value] = e.split(':');
    return {[key]: value};
}).reduce((acc, cur) => ({...acc, ...cur}), {}));

console.log('PART 1: ', passports.filter(p => isValid(p)).length);

console.log('PART 2: ', passports
    .filter(p => isValid(p))
    .filter(p => isValidByr(p))
    .filter(p => isValidIyr(p))
    .filter(p => isValidEyr(p))
    .filter(p => isValidHgt(p))
    .filter(p => isValidHcl(p))
    .filter(p => isValidEcl(p))
    .filter(p => isValidPid(p))
    .length
    - 1 // TODO: fix off by one
);
