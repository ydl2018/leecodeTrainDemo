/**
 * Given a string S and a string T, count the number of distinct subsequences of S which equals T.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).

It's guaranteed the answer fits on a 32-bit signed integer.

Example 1:

Input: S = "rabbbit", T = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from S.
(The caret symbol ^ means the chosen letters)

rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^
Example 2:

Input: S = "babgbag", T = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from S.
(The caret symbol ^ means the chosen letters)

babgbag
^^ ^
babgbag
^^    ^
babgbag
^    ^^
babgbag
  ^  ^^
babgbag
    ^^^

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/distinct-subsequences
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
  * 
  * 
 * @param {string} s
 * @param {string} t
 * @return {number}
 */


 // 血的教训，
 // 1. 如果初始化出问题，不符合逻辑，一定要去做好初始化的工作！！！
 // 2. 不要习惯性地加1
var numDistinct = function(s, t) {
    // 当位于第j位时，选择j位与i位匹配，还是不选
    // i >= 1 j >= 1
        // s[i] == s[j]
        //  dep[i][j] = dep[i-1][j-1]  + dep[i][j-1]
        // s[i] != s[j]
        //  dep[i][j] = dep[i][j-1]
    
    // i = 0 j = 0
    // dep[i][j] = 0
    // i < j -1
    // dep[i][j] = 0
    if(s.length < t.length){
        return 0
    }
    const dep  = Array.from({length:t.length+1},()=>Array.from({length:s.length+1},()=>0))

    for(let i = 0; i < dep[0].length; i++){
        dep[0][i] = 1
    }

    for(let i = 1; i <= t.length; ++i){
        for(let j = i; j <= s.length; ++j){
         
            if(t[i-1] == s[j-1]){
                // 错误点1： 这里习惯性加1
                dep[i][j] = dep[i-1][j-1] + dep[i][j-1]
            }else{
                dep[i][j] = dep[i][j-1]
        }
    }
}
    return dep[t.length][s.length]
};
console.log(numDistinct('babgbag','bag'));
console.log(numDistinct("rabbbit", "rabbit"));
