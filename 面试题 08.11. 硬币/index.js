/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function (n) {
    let num = 0;
    for (let a = 0; a <= n / 25; a++) {
        const rest_a = n - 25 * a;
        if (rest_a === 0) {
            num++;
            break
        }
        for (let b = 0; b <= rest_a / 10; b++) {
            const rest_b = rest_a - 10 * b;
            if (rest_b === 0) {
                num++;
                break
            }
            for (let c = 0; c <= rest_b / 5; c++) {
                const rest_c = rest_b - 5 * c;
                if (rest_c === 0) {
                    num++;
                    break
                }
                for (let d = 0; d <= rest_c; d++) {
                    // console.log(rest_c);
                    const rest_d = rest_c - d;
                    if (rest_d === 0) {
                        num++;
                      break
                    }
                }
            }
        }
    }
    return num
};
console.log(waysToChange(5));

const fn = (type)=> `[object ${type.toUpperCase()}]`
const isType = type => target => `[object ${type.replace(/^\w/,(match=>match.toUpperCase()))}]` === Object.prototype.toString.call(target)
console.log(isType('Number')(Number(34)));

