/*
* Given two strings s1 and s2, write a function
* to return true if s2 contains the permutation of s1.
* In other words, one of the first string's permutations
* is the substring of the second string.

 

Example 1:

Input: s1 = "ab" s2 = "eidbaooo"
Output: True
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input:s1= "ab" s2 = "eidboaoo"
Output: False
 

Constraints:

The input strings only contain lower case letters.
The length of both given strings is in range [1, 10,000].

* */

var checkInclusion = function(s1, s2) {
    const needMap = {}
    for(let char of s1){
        const code = char.charCodeAt(0)
        needMap[code] = needMap[code] || 0
        needMap[code]++
    }
    let needMapSize = Object.keys(needMap).length
    let valid = 0
    let windowMap = {}
    for(let i = 0; i < s2.length; ++i){
        if(s2[i] in needMap){
            const char = s2.charCodeAt(i)
            windowMap[char] = windowMap[char]  || 0
            windowMap[char]++
            if(needMap[char] === windowMap[char]){
                valid++
            }
        }else{
            windowMap = {}
            valid = 0
        }
        if(valid === needMapSize) return true
    }
    return false

};
console.log(checkInclusion('ab','eidbaooo')) // true
console.log(checkInclusion('ab','eidboaoo')) // false
console.log(checkInclusion('hello','ooolleoooleh')) // false
