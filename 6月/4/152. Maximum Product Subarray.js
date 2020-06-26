/**
 * Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

Example 1:

Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-product-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
// 思路一：暴力法 时间复杂度：O(n^2) 空间复杂度 O(1) 
var maxProduct = function(nums) {
    let max = -Infinity;
    for(let i = 0; i <nums.length;++i){
        let curTotal = 1;
        for(let j = i; j < nums.length; ++j){
            curTotal = curTotal * nums[j];
            max = Math.max(max,curTotal)
        }
    }
    return max
}
// 思路二： 动态规划
// 根据 正负性来分类讨论
// depMin[i] = min{nums[i],depMin[i-1]*nums[i],depMax[i-1] * nums[i]}
// depMax[i] = max(nums[i],depMin[i-1]*nums[i],depMax[i-1] * nums[i])


var maxProduct = function(nums) {
    const depMin = nums.slice();
    const depMax = nums.slice();
    for(let i = 1; i < nums.length;++i){
        depMin[i] = Math.min(nums[i],depMin[i-1]*nums[i],depMax[i-1] * nums[i])
        depMax[i] = Math.max(nums[i],depMin[i-1]*nums[i],depMax[i-1] * nums[i])
    }
    return Math.max(...depMax)
}

// 时间复杂度 O(n) 空间复杂度 0(2n)

// 思路三： 动态规划优化

var maxProduct = function(nums) {
    let min,max,cacheMin,cacheMax,result;
    result =  min = max = nums[0]
    for(let i = 1; i < nums.length;++i){
        
        cacheMin = Math.min(nums[i],min *nums[i],max*nums[i] )
        cacheMax = Math.max(nums[i],min *nums[i],max*nums[i] )

        min = cacheMin;
        max = cacheMax;
        result = Math.max(max,result)
    }
    return result
}

console.log(maxProduct([2,3,-2,4]));

// 6

console.log(maxProduct([-2,0,-1]));

// 0