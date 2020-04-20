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
// ，那么wz 能否将矮的边去前移，高边保持不变？

// var maxArea = function (height) {
//     let maxArea = 0
//     const len = height.length;
//     while(){

//     }
// }
console.log(maxArea([1,8,6,2,5,4,8,3,7]));
