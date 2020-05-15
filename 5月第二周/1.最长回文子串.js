/**
 * 
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
// 常规思路 
// 双重循环加while循环比较
var longestPalindrome = function(s) {
    let res= '';
    let l=0,r=0;
    if(s.length <= 1){
        return s
    }
    // 优化，不需要考虑奇数和偶数的形式
    const compare = function (s,i,j) {
        while(i<j){
            if(s[i] !== s[j]){
                return false
            }
            i++;
            j--;
        }
        return true
    }
    for(let i = 0;i<s.length-1;i++){
        for(let j = i+1 ; j<s.length;j++){
            if(compare(s,i,j)){
             
                
                if(j - i > r-l){
                    l = i;
                    r = j;
                }
            }
        }
    }
    res = s.slice(l,r+1);
    if(!res.length){
        return s[0]
    }
    return res
};

//  动态规划

// 设置i,j分别为s字符串从i到j的字符串
// f[i][j] 表示当前字符串为回文字符串
// 则状态转移方程为 

// 当j < s.length,
// j-1 - i -1 >0 => j -i >=2 =>  f[i][j] = f[i+1][j-1] && s[i] === s[j]
// 当 j -i = 1, 则 f[i][j] = s[i] && s[j];
// 当 i = j,则f[i][j] = true;

// 这里有一个要思考的地方，该采取怎样的遍历方式
// 观察状态转移方程 dep[i][j] =  dep[i+1][j-1],那么遍历时，[i+1][j-1]必须要比
// [i][j]大，常规的思路不可行
// 思考 ：1. i与j是倒序的
// 2.  j 在i之前
var longestPalindrome = function(s) {
    const dep = Array.from({length:s.length},()=>[]);
    let l=0,r=0;
    if(s.length<2){
        return s
    }
    for(let i = s.length-1;i>=0;i-- ){
        for(let j = s.length-1;j>=i;j--){
            if(j-i>=2){
                dep[i][j] = dep[i+1][j-1] && s[i] == s[j];
            }else if(j - i === 1){
                dep[i][j] = s[i] == s[j]
            }else if( i == j){
                dep[i][j] = true
            }
            if(dep[i][j] && r-l< j - i){
                r = j
                l = i
            }
        }
    }
    return s.slice(l,r+1)
}

// 第一层遍历j，第二层遍历i
var longestPalindrome = function(s) {
    if(s.left<2){
        return s
    }
    // 1.声明二维数据dep
    const dep = Array.from({length:s.length},()=>[]);
    // 2. 状态转移方程 
    // j-i>=2 => dep[i][j] = dep[i+1][j-1]
    // j-i == 1 =>dep[i][j] = s[i] == s[j]
    // j-i == 0 => dep[i][j] = true 
    
    // 3.声明最大字符串的下标
    let left = 0, right = 0;
    for(let j = 1;j<s.length;j++){
        for(let i = 0; i<=j;i++){
            if(j === i){
                dep[i][j] = true;
            }else if(j - i == 1){
                dep[i][j] = s[i] === s[j]
            }else{
                dep[i][j] = dep[i+1][j-1] && s[i] === s[j]
            }
           console.log( dep[i][j]);
           

            if(dep[i][j] && j-i>right-left){
                right = j;
                left = i
            }
        }
    }
     return s.substring(left,right+1);
 }
// 思路三
// 中心扩展法
var longestPalindrome = function(s) {
    if(s.left<2){
        return s
    }
    let left = 0,right = 0;
    const campare = function(s,i,j){
        while(i>=0 && j<s.length){
            
            if(s[i]=== s[j]){
                i--;
                j++;
            }else{
                break;
            }
           
        }
        return j-i-1;
    }
    for(let i = 0 ; i<s.length;i++){
        const len1 = campare(s,i,i);
        const len2 = campare(s,i,i+1);
        const maxLen = Math.max(len1,len2);
        if(maxLen > right-left){
            left = i - Math.floor((maxLen-1)/2);
            right = i+ Math.floor(maxLen/2);
        }
    }
    return s.substring(left,right+1)
}
console.log(longestPalindrome("babad"));
