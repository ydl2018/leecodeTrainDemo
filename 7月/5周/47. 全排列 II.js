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
var permuteUnique = function (nums) {
    const result = []
    let len = nums.length
    const stacks = []
    const map = {}
    const backTrack = (curIndex) => {
        // if(curIndex ==)
        if (curIndex === len) {
            const key = stacks.toString()
            if (!map[key]) {
                result.push(stacks.concat())
                map[key] = true
            }
        }
        for (let i = curIndex; i < len; ++i) {
            stacks.push(nums[i]);
            [nums[i], nums[curIndex]] = [nums[curIndex], nums[i]]
            backTrack(curIndex + 1);
            [nums[i], nums[curIndex]] = [nums[curIndex], nums[i]]
            stacks.pop()
        }
    }
    backTrack(0)
    return result
};
var permuteUnique = function (nums) {
    const result = []
    const stacks = []
    const set = new Set()
    nums.sort((a,b)=>a-b)
    const dfs = () => {
        if (stacks.length === nums.length) {
            return result.push(stacks.concat())
        }
        for (let i = 0; i < nums.length; ++i) {
            if(set.has(i)) {
                continue;
            }
            if(i > 0 && nums[i] === nums[i-1] && !set.has(i-1)){
                continue
            }
            set.add(i)
            stacks.push(nums[i])
            dfs()
            stacks.pop()
            set.delete(i)

        }
    }
    dfs()
    return result
}
console.log(permuteUnique([1, 1, 2]))
