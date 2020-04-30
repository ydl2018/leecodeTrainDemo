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
var waysToChange = function (n) {
    const unitArr =[25,10,5,1];
    // f[i][v] = f[i - 1][v - 0*c[i]] +f[i-1][v - c[i]] ... f[i-1][v - k*c[i]] (k = |v/c[i]|)
    // f[i][v - c[i]] = f[i-1][v - c[i]] +...+ f[i-1][v - k*c[i]] (k = |v/c[i]|)
    // => f[i][v] = f[i-1][v] + f[i][v - c[i]]

    // 时间复杂度优化
    // f[i][n]是由f[i-1][n]和f[i][n - c[i]] 组成的，也就是取不取第i种硬币
    // => f[i][v] = f[i][v- c[i]]+f[i-1][v]
    
    // 空间复杂度优化

    // 由于 v是不断往前遍历，此时f[i][v - c[i]] 是已经更新的值
    // 而 f[i-1][v] 是还没有更新f[i][v] 的值
    // 那么就可以优化为1维
    // => f[v] =  f[v] + f[v - c[i]]
    // f[0] = 1
    // 1. 声明 dep
    // 初始值，因为f[n]是求表示法，所以 f[0]时，可以有一种表示法，就是 不投
    // f[1...n]因为无法确定，所以是0
    const dep = Array(n+1).fill(0);
    dep[0] = 1;

    for(let i = 0,len = unitArr.length ;i<len;i++){
        for(let v = unitArr[i];v<=n;v++){
            dep[v] = dep[v] + dep[ v - unitArr[i]]       
        }
    }
    return dep[n] % 1000000007

}
console.log(waysToChange(10));
