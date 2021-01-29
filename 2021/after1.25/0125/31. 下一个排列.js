/**
 * 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须 原地 修改，只允许使用额外常数空间。

 

示例 1：

输入：nums = [1,2,3]
输出：[1,3,2]
示例 2：

输入：nums = [3,2,1]
输出：[1,2,3]
示例 3：

输入：nums = [1,1,5]
输出：[1,5,1]
示例 4：

输入：nums = [1]
输出：[1]
**/
// 自己推导错误，官方思路：两边扫描

    // 找到较小值，尽可能靠右；找到较大值，尽可能小，然后交换
    // algorithm
    // 1. 从后往前，找到第一个符合nums[i] < nums[i+1]的值，则
    // i+1 到 n 都是降序序列
    // 找到:
    //  2. 从最后1个开始，找到i+1到n中，比nums[i]的值更大的值,swap[nums[i],nums[j]]
    // 找不到：
    //  不处理，此时 i = -1 ,证明整个数组都需要reverse
    // 直接对[i+1,n]升序处理

    // 难点：1.在于理解 i < 0 时，如何处理 ? 此时数组为降序序列，无法进行交换，此时数组最大，那么此时对 -1+1 到nums.length
    // 升序排序，正好找到最小的。
var nextPermutation = function(nums) {
  let i = nums.length - 2;
  // 找到第一个可以交换的i 和i以后的序列
  while (i>=0 && nums[i] >= nums[i+1]){
        i--
  }
  // 找不到i的情况是 [4,3,2,1],此时 i为-1
  if(i >=0){
      let j = nums.length - 1
      // 找到第一个j，j是i+1到n的降序序列，要求nums[j]尽可能小，那么需要反向找
      // 犯错：=> j > i && nums[j] < nums[i]
      // 分析：[1,5,1]，时，此时选择nums[i] == nums[j]可是跳出了循环，交换没任何作用
      while (j > i && nums[j] <= nums[i]){
          j--
      }
      [nums[i],nums[j]] = [nums[j],nums[i]]
  }
  let i1 = i+1;
  let j1 = nums.length - 1
  while (i1 < j1){
      [nums[i1],nums[j1]] = [nums[j1],nums[i1]]
      i1++
      j1--
  }
};


// 复习
// 1.注意需要在脑海中有印象
var nextPermutation = function(nums) {
    let len = nums.length ;
    let i = len - 2;
    while (i >= 0 && nums[i] >= nums[i+1] ){
        --i
    }
    if(i >= 0){
        let j = len - 1;
        while (j > i && nums[j] >= nums[i]){
            --j
        }
        [nums[i],nums[j]] = [nums[j],nums[i]]
    }
    let start = i+1,end = len -1;
    while (end > start){
        [nums[end],nums[start]] = [nums[start],nums[end]]
        end--
        start++
    }
}
let arr = [1,5,1]
nextPermutation(arr)
console.log(arr) // expected [2]
