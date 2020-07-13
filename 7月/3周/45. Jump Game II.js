/**
 *
 Given an array of non-negative integers, you are initially positioned at the first index of the array.

 Each element in the array represents your maximum jump length at that position.

 Your goal is to reach the last index in the minimum number of jumps.

 Example:

 Input: [2,3,1,1,4]
 Output: 2
 Explanation: The minimum number of jumps to reach the last index is 2.
 Jump 1 step from index 0 to 1, then 3 steps to the last index.
 Note:

 You can assume that you can always reach the last index.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */

// dep[i] = dep[i-1]
var jump = function(nums) {
    let result = 0;
    if(nums.length === 1){
        return 0
    }
    for(let i = 0; i < nums.length;){
        let maxCurLen = Math.max(nums[i] ,nums[i-1] || 0)
        let next_i = i;
        // 是否存在着 i 循环的问题
        for(let j = 1; j <= maxCurLen; ++j){
            next_i = Math.max(nums[i + j] + i + j,i)
        }
        i = next_i;
        result++
    }
    return result
};
var jump = function(nums) {
    let position = nums.length -1;
    let result = 0;
    while(position >0){
        for(let i = 0; i < position; ++i){
            if(i + nums[i] >= position){
                position = i
                result++;
                break;
            }
        }
    }
    return result
}

var jump = function(nums){
    let end = 0;
    let result = 0;
    let maxPosition = 0;
    for(let i = 0; i < nums.length - 1; ++i){
        maxPosition = Math.max(maxPosition,nums[i] + i)
        if(end === i){
            end = maxPosition;
            result++
        }
    }
    return result
}

console.log(jump([2,3,1,1,4]))
console.log(jump([0]))
