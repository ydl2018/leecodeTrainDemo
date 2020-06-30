/**
 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
 要求时间复杂度为O(n)。

 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
 输出: 6
 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 **/

//
//  如果f[i-1]>=0 f[i] =  f[i-1] + nums[i]
// 如果f[i-1]<0 f[i] = nums[i]

// 优化空间复杂度
var maxSubArray = function(nums) {
    //
    let res = -Infinity;
    let cur = nums[0], prev = 0;
    for(let i = 0 ;i < nums.length;i++){
        cur  = prev > 0 ? prev + nums[i] : nums[i];
        prev = cur;
        res = Math.max(res,cur)
    }
    return res
};
console.log(maxSubArray([-1]));
