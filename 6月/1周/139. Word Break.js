/**
 * 
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// 复习 递归
var wordBreak = function(s, wordDict) {
    let len = s.length;
    let sub;
    const recursive = (start)=>{
        for(let i = start; i < len; i++){
            sub = s.substring(start,i+1);
            if(wordDict.includes(sub)){
                if(i == len-1 ||  recursive(s,i+1)){
                    return true
                }
            }
        }
        return false
    }
    return recursive(s,0)
}
// 复习 优化递归
var wordBreak = function(s, wordDict) {
    const  len = s.length;
    // 介于 catsonxxx可以分为cat 与son,以及cats 与on,其后的结果再上一次已经遍历过了
    // 所以以空间交换时间
    const memory = [];
    let sub;
    const recursive = function (start) {
        if(start in memory){
            return memory[start]
        }
        for(let i = start; i < len; i++){
            sub = s.substring(start,i+1);
            if(wordDict.includes(sub)){
                if(i== len-1 || recursive(i+1)){
                    return memory[i] = true;
                }
            }
        }
        return memory[start] = false
    }
    return recursive(0)
}

// 动态规划
var wordBreak = function (s,wordDict) {
    // solution One

    // 0 <=i < s.length  && 0 <= j <=i whta is j? j is a cut point
    // dep[i] respresents that the word  s[0->i] (note it includes 'i') compositions are all in wordDict range
    //  j <= i 
    //      j >=1
        // dep[i] = s[j][i] in wordDict && dep[j-1] 
    // j == 0
        // dep[i] = s[j][i] in wordDict // that means dep[j-1] == true ,but now j -1 = 0 -1 = -1 
    
    
        // so if there are two many  boundary conditions ,we can extend the dep Array

    // Solution Two
    // now we make the dep[i] represent that the word s[0->i-1] compositions are all in wordDict range
    //   1 <= i <= s.length && 0 <= j < i
    //   dep[i] = s[j][i-1] in wordDict && dep[j]
    const dep = Array.from({length:s.length+1},()=>false);
    // any word can be composed with "" and itself, so dep[0] is true
    dep[0] = true;
    for(let i = 1 ; i <= s.length; i++){
        for(let j = 0; j<i; j++){
            if(dep[j] && wordDict.includes(s.substring(j,i))){
                 dep[i] = true
                // it is easy to forget to add break!!!
                 break;
            }
        }
    }
    return dep[s.length]
}

// // 递归法
// var wordBreak = function(s, wordDict) {
//     let len = s.length;
//     let sub;
//    const recursive = (s,start)=>{
//         for(let i = start; i < len; i++){
//             sub = s.substring(start,i+1);
        
//             for(let j = 0 ; j< wordDict.length; j++){
//                 if(wordDict[j] === sub){
//                     // i+1==len 证明是当前i代表的值已经是字符串最后一个字母了
//                     if(i+1 == len || recursive(s,i+1)){
//                         return true
//                     }
//                 }
//             }
//         }
//         return false
//    }
//    return recursive(s,0)
// };


// // 动态规划
// var wordBreak = function(s, wordDict) {
//     const dep = Array.from({length:s.length},()=>false);
//     let sub;
//     for(let i = 0 ; i < s.length; i++){
//         for(let j = 0; j<=i; j++){
//             sub = s.substring(j,i+1);
//             if(wordDict.includes(sub)){
//                 if(j == 0){
//                     dep[i] = true
//                     break;
//                 }else{
//                     if(dep[j-1]){
//                         dep[i] = true;
//                         break;
//                     }
//                 }
//             }
//         }
//     }
//     return dep[dep.length-1]
// }


// 使用广度优先遍历
var wordBreak = function(s, wordDict) {
    let len = s.length;

    // 队列存的是符合规则的索引
    const queue = [];
    const visited = [];
    let sub,start;

    queue.push(0);
    while(queue.length){
        start = queue.shift();
        if(!visited[start]){
            for(let i = start; i < s.length; i++){
                sub = s.substring(start,i+1);
                if(wordDict.includes(sub)){
                    if(i+1 == s.length){
                        return true
                    }
                    queue.push(i+1);
                }
            }
            visited[start] = true;
        }
    }
    return false
}

console.log(wordBreak('catsandog',["cats", "dog", "sand", "and", "cat"]));
console.log(wordBreak('applepenapple',["apple","pen"]));
