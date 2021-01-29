/***
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。

 说明：

 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

 示例 1:

 输入: [2,2,3,2]
 输出: 3
 示例 2:

 输入: [0,1,0,1,0,1,99]
 输出: 99
 *
 * **/

var singleNumber = function(nums) {
    return Array.from((new Set(nums))).reduce((total,next)=>total += 3 * next,0) * 3  -  nums.reduce((total,cur)=>total+=cur)
};

// keypoint1:
// 异或运算：x ^ 0 = x， x ^ 1 = ~x（知识点遗漏）
// 与运算：x & 0 = 0 ， x & 1 = x

// keypoint2: 转换数字为二进制，然后分割成位数，根据位数出现1的次数来判断当前出现了1次还是3次
// 1. 将数字以二进制的形式来表示：
// nums  [3,5,3,3]
    //      3= 0 0 1 1
    //      3= 0 0 1 1
    //      3= 0 0 1 1
    //      5= 0 1 0 1
//出现1的次数    0 1 3 4
// /3的余数     0 1 0 1  疑惑:如果出现1的次数为5，怎么办？不存在的，因为其他数除以3，都没余数，所以剩下的必然是出现1次的

// 对于每一位来说，数字1出现3次，那么/3的余数为0； 数字出现1次，/3的余数为1
// => 00 => 01 => 10 =>  00
// n    one two one1  two1
// 0    0   0   0   0
// 0    0   1   0   1
// 0    1   0   1   0
// 1    0   0   0   1
// 1    0   1   1   0
// 1    1   0   0   0

// 求出two:
// if one == 0:
//      if n == 0
//          two == two
//      if n == 1           ===> two = two ^ n
//          two = ^two
// if one == 1:
//      if n == 0:
//          two = 0         ===> two = 0
//      if n == 1:
//          two = 0
//  two = two ^ n & ~one

// 同理，可得
//  one = one ^ n & ~ two

// 遍历完，最后的状态都在 0,0, 与 0,1 中，只有一个0,1。

// 为什么只返回two呢？因为而two是存储状态为0,1的值 和 0,0的值;
// 此时one 恒为 0， 只需要返回 two 的值
//

var singleNumber = function(nums) {
    //
    let one = 0;
    let two = 0;
    nums.forEach(num=>{
        // 先算低位，再算高位
        two  = two ^ num & ~ one;
        one = one ^ num & ~ two;
    })
    return two
}

// 思维拓展，在一个重复数字次数为3，只有一个数字出现次数为2的数组中，求出次数为2的数字：

// 由于只出现 1次的情况不存在，则 00状态值为0，01，状态也为0
// 此时one存储的是状态 1,0的值，也就是出现两次的值
var doubleNumber = function (nums){
    let one = 0;
    let two = 0;
    nums.forEach(num=>{
        two  = two ^ num & ~ one;
        one = one ^ num & ~ two;
    })
    return one
}
console.log(doubleNumber([10, 10, 10, 222, 222,222,333,333,333,987,987]))

// 解法3：构建一个32位的数组，数组负责统计各位数的二进制中，出现1的次数；最后对数组的值%3，得出数组进行左移操作

var singleNumber = function (nums){
    let counts = new Array(32).fill(0)
    for(let i = 0; i < nums.length; ++i){
        for(let j = 0; j < 32; j++){
            counts[j] += nums[i] & 1;
            nums[i] >>>= 1
        }
    }
    counts = counts.map(v=>v%3)
    let result = 0;
    for(let i = 31; i >= 0; --i){
        result <<= 1
        result |= counts[i]
    }
    return result
}

var singleNumber = function (nums){
    let counts = new Array(32).fill(0);
    for(let i = 0; i < nums.length; ++i){
        for(let j = 0 ; j < 32; ++j){
            counts[j] += nums[i] & 1;
            nums[i] >>>= 1
        }
    }
    counts = counts.map(v=>v%3)

    let result = 0;
    for(let i = 31; i >= 0; --i){
        result <<= 1
        result += counts[i]
    }
    return result
}

