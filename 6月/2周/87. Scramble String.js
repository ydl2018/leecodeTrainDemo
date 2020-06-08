/**
 * Given a string s1, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.

Below is one possible representation of s1 = "great":

    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
To scramble the string, we may choose any non-leaf node and swap its two children.

For example, if we choose the node "gr" and swap its two children, it produces a scrambled string "rgeat".

    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
We say that "rgeat" is a scrambled string of "great".

Similarly, if we continue to swap the children of nodes "eat" and "at", it produces a scrambled string "rgtae".

    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
We say that "rgtae" is a scrambled string of "great".

Given two strings s1 and s2 of the same length, determine if s2 is a scrambled string of s1.

Example 1:

Input: s1 = "great", s2 = "rgeat"
Output: true
Example 2:

Input: s1 = "abcde", s2 = "caebd"
Output: false

 */

 /**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 分治法
var isScramble = function(s1, s2) {
    const memory = new Map();
    const divideAndConquer = function (s1,start,end) {
        if(start == end){
            return [s1[start]]
        }
        if(memory.has(start+''+end)){
           return  memory.get(start+''+end)
        }
        
        const resArr = []
        for(let i = start; i < end; i++){
           const leftArr = divideAndConquer(s1,start,i);
           const rightArr = divideAndConquer(s1,i+1,end);
           for(let i1 = 0; i1 < leftArr.length; i1++){
               for(let j1 = 0; j1 < rightArr.length; j1++){
                    resArr.push(leftArr[i1]+rightArr[j1])
                    resArr.push(rightArr[j1]+leftArr[i1])
               }
           }
        }
        memory.set(start+''+end,resArr)
        return resArr
    }
    
    return divideAndConquer(s1,0,s1.length-1).includes(s2)
}; 

// 动态规划
// 将字符串s1分为S1,S2,字符串s2分为T1,T2
// 则 S1== T1 && S2 == T2 || S1 == T2 && S2 == T1
// 1. j - i  ==  l - k
// 此时dep[i][j][k] 代表从字符串s1的i开始，到长度为k的sub与从字符串s2的j开始，到到长度为k的sub2，这两个字符串相等
// 设置w为字符串的割点也就是树左右树的分支点,

// 0 < w < k ，此时k > 1 

// dep[i][j][k] = dep[i][j][w] && dep[i+w][j+w][k-w] || dep[i][j+k-w][w] && dep[i+w][j][k-w]

// k == 1

// dep[i][j][k] = s1[i][1] == s2[j][1]

// k 小于0，不予考虑

var isScramble = function(s1, s2) {
    let len = s1.length;
    const dep = Array.from({length:len},()=>Array.from({length:len},()=>[]));
    // init
    dep.forEach((sub1,i)=>{
        sub1.forEach((sub2,j)=>{
            sub2[1] = s1[i] == s2[j] 
        })
    })

    for(let i = 0; i < len; i++){
        for(let j = 0; j < len; j++){
            for(let w = 2; w < len-1; w++ ){
                dep[i][j][w] = dep
            }
        }
    }
}
console.log(isScramble('abcde', "caebd"));
console.log(isScramble('great', "rgeat"));
