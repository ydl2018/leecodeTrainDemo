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
// 双重循环
var longestPalindrome = function(s) {
    let res= '';
    if(s.length <= 1){
        return s
    }
    const compare = function (s) {
        const isOddNumber = s.length%2>0;
        if(isOddNumber){ // 奇数比较
            const middleCursor = Math.floor(s.length/2);
            let i = 0,j = s.length-1;
            while(i<middleCursor && j>middleCursor){
                if(s[i] !== s[j]){
                    return false
                }
                i++;
                j--
            }
            return true
        }else{ //偶数
            const middleCursor = s.length/2;
            let i = 0,j = s.length-1;
            while(i < middleCursor && j >= middleCursor){
                if(s[i] !== s[j]){
                    return false
                }
                i++;
                j--
            }
        }
        return true
    }
    for(let i = 0;i<s.length-1;i++){
        for(let j = i+1 ; j<s.length;j++){
            const curStr = s.slice(i,j+1);
            if(compare(curStr)){
                res = curStr.length>res.length? curStr : res
            }
        }
    }
    if(!res.length){
        return s[0]
    }
    return res
};
console.log(longestPalindrome('accaacca'));


