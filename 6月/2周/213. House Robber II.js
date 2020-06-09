/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:

Input: [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
             because they are adjacent houses.
Example 2:

Input: [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 // 难点： 如何处理环形动态规划
 //  思路：拆分子问题,0->n-2 1 -> n-1

 var rob = function(nums) {
    // question : how to know the robber have stole the first room 
    // divide two quetions , 0 - n-1 and 1 - n,求出最大值
    return Math.max(fn(nums,0,nums.length-2),fn(nums,1,nums.length-1))
 
 };
 
 const fn = (nums,i,j)=>{
    let prev_1 = 0;
    let prev_2 = 0;
    let temp;
     for(; i <= j; i++){
         temp = prev_1;
         prev_1 = Math.max(prev_2+nums[i],prev_1);
         prev_2 = temp;
    }
    return prev_1
 }
console.log(rob([1,2,3,1]));
console.log(rob([2,3,2]));
