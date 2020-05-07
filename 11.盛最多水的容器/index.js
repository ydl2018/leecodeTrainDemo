// var maxArea = function(height) {
//     let maxArea = 0
//     for(let i = 0;i<height.length-1;i++){
//         const ai = height[i];
//         for(let j = 1; j<height.length;j++){
//             const aj = height[j]
//             const x = j-i;
//             const y = Math.min(ai,aj);
//             maxArea = Math.max(x*y,maxArea)
//         }
//     }
//     return maxArea
// };
var maxArea = function (height) {
    let maxArea = 0
    for (let i = 0; i < height.length - 1; i++) {
        const ai = height[i];
        for (let j = height.length - 1; j > 0; j--) {
            const aj = height[j]
            // 下面代码作用是跳过比上一个矮的线条
            // 去除j为末尾的情况
            if (j < height.length - 1 && aj < height[j + 1]) {
                continue
            }
            const x = j - i;
            const y = Math.min(aj, ai)
            maxArea = Math.max(x*y,maxArea)
        }
    }
    return maxArea
};

// 思路三，参考：
// 面积大小与什么有关，area = x*y = (j-i)*Min(aj,ai)
// 与矮边有关,与j-i有关,接着上面的思路，如果两个指针在刚开始在数组的两端
// ，那么能否将矮的边去前移，高边保持不变？
// 问题：为什么要讲矮边前移？
// 从公式入手，双指针的方法是，一开始时两个指针位于两端，此时的横坐标处于最大值。
// 这时会存在两种情况，一种是两边的高度相同，一种是两边的高度不同。
// 先考虑两边高度不同的情况：
// 1. 指针可以有三种移动情况：
// 1.1 矮边移动
// 1.2 高边移动
// 1.3 两边同时移动

// 1.1 矮边移动
// 以上三种情况都有一个前提，移动指针会减少x的数值。
// 如果想得到最大值的面积，在x变小的情况下，排除y肯定会变小的情况
// 以上情况中，
// 1.1.矮边移动时，那么y会不会继续变大呢？会的，存在y变大的情况。
// 1.2.高边移动时，有两种情况：
// 1.2.1 遇到更高的边，那么此时是计算的y不变，x变小，总面积必然会比之前小。
// 1.2.2 遇到更矮的边，此时计算的y变小，x变小，总面积必然会比之前小。

// 1.3 两边同时移动，此时有四种情况：
// 1.3.1 矮->矮，高->高 x
// 1.3.2 矮->矮，高->矮 x
// 1.3.3 矮->高，高->高 存在
// 1.3.4 矮->高，高->矮 存在

// 1.3.3 的情况下，是不如矮->，高不移动的
// 1.3.4 情况下，矮->，高不移动已经包括这种情况了



// 再考虑两边高度相等的情况，此时无论向左移动或者向右移动，都可以
// 此处采用策略，统一向右移动

// 因此，使用矮边-> 高不移动策略
var maxArea = function (height) {
    let maxArea = 0
    const len = height.length;
    // 记录两个指针的位置
    let start = 0,end = height.length-1;
    if(start === end){
        return 0
    }
    let left,right;
    while(start < end){
        left = height[start];
        right = height[end];
        if(left>=right){
            maxArea = Math.max(maxArea,(end-start)*right)
            end--
        }else{
            maxArea = Math.max(maxArea,(end-start)*left)
            start++
        }
    }
    return maxArea
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
