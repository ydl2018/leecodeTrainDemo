/**
 * Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

Example:

Input: 

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

Output: 4

 */

 /**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    // connect condition  i, j
    // dp[i][j] represent when it is the i row, successive 1 in i,j point ==> x

   

    // j >=1
    // dp[i][j] = matrix[i][j] == 1 ? dp[i][j-1]+1 : 0
    // j = 0
    // dp[i][j] = matrix[i][j] == 1 ? 1 : 0;

 // and maxArea can caculate by (i - (i - k) ) * min(dp[i-1][j],...dp[i - k][j]) 
    if(!matrix.length) return 0

    const row = matrix.length;
    const col = matrix[0].length;
    const dp = Array.from({length:row},()=>Array.from({length:col}));
    let maxArea = 0;

    for(let i = 0; i < row; ++i){
        for(let j = 0; j < col; ++j){
            if(j == 0){
                dp[i][j] = matrix[i][j] == 1 ? 1: 0;
            }else{
                dp[i][j] = matrix[i][j] == 1 ? dp[i][j-1]+1 : 0
            }

            if(dp[i][j] > 0){
                let curX = dp[i][j];
                let curY;
                for(let k = i; k >= 0; --k){
                    curX = Math.min(curX,dp[k][j]);
                    curY = i - k + 1;
                    if(curX == curY){
                        maxArea = Math.max(curX * curY, maxArea);
                    }
                    if(curX < curY){
                        break;
                    }
                }
            }
        }
    }
    console.log(dp);
    
    return maxArea
};

// 优化

// f[i][j] 代表着 由[i] [j] 组成最大正方形的半径

// 关键思考步骤： 
// 1. i,j的值如果是 k, 那么
// f[i][j - 1] >= k - 1
// f[i - 1][j] >= k - 1
// f[i - 1][j - 1] >= k - 1



// 那么对应的 dp[i][j] = Math.min(dp[i][j-1],dp[i-1][j],dp[i-1][j-1]) + 1 if  matrix[i][j] == 1

// 为了方便计算, i与 j 分别从 1开始

var maximalSquare = function(matrix) {
    if(!matrix.length) return 0
    let row = matrix.length,col  = matrix[0].length;
    const dp = Array.from({length:row+1},()=>Array(col+1).fill(0))
    let result = 0;
    for(let i = 1; i <= row; ++i ){
        for(let j = 1; j <= col; ++j){
            if(matrix[i-1][j-1] == 1){
                dp[i][j]  = Math.min(dp[i][j-1],dp[i-1][j],dp[i-1][j-1]) + 1 

                result = Math.max(Math.pow(dp[i][j],2),result)
            }
        }
    }
   
    
    return result
    
}

console.log(maximalSquare(
    [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]));
