/**
 * 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。

 

例如，给定三角形：

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

 

说明：

如果你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题，那么你的算法会很加分。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/triangle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  // i>0 && j >0  
  // f[i][j] = min{f[i-1][j],f[i-1][j-1]} + triangle[i][j]
    // i = 0  => f[i][j] = triangle[i][j];
    // j = 0  => f[i][j] = f[i-1][j] + triangle[i][j]
    const dep = Array.from({length:triangle.length},()=>[]);
    let col = triangle.length;
    for(let i = 0; i < col; i++){
      for(let j = 0; j <triangle[i].length; j++){
        if(i === 0 ){
          dep[i][j] = triangle[i][j];
        }else if(j == 0){
          dep[i][j] = dep[i-1][j] + triangle[i][j]
        }else{
          dep[i][j] = Math.min(dep[i-1][j] == undefined ? Infinity : dep[i-1][j],dep[i-1][j-1]) + triangle[i][j]
        }
      }
    }
    return Math.min(...dep[col-1])
 };
 console.log(minimumTotal([
   [7],
  [-5,9],
  [6,5,2],
  [-8,-2,-7,3],
  [-2,6,-6,-1,4]
]));
 // 优化版
 var minimumTotal = function(triangle) {
  // j >0  
  // f[j] = min(f[j-1],f[j]) + triangle[i][j]
  // 但是对于f[j+1] = min(f[j],f[j+1])来说，f[j]已经被污染了
  // 所以使用倒序

  // i = 0 && j = 0 
  // f[j] = triangle[0][0]
  // j = 0
  // f[j] = f[j] + triangle[i][j]
    const dep = Array.from({length:triangle[triangle.length-1].length},()=>Infinity);
    dep[0] = 0;
    for(let i = 0; i < col; i++){
      for(let j = triangle[i].length-1; j >=0; j--){
        if(j == 0){
          dep[j] = dep[j] + triangle[i][j]
        }else{
          dep[j] = min(dep[j],dep[j-1])+ triangle[i][j]
        }
      }
    }
  }