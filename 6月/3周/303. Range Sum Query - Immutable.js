/**
 * 
Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

Example:
Given nums = [-2, 0, 3, -5, 2, -1]

sumRange(0, 2) -> 1
sumRange(2, 5) -> -1
sumRange(0, 5) -> -3
Note:
You may assume that the array does not change.
There are many calls to sumRange function.

 */

 /**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    // i -j > =2
    // dep[i][j] = dep[i+1][j-1] + nums[i] + nums[j]
    // i - j = 1
    // dep[i][j] = nums[i] + nums[j]
    // i - j = 0
    // dep[i][j] = nums[i]
    const dep = Array.from({length:nums.length},()=>0);
    for(let i = 0; i < nums.length; i++){
        for(let j = i;j< nums.length; j++ ){
            if(i == j){
                dep[i][j] = nums[j]
            }else if( i - j == 1){
                dep[i][j] = nums[i]+nums[j]
            }else{
                dep[i][j] = dep[i+1][j-1] + nums[i]+nums[j]
            }
        }
    }
    this.dep = dep
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    return this.dep[i][j]
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
 var obj = new NumArray([-2, 0, 3, -5, 2, -1])
 console.log( obj.sumRange(0,2));
 
console.log( obj.sumRange(2,5));
