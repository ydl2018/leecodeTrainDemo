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
    const dep = Array.from({length:nums.length},
        ()=>Array.from({length:nums.length},()=>0));
    for(let i = nums.length - 1; i >=0 ; --i){
        for(let j = i;j< nums.length; j++ ){
            if(i == j){
                dep[i][j] = nums[j]
            }else if( j - i  == 1){
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

// 解法二

// 利用javascript 特性，超出时间复杂度
var NumArray = function(nums) {
    this.dep = nums
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    return this.dep.slice(i,j+1).reduce((total,sum)=>total+=sum)
};

// 解法三 利用缓存

// 关键思考步骤在于 后面的元素一定是前面的元素加上自身
var NumArray = function(nums) {
    const sums = [];
    sums.push(nums[0])
    for(let i = 1; i < nums.length; i++){
        sums[i] = sums[i-1] + nums[i] 
    }
    this.dep = sums
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {

    return this.dep[j] - (i == 0 ? 0 :this.dep[i-1])
};



 var obj = new NumArray([-2, 0, 3, -5, 2, -1])
 console.log( obj.sumRange(0,2));
 
console.log( obj.sumRange(2,5));
console.log( obj.sumRange(0,5));
