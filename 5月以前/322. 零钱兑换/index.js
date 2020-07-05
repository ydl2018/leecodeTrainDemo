/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
示例 1:

输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1

示例 2:

输入: coins = [2], amount = 3
输出: -1
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/coin-change
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var coinChange = function(coins, amount) {
    // 分析
    // 1. 设不同面额的硬币数组为coins，i为coins 的下标， f[i][n]为
    //    存在i种硬币时，凑成总额度为n时的所需的最少的硬币个数
    // f[v] = min{f[v - c[i]],f[v-c[i-1]]...f[v-c[0]]}

    // 错误，求最小值，与i有关系吗，f[i][n] 与f[i-1][n]无关系
    // 错误，有关系！

    // f[i][n] = min{f[i-1][n - 0 * coins[i]]+0,f[i-1][n - 1 * coins[i]]+1...f[i-1][n - k * coins[i]]+k}    
    // k = |n / coins[i]|
   
    // 优化
    // 由f[i][n - coins[i]] = min{f[i-1][n - 1* coins[i]] +0, ...f[i-1][n - k * coins[i]]+k-1}
    // 得f[i][n] = min {f[i-1][n],f[i][n -coins[i]]+1}
    // =》
    // f[n] = min {f[n],f[n - coins[i]]}

    
    // 初始化
    // f[0] = 0

    // 这里错了，为什么初始值是0？ 这里求的是可以凑成总金额的最小硬币个数
    // 如果是0 是否会成立？答案是否定的，那么什么情况最合理，比总数还要多，其实
    // 这里并不严谨，硬币面值如果小于1呢？
    // 疑惑，改为Infinity

    

    // 初始化时，一定要注意，是否合理
    // f[0] = f
    // f[1,...n] = Infinity

    // // 正确做法：f[v] = min {f[v - c[n-1]]+1 , f[v - c[n-2]]+1 , f[v - c[0]]+1}
    // => f[v] = min {}
    // f[0] = 0
      // f[1,...n] = Infinity

    // 1.声明 dep,共有amount+1 种状态
    const dep = Array(amount+1).fill(Infinity)
    dep[0] = 0;
    for(let i = 0;i<coins.length;i++){
        for(let j = coins[i]; j < amount+1; j++){
            dep[j] = Math.min(dep[j],dep[j - coins[i]]+1)
        }
    } 
    return dep[amount] === Infinity ?  -1 : dep[amount]
};
console.log(coinChange([1, 2, 5],11))