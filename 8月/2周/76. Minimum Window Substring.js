/*
* Given a string S and a string T, find the minimum window
* in S which will contain all the characters in T in
* complexity O(n).

Example:

Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
Note:

If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-window-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
* */
var minWindow = function(s, t) {

    let left = 0
    let res = Infinity
    let valid = 0
    let start = 0
    const needMap = new Map()
    const windowMap = new Map()
    for(let ch of t){
        if(needMap.has(ch)){
            needMap.set(ch,needMap.get(ch)+1)
        }else{
            needMap.set(ch,1)
        }
    }

    for(let right  = 0 ; right < s.length; ++right){
        let char = s[right]
        if(needMap.has(char)){
            let count = windowMap.get(char) || 0
            windowMap.set(char,++count)
            if(count === needMap.get(char)){
                valid++
            }
        }
        while (valid === needMap.size){
            if(right - left < res){
                start = left
                res = right - left
            }
            const char = s[left]
            left++
            if(needMap.has(char)){
                if(windowMap.get(char) === needMap.get(char)){
                    valid--
                }
                windowMap.set(char,windowMap.get(char) - 1)
            }
        }
    }
    console.log('3333');

    return res === Infinity ? '' : s.substr(start,res+1)
};

console.log(minWindow("ADOBECODEBANC","BAC")) // BANC
