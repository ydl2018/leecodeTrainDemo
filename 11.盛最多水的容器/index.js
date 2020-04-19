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

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
