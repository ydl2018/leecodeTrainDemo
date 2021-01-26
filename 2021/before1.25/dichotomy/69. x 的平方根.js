/**
 * 实现 int sqrt(int x) 函数。

 计算并返回 x 的平方根，其中 x 是非负整数。

 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

 示例 1:

 输入: 4
 输出: 2
 示例 2:

 输入: 8
 输出: 2
 说明: 8 的平方根是 2.82842...,
      由于返回类型是整数，小数部分将被舍去。

 * **/

var mySqrt = function(x) {
    if(x === 1){
        return 1
    }
    // 我们可以[0,x]为区间，依次二分缩小比例
    let left = 0, right = x;
    while(right - left > 1){
        let middle = Math.floor((left+right)/2)
        let middleSqrt = Math.pow(middle,2)
        if(x === middleSqrt){
            return middle
        }
        if(x > middleSqrt){
            left = middle
        }
        if(x < middleSqrt){
            right = middle
        }
    }
    return left
};

// 算法2 ： 使用导数直线

var mySqrt = (x)=>{
    if(x === 0){
        return 0
    }
    // 求 y = x0平方 - c 的曲线与 y = 0 的交集，此时用求导直线不断逼近
    // 可以无限接近

    // (y - (x0平方 - c))  / (x - x0) = 2x0 (斜率)
    // => y = 2x0(x - x0) + x0平方 - c
    // =>
    // 其中, 我们要求的是正整数，x0必须要大于 c，否则求出的是-根号c,
    // 则 x0从c开始


}
console.log(mySqrt(2))
