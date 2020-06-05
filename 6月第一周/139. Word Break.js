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
// 递归法
var wordBreak = function(s, wordDict) {
    let len = s.length;
    let sub;
   const recursive = (s,start)=>{
        for(let i = start; i < len; i++){
            sub = s.substring(start,i+1);
        
            for(let j = 0 ; j< wordDict.length; j++){
                if(wordDict[j] === sub){
                    // i+1==len 证明是当前i代表的值已经是字符串最后一个字母了
                    if(i+1 == len || recursive(s,i+1)){
                        return true
                    }
                }
            }
        }
        return false
   }
   return recursive(s,0)
};


// 动态规划
var wordBreak = function(s, wordDict) {
    const dep = Array.from({length:s.length},()=>false);
    let sub;
    for(let i = 0 ; i < s.length; i++){
        for(let j = 0; j<=i; j++){
            sub = s.substring(j,i+1);
            if(wordDict.includes(sub)){
                if(j == 0){
                    dep[i] = true
                    break;
                }else{
                    if(dep[j-1]){
                        dep[i] = true;
                        break;
                    }
                }
            }
        }
    }
    return dep[dep.length-1]
}

// 使用栈降低递归复杂度
var wordBreak = function(s, wordDict) {
    let len = s.length;
    let sub;
    const memory= [];

   const recursive = (s,start)=>{
        if(memory[start]){
            return true
        }
        for(let i = start; i < len; i++){
            sub = s.substring(start,i+1);
          
            for(let j = 0 ; j< wordDict.length; j++){
                if(wordDict[j] === sub){
                    // i+1==len 证明是当前i代表的值已经是字符串最后一个字母了
                    if(i+1 == len || recursive(s,i+1)){
                        return memory[start] = true
                    }
                }
            }
        }
        return memory[start] = false
   }
   return recursive(s,0)
};
// 使用广度优先遍历
var wordBreak = function(s, wordDict) {
    let len = s.length;

    // 队列存的是数组
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
                    queue.push(i);
                }
            }
            visited[start] = true;
        }
      
    }
}

console.log(wordBreak('catsandog',["cats", "dog", "sand", "and", "cat"]));
console.log(wordBreak('applepenapple',["apple","pen"]));
