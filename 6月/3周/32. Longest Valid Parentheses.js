/**
 * Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

Example 1:

Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"
Example 2:

Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
 */

 /**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if(!s){
        return 0
    }
    const dep = Array.from({length:s.length},()=>0);
    dep[0] = 0;
    dep[1] == (s[0] == '(' && s[1] == ')') ? 2 : 0;

    for(let i = 2; i < s.length; i++){
        if(s[i] == ')' && s[i - dep[i - 1] - 1] == '('){
            if(s[i - dep[i -1]-2] == ')'){
                dep[i] = dep[i-1] + 2 + dep[i - dep[i -1] -2]
            }else{
                dep[i] =  dep[i-1] + 2
            }
        }
    }
    console.log(s[0],s[1],(s[0] == '(' && s[1] == ')') );
    
    return Math.max(...dep)
};
console.log(longestValidParentheses('()'));
