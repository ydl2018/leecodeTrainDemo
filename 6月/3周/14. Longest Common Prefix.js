/**
 * Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
Note:
 */
// 思路 通过一一比较多个数组的前缀来进行操作
var longestCommonPrefix = function(strs) {

    let minLen = strs.reduce((prev,cur)=>Math.min(cur.length,prev),Infinity)
    if(strs.length == 0 || minLen == 0){
        return ''
    }
    let i = 0;
    let curVal = null;
    let curIndex = 0;
    for(;i< minLen; i++){
        for(let j = 0; j < strs.length; j++){
            if(j == 0){
                curVal =  strs[j][i]
                curIndex = i;
            }else{
                if(curVal != strs[j][i]){
                    return strs[j].slice(0,curIndex)
                }
            }
           
        }
    }
    return strs[0].substring(0,minLen)
};


// 思路二： divide and conquer

// 拆分子问题，一个数组的最大公共前缀子串可以由left的最大公共前缀子串和右边的最大公共前缀子串来决定

var longestCommonPrefix = function(strs) {
    if(!strs.length){
        return ''
    }
    const devideAndConquer = (start,end)=>{
        if(start == end){
            return strs[start]
        }
        const middle = Math.floor((start+end)/2);
        const left = devideAndConquer(start,middle);
        const right = devideAndConquer(middle+1,end);

        let resStr = ''
        for(let i = 0; i < left.length; i++){
            if(left[i] == right[i]){
                resStr+=left[i]
            }else{
                break;
            }
        }
        return resStr
    }
    return devideAndConquer(0,strs.length-1);
}

console.log(longestCommonPrefix(["flower","flow","flight"]))
console.log(longestCommonPrefix(["dog","racecar","car"]))