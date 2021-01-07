/**
 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

 你可以假设数组中无重复元素。

 示例 1:

 输入: [1,3,5,6], 5
 输出: 2
 示例 2:

 输入: [1,3,5,6], 2
 输出: 1
 示例 3:

 输入: [1,3,5,6], 7
 输出: 4
 示例 4:

 输入: [1,3,5,6], 0
 输出: 0
 通过次数299,520

 **/


// 思路1 ： 二分法

var searchInsert = function(nums, target) {
    let result,left , right  = nums.length - 1;
    result = left =  0
    if(left > right) {
        return result
    }
    while (left <= right){
        let mid = Math.floor((left + right) / 2)
        if( nums[mid]  === target){
            return   result = mid
        }
        if(nums[mid] < target){
            left = mid+1
        }else{
            right = mid - 1
        }
    }
    result = left
    return result
};


console.log(searchInsert([1, 3, 5, 6], 5)) // 2
console.log(searchInsert([1, 3, 5, 6], 2)) // 1
console.log(searchInsert([1, 3, 5, 6], 7)) // 4
console.log(searchInsert([1, 3, 5, 6], 0)) // 0
console.log(searchInsert([-1], 0)) // -1
