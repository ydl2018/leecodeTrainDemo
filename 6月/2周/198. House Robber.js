/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

0 <= nums.length <= 100
0 <= nums[i] <= 400

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // i >= 2
    // dep[i] = max{dep[i-2]+nums[i],dep[i-1]}
    // i = 1
    // dep[i] = max{nums[i],dep[i-1]} 
    // i = 0
    // dep[i] = nums[i]
   
   //  const dep = [];

    // for(let i = 0; i < nums.length; i++ ){
    //         if(i == 0){
    //             dep[i] = nums[i]
    //         }else if(i == 1){
    //             dep[i] = Math.max(nums[i],dep[i-1])
    //         }else{
    //             dep[i] = Math.max(dep[i-2]+nums[i],dep[i-1])
    //         }
    //     }
    // return dep[dep.length-1] || 0

    // 优化1：扩展dep
    // 
    // const dep = Array.from({length:nums.length+2},()=>0);

    // for(let i  = 2; i < nums.length+2; i++){
    //      dep[i] = Math.max(dep[i-2]+nums[i-2],dep[i-1])
    // }
    // return dep[dep.length-1]

    // 优化2：减少空间复杂度
    // 对于每一个值dep[i]，我们只需要前面两个值dep[i-1],dep[i-2]

    let prev_1 = 0;
    let prev_2 = 0;
    let temp;
     for(let i  = 0; i < nums.length; i++){
         temp = prev_1;
         prev_1 = Math.max(prev_2+nums[i],prev_1);
         prev_2 = temp;
    }
    return prev_1
};
console.log(rob([2,7,9,3,1]));
