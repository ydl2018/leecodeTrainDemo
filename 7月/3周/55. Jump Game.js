/**

 Given an array of non-negative integers, you are initially positioned at the first index of the array.

 Each element in the array represents your maximum jump length at that position.

 Determine if you are able to reach the last index.



 Example 1:

 Input: nums = [2,3,1,1,4]
 Output: true
 Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 Example 2:

 Input: nums = [3,2,1,0,4]
 Output: false
 Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.


 Constraints:

 1 <= nums.length <= 3 * 10^4
 0 <= nums[i][j] <= 10^5
 **/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// keyPoint: 维护当前数组可以到达的最大值，如果 > nums.length, 那么 return true
var canJump = function(nums) {
    let max = 0;
    for(let i = 0,len = nums.length; i < len;++i){
        if(i <= max){
            max = Math.max(i + nums[i],max)
            if(max >= len-1){
                return true
            }
        }
    }
    return false
};

// method2 : 倒序遍历，对于每一个想要跳转的值，必须要大于等于当前的curIndex

var canJump = function(nums){
    let curIndex = nums.length -1;
    for(let i = nums.length-2; i >=0; --i){
        if(nums[i] + i >= curIndex){
            curIndex = i
        }
    }
    return  curIndex === 0
}
console.log(canJump([3, 2, 1, 0, 4]));
console.log(canJump([0]));
