/**
 * Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
Output:
[
  "cats and dog",
  "cat sand dog"
]
Example 2:

Input:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
Output:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
Output:
[]

 */

 /**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */

 // 1. recursive
var wordBreak = function(s, wordDict) {
    const memoryMap = new Map();
    // target : return a two demension array
    const recursvie = (start,end)=>{
        if(memoryMap.has(start+'-'+end)){
            return  memoryMap.get(start+'-'+end)
        }
        let sub;
        const resArr = [];
        for(let i = start; i <end; ++i){
            sub = s.substring(start,i+1);
            
            if(wordDict.includes(sub)){
                
                if(i+1 == end){
                    resArr.push([sub])
                }else{
                    const subArr = recursvie(i+1,end);
                    for(let j = 0 ; j < subArr.length; j++){
                        resArr.push([sub,...subArr[j]])
                    }
                }
             
            }
    }
    memoryMap.set(start+'-'+end,resArr);
    return  resArr;
    }
    const resultArr = recursvie(0,s.length);
    //console.log(resultArr);
    return resultArr.map(v=>v.join(' '))
};

// 2. 动态规划
var wordBreak = function(s, wordDict) {
    // if s[j+1][i] in wordDict
    // dep[i] = dep[j] concat s[j+1][i] 
    // else
    // dep[i] = []

    const dep = Array.from({length:s.length},()=>[])
    let sub;
    for(let i = 0; i < s.length; ++i){
        for(let j = 0; j < i; ++j){
            sub = s.substring(j,i+1);
            if(wordDict.includes(sub)){
                // 1. j == 0
                if(j == 0){
                    dep[i].push(sub)
                }else if(dep[j-1].length){
                    dep[i].push(...dep[j-1].map(v=>sub + ' '+ v))  
                }
            }
        }
    }
    return dep[s.length-1]
}

// 3. 广度优先遍历，利用树的广度优先遍历，找到所有符合条件的值
// var wordBreak = function(s, wordDict) {
//     const stacks  = [];
//     stacks.push(0);
//     const visitedMap = [];
//     while(stacks.length){
//         const start = stacks.pop();
//         for(let i = start; i < s.length; ++i){
//             const sub = s.substring(start,i+1);
//             if(wordDict.includes(sub)){
//                 stacks.push(i+1);
//                 if(!visitedMap[i]){
//                     if(i == 0){
//                         visitedMap[i] = [sub]
//                     }else{
//                         visitedMap[i] = visitedMap[start-1].map(substr=>sub+' '+ substr)
//                     }
//                 }else{
//                     visitedMap[i].push()
//                 }
//             }
//         }
//     }
// }


// test one
console.log(wordBreak('pineapplepenapple',["apple", "pen", "applepen", "pine", "pineapple"]));
// expected
// [
//   "pine apple pen apple",
//   "pineapple pen apple",
//   "pine applepen apple"
// ]

// test two
console.log(wordBreak( "catsanddog", ["cat", "cats", "and", "sand", "dog"]));

// expected
// [
//       "cats and dog",
//       "cat sand dog"
//     ]

// test three
console.log(wordBreak( "catsandog", ["cats", "dog", "sand", "and", "cat"]));

// []