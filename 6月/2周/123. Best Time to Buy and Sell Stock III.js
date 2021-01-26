/**
 * Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before1.25 you buy again).

Example 1:

Input: [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
             Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
Example 2:

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before1.25 buying again.
Example 3:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.

 */

/**
* @param {number[]} prices
* @return {number}
*/
var maxProfit = function (prices) {
    // 维护栈
    const stacks = [];
    // 维护一个最大金额值
    let resMax = 0;

    const backtrack = (start) => {
        if (stacks.length > 0 && stacks.length % 2 == 0) {
            resMax = Math.max(stacks.reduce((prev, cur, i) => i % 2 == 0 ? (prev - cur) : (prev + cur), 0), resMax)
        }
        if (start === prices.length || stacks.length === 4) {
            return
        }
        for (let i = start; i < prices.length; i++) {
            if (stacks.length % 2 === 0) { // 可以买入
                stacks.push(prices[i])
                backtrack(i + 1)
                stacks.pop();

            } else { // 可以卖出
                if (stacks[stacks.length - 1] < prices[i]) { // 高价卖出
                    stacks.push(prices[i])
                    backtrack(i + 1)
                    stacks.pop();
                }
            }
        }
    }
    backtrack(0);


    return resMax;
};
console.log(maxProfit([1, 2, 3, 4, 5]));
console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
var maxProfit = function (prices) {
    let len = prices.length;
    // 拆分为一维股票问题的子问题
    let max = 0;

    // 设置缓存
    let cacheLeft = 0, cacheRight = 0;
    const getMaxProfit = (start, end) => {
        if (start > end) {
            return 0
        }
        let min = prices[start];
        let profit = 0;
        for (let i = start; i <= end; i++) {
            if (prices[i] < min) {
                min = prices[i]
            } else {
                profit = Math.max(profit, prices[i] - min)
            }
        }
        return profit;
    }
    for (let i = 0; i < len; i++) {
        let left, right;
        if (prices[i] < prices[i - 1]) {
            left = cacheLeft;
        } else {
            left = getMaxProfit(0, i)
        }
        if (prices[i] > prices[i + 1]) {
            right = cacheRight;
        } else {
            right = getMaxProfit(i + 1, len - 1)
        }
        max = Math.max((left + right), max)
        cacheLeft = left;
        cacheRight = right;
    }
    return max
}

// 动态规划

// 最大利润与天数i有关，与最大买卖次数k有关，与此时是否持有l有关

// l 0代表不持有 1代表持有

// dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1] + prices[i])
// dp[i][k][1] = max(dp[i-1][k][1],dp[i-1][k-1] - prices[i])

// border condition
// i == 0
// dep[i][k][0] = 0; dep[i][k][1] = -prices[i]

// k = 0
// dep[i][k][0] = 0
// dep[i][k][1] = -Infinity

var maxProfit = function (prices) {
    const dp = Array.from({ length: prices.length}, (_, i) => Array.from({ length: 3 }, (_, k) => Array.from({ length: 2 })))
    const max = Math.max;
    for (let i = 0; i < prices.length; ++i) {
        for (let k = 0; k <= 2; ++k) {
            for (let l = 0; l < 2; ++l) {
                if(k == 0){
                    dp[i][k][0] = 0
                    dp[i][k][1] = -Infinity
                    continue
                }
                if(i == 0){
                    dp[i][k][0] = 0;
                    dp[i][k][1] = -prices[i]
                    continue;
                }
                dp[i][k][0] = max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
                dp[i][k][1] = max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
            }
        }
    }
    return dp[prices.length-1][2][0]
}


console.log(maxProfit([1, 2, 3, 4, 5]));
console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
