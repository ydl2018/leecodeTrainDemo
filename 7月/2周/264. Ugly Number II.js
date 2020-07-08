/**
 * 
Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

Example:

Input: n = 10
Output: 12
Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
Note:  

1 is typically treated as an ugly number.
n does not exceed 1690.
 */

 /**
 * @param {number} n
 * @return {number}
 */

 // 算法：
 // 1. 初始化数组nums和三个指针 i2, i3, i5
 // 1.1 循环计算所有丑数，在nums[i2],nums[i3]和nums[i5]中获取最小值
 // 1.2 添加到数组里
 // 1.3 将匹配到的数和指针和该指针代表的数乘相等时，该指针代表的数+1
 const nums = [1];
 let i2 = 0, i3 = 0, i5 = 0,ugly;
 for(let i = 1; i <= 1690;++i){
     ugly = Math.min(nums[i2] * 2,nums[i3] * 3,nums[i5] * 5)
     nums.push(ugly)
     if(ugly == nums[i2] * 2){
         i2++
     }
     if(ugly == nums[i3] * 3){
         i3++
     }
     if(ugly == nums[i5] * 5){
         i5++
     }
 }
var nthUglyNumber = function(n) {
    return nums[n]
};
console.log(nums);


// 方法二： 使用栈来存储计算结果，使用hash来去重
// 疑惑 ： 如何有序？
const nums2 = [];
const set = new Set([1])
const primes = [2,3,5]
const queue = [1];
for(let i = 0; i<1690; ++i){
   const temp = queue.shift()
    nums2[i] = temp;
    primes.forEach(prime=>{
        let newUgly = temp * prime;
        if(!set.has(newUgly)){
            set.add(newUgly)
            queue.push(newUgly)
        }
    })
}
console.log(nums2);
   