/**
 * Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

Example 1:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false

 */

 /**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    if(s1.length + s2.length != s3.length){
        return false
    }
    
    // 前提： 0 < n <= s3.length  0 < i <= s1.length 0 < j <= s2.length

    // 设置 dep[i][j][n] 为 s1的i个字符串 与 s2的j个字符串 组成 s3的n个字符串 的结果

    // 因 dep[i][j][n] => dep[i][ n - i][n] =>  dep[i][n]，可得
    // dep[i][n] = (dep[i-1][n-1] && s3[n-1] == s1[i-1]) || (dep[i][n-1] && s2[ n-i- 1] == s3[n-1])
  
    const dep = Array.from({length:s1.length+1},()=>Array.from({length:s3.length+1},()=>false));
    
    // 1. init
    // 当为s1的0个字符组成0个字符 => true 
    dep[0][0] = true;

    // when i == 0
    for(let n = 1; n <= s3.length; n++){
        dep[0][n] = dep[0][n-1] && s2[n-1] == s3[n-1]
    } 
    
    //
    for(let n = 1; n <= s3.length; n++){
        for(let i = 1; i <= s1.length; i++){
            dep[i][n] = (dep[i-1][n-1] && s3[n-1] == s1[i-1]) || (dep[i][n-1] && s2[ n-i- 1] == s3[n-1])
        }
    }
    return dep[s1.length][s3.length]
};
var isInterleave = function(s1, s2, s3) {
    if(s1.length + s2.length != s3.length){
        return false
    }
    
    // 前提： 0 < n <= s3.length  0 < i <= s1.length 0 < j <= s2.length

    // dep[i] = (dep[i-1] && s3[n-1] == s1[i-1]) || (dep[i] && s2[ n-i- 1] == s3[n-1])
  
    const dep = Array.from({length:s1.length+1},()=>false);
    
    dep[0] =  true;
    //
    for(let n = 0; n <= s3.length; n++){
        for(let i = 0; i <= s1.length; i++){
            dep[i]  = (dep[i-1] && s3[n-1] == s1[i-1]) || (dep[i] && s2[ n-i- 1] == s3[n-1])
        }
        console.log(dep);
    }
    
    
    return dep[s1.length]
};
console.log(isInterleave('aabcc','dbbca','aadbbbaccc'));
console.log(isInterleave('aabcc','dbbca','aadbbcbcac'));
