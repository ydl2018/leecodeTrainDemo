/**
 * 
 * 
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    // 0 <=i  < grid.length &&  0 <= j < grid[0].length
    // i>0 && j > 0
       // dep[i][j] = min{dep[i-1][j],dep[i][j-1]} + grid[i,j]
    // i = 0  && j != 0
        // because it can move either down or right at any point
        // dep[i][j] = dep[i-1][j] + grid[i,j]
    // j == 0 i && i!= 0
        // dep[i][j] = dep[i][j-1]  + grid[i,j]
    // i == 0 && j == 0  dep[i][j] = grid[i,j]

    // as we know, if there are too many bounary conditions ,we shold expand dep Array
    // so we let  
    //  0 < i <=grid.length && 0 < j < grid[0].length 
    // and dep[0][2->grid[0].length] = Infinity ,dep[2->grid.length][0] = Infinity (because it's a non-negative number)
    // and dep[0][1] = 0 , dep[1][0] = 0 
    // then 
    //  dep[i][j] = min{dep[i-1][j],dep[i][j-1]} + grid[i-1][j-1]

        // 1. init dep
        let row = grid.length;
        let column = grid[0].length;

        const dep = Array.from({length:row+1},(_,i)=>{
            if(i ==0){
                return Array.from({length: column + 1},()=>Infinity);
            }else{
                return [Infinity]
            }
        })
        dep[1][0] = 0;
        dep[0][1] = 0;
        for(let i = 1; i <= row; i++ ){
            for(let j = 1; j <= column; j++){
                let prevMinValue = Math.min(dep[i-1][j],dep[i][j-1]);
                dep[i][j] = prevMinValue + grid[i-1][j-1] 
            }
        }
        return dep[row][column]
    };
    // 优化的动态规划
    // 使用背包思路优化空间复杂度
    var minPathSum = function(grid) {
        // dep[1-> column] = Infinity
        // dep[0] = 0
        // 0 < j <= column && 0 < i <= row
        // dep[j] = Math.min(dep[j-1],dep[j]) + grid[i-1][j-1] 
        let row = grid.length;
        let column = grid[0].length;
        const dep = Array.from({length:grid[0].length+1},()=>Infinity);
        for(let i = 1; i <= row; i++ ){
            for(let j = 1; j <= column; j++){
                let prevMinValue = Math.min(dep[j],dep[j-1]);
                prevMinValue = prevMinValue=== Infinity ? 0 : prevMinValue
                dep[j] = prevMinValue + grid[i-1][j-1] 
            }
        }
        console.log(dep);
        
        return dep[column]
    }
    // console.log(minPathSum([
    //     [1,3,1],
    //     [1,5,1],
    //     [4,2,1]
    //   ]));
    
    console.log(minPathSum( [[1,2],[1,1]]));
    