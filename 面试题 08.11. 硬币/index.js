/**
 * @param {number} n
 * @return {number}
 */
// 思路简单直接，可惜超出时间复杂度
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

// 思路二：利用递归去求出每一种情况
var waysToChange = function (n) {
    const unitArr =[25,10,5,1];
    let num = 0;
    const traverse = (cur)=>{
        if(cur === 0){
           return num++
        }else if(cur < 0){ // 防止减多的情况
            return
        }
        for(let i = 0,len = unitArr.length;i<len;i++){
            traverse(cur - unitArr[i])
        }
    }
    traverse(n)
    return num % 1000000007
}

// 思路三：背包问题

// unitArr 相当于每个包的体积，而总体积恒定，说明背包的体积恒定
// 原始问题是求出最大价值
// 我们是q
var waysToChange = function (n) {
    const unitArr =[25,10,5,1];


}
console.log(waysToChange(5));
