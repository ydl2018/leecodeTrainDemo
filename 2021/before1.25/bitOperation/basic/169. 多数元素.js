/**
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

  

 示例 1：

 输入：[3,2,3]
 输出：3
 示例 2：

 输入：[2,2,1,1,1,2,2]
 输出：2
  

 进阶：

 尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
。
 * ***/

// 1. 利用排序时众数必然在中间的性质

var majorityElement = function(nums) {
    return nums.sort((a,b)=>a-b)[Math.floor(nums.length / 2)]
};

// 2. divide and conquer
// 如果一个数是众数，那么子区间必然存在着一个区间的众数是此众数

var majorityElement = function(nums) {
    const divideAndConquer = (start,end)=>{
        if(start === end){
            return nums[start]
        }
        const mid = Math.floor((start + end) / 2)
        const leftResult = divideAndConquer(start,mid)
        const rightResult = divideAndConquer(mid+1,end)
       if(leftResult === rightResult){
           return leftResult
       }
        // 犯错：没有将nums传递进去
        let leftCount = countInRange(nums,leftResult,start,mid)
        let rightCount = countInRange(nums,rightResult,mid+1,end)
        // 可能会困惑，如果相等了怎么办？
        // 相等时，总会有上一级的区间众数大于它
        // console.log(leftResult,leftCount,rightResult,rightCount)
        return leftCount > rightCount ? leftResult : rightResult
    }
    const countInRange = (nums,num,start,end)=>{
        let count = 0
        for(let i = start; i <= end; ++i){
            if(nums[i] === num) count++
        }
        return count
    }
    return  divideAndConquer(0,nums.length-1)
}
// 使用 count 和 result
//  遍历数组
    // result !== nums[i]
    //   1. count == 0 => result = cur, count += 1
    //   2. count != 0 => count--
// //  result === nums[i]
//          count++
// return result
var majorityElement = function(nums) {
    let count = 0, result
    for(let i = 0,len = nums.length; i < len; ++i){
        if(result !== nums[i]){
            if(count){
                count--
            }else{
                result = nums[i]
                count++
            }
        }else{
            count++
        }
    }
    return result
}

// 思考：如何求出数组中的出现的次数最多元素
console.log(majorityElement([3, 3, 4]))
