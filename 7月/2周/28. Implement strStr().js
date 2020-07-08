/**
 * Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "hello", needle = "ll"
Output: 2
Example 2:

Input: haystack = "aaaaa", needle = "bba"
Output: -1
Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-strstr
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

// 记住建表是建后面的表
var strStr = function(haystack, needle) {
    if(needle == ''){
        return 0
    }
    const ptr = [-1];
    let j = -1, i = 0;
    while(i < needle.length){
        if(j == -1 || needle[i] == needle[j]){
            ++i;
            ++j;
            ptr[i] = j
        }else{
            j = ptr[j]
        }
    }

    i = 0, j = 0;
    while(i < haystack.length && j <needle.length){
        if(j == -1 || haystack[i] == needle[j]){
            ++i;
            ++j;
        }else{
            j = ptr[j]
        }
    }
    
    if(j == needle.length){
        return i - j
    }else{
        return -1
    }
};

// method2 :子串逐一比较
/// 时间复杂度 O( (N - L)L )
var strStr = function(haystack, needle) {
    let hLen = haystack.length, nLen = needle.length;

    for(let  start = 0; start <= hLen - nLen; ++start ){
        if(haystack.substr(start,nLen) == needle){
            return start
        }
    }
    return -1
}

// method3: 双指针,只有两个指针的头节点相等时，从进行进一步的比较
// 如果两个指针对应的位置相等，那么 自增，curLen自增
// 否则 j = 0, i = i - curLen + 1 , curLen = 0
var strStr = function(haystack, needle) {
    if(needle == ''){
        return 0
    }
    let hLen = haystack.length, nLen = needle.length,i =0,j = 0,curLen = 0;
    while(i < hLen){
        if(haystack[i] == needle[j]){
            
            if(j == nLen-1){
                return i - curLen
            }

            i++;
            j++;
            curLen++

            
        }else{
            i = i - curLen + 1;
            j = 0;
            curLen = 0
        }
        
    }
    return -1
}

console.log(strStr('hello','lo'));
console.log(strStr("mississippi",
"issip"));
