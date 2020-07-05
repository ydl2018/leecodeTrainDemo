/**
 * 
给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。

示例 1：

输入: s1 = "abc", s2 = "bca"
输出: true 
示例 2：

输入: s1 = "abc", s2 = "bad"
输出: false
说明：

0 <= len(s1) <= 100
0 <= len(s2) <= 100
 */
// 1. 如果两个字符串最终完全相同，那么异或的结果是0
// 2. 任何数与0 的异或是自身
// 3. 存在着 aabb acac 这种情况，异或结果等于0,这种情况是通过错位实现异或清零
// 4. 通过charCodeAt访问字符的ascii码如果最终相同，那么说明不存在错位清零的情况
var CheckPermutation = function(s1, s2) {
    if(s1.length !== s2.length){
        return false
    }
    let result = 0;
    // 异或
    let num1,num2;
    num1 = num2 = 0;
    for(let i=0;i<s1.length;i++){
        result = result ^ s1[i] ^ s2[i]
        num1 += s1.charCodeAt(i)
        num2 += s2.charCodeAt(i)
    }
    if(result == 0){
        return num1 === num2
    }
    return false
 };
 console.log(CheckPermutation('abc','bca'));
 