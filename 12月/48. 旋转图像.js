/**
 * 给定一个 n × n 的二维矩阵表示一个图像。

 将图像顺时针旋转 90 度。

 说明：

 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

 示例 1:

 给定 matrix =
 [
 [1,2,3],
 [4,5,6],
 [7,8,9]
 ],

 原地旋转输入矩阵，使其变为:
 [
 [7,4,1],
 [8,5,2],
 [9,6,3]
 ]
 示例 2:

 给定 matrix =
 [
 [ 5, 1, 9,11],
 [ 2, 4, 8,10],
 [13, 3, 6, 7],
 [15,14,12,16]
 ],

 原地旋转输入矩阵，使其变为:
 [
 [15,13, 2, 5],
 [14, 3, 4, 1],
 [12, 6, 8, 9],
 [16, 7,10,11]
 ]

 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// 思路1： matrix[i][j] = matrix[j][n - i]  关键在于理解这个公式，需要通过观察得出规律
var rotate = function(matrix) {
    const  n  = matrix.length;
    const tempArr =  JSON.parse(JSON.stringify(matrix));
    for(let i = 0 ; i < n; ++i ){
        for(let j = 0; j < n; ++j ){
            matrix[j][n- 1 -i] = tempArr[i][j]
        }
    }
};


// unit test

rotate( [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]);
// [
//     [7,4,1],
//     [8,5,2],
//     [9,6,3]
// ]


rotate(  [
    [ 5, 1, 9,11],
    [ 2, 4, 8,10],
    [13, 3, 6, 7],
    [15,14,12,16]
]);
// [
//     [15,13, 2, 5],
//     [14, 3, 4, 1],
//     [12, 6, 8, 9],
//     [16, 7,10,11]
// ]


// 思路2： 通过水平翻转与对角线翻转可得

// 理由 我们需要得到 matrix[j][n - i - 1] = matrix[i][j]

// 水平翻转 matrix[n - 1 - i][j] = matrix[i][j] 此时 不会影响到交换后的位置

// 对角线翻转 matrix[j][i] = matrix[i][j]

// 联立可得求解

var rotate = (matrix)=>{
    let n = matrix.length,temp;
    // 水平交换
    for(let i  = 0; i <  Math.ceil( n / 2); ++i){
        for(let j  = 0 ; j < n ; ++j){
            temp = matrix[n- i -1][j]
            matrix[n- i -1][j] = matrix[i][j]
            matrix[i][j] = temp
        }
    }

    // 对角线交换
    for(let i = 0 ; i < n ;  ++i ){
        for(let j = 0; j <= i; ++j){  // 我在此处犯了错
            temp = matrix[i][ j]
            matrix[i][j]  = matrix[j][i]
            matrix[j][i] = temp
        }
    }
    console.log(matrix);

}

rotate( [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]);
// [
//     [7,4,1],
//     [8,5,2],
//     [9,6,3]
// ]


rotate(  [
    [ 5, 1, 9,11],
    [ 2, 4, 8,10],
    [13, 3, 6, 7],
    [15,14,12,16]
]);
// [
//     [15,13, 2, 5],
//     [14, 3, 4, 1],
//     [12, 6, 8, 9],
//     [16, 7,10,11]
// ]
