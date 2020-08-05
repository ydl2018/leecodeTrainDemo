//
// 给定一个可包含重复数字的序列，返回所有不重复的全排列。
//
// 示例:
//
//     输入: [1,1,2]
// 输出:
//     [
//         [1,1,2],
//         [1,2,1],
//         [2,1,1]
//     ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const result = []
    let len = nums.length
    const hashMap = new Set()
    const backTrack = (curIndex)=>{
        // if(curIndex ==)
        for(let i = curIndex; i < len; ++i){
            [nums[i],nums[curIndex]] = [nums[curIndex],nums[i]]
            backTrack()
        }
    }
};
