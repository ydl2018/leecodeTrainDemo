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
    dep[1] = (s[0] == '(' && s[1] == ')') ? 2 : 0;

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
// 解法二 栈思想
var longestValidParentheses = function(s) {
    if(!s){
        return 0
    }
    // 设立哨兵
    const stack = [-1];
    let result = 0;
    for(let i = 0; i<s.length; i++){
        if(s[i] == '('){
            stack.push(i)
        }else{
            stack.pop();
            if(stack.length == 0){ // 证明右括号多，设立哨兵
               stack.push(i)
            }else{ // 证明左括号多或者左右括号相等，直接计算栈顶元素差值
                result = Math.max(i - stack[stack.length-1],result)
            }
        }
    }
    return result
}

// 解法三 左右 & 右左遍历
// 解决左括号多与右括号多的问题,或者多余的右括号在左括号的前边
var longestValidParentheses = function(s) {
    if(!s){
        return 0
    }
    let left = 0, right = 0,result = 0;
    // 解决右括号多的问题与多余右括号在左括号前边
    for(let i = 0;i < s.length; i++){
        if(s[i] == '('){
            left++
        }else{
            right++
        }
        if(left == right){
            result = Math.max(result,2*left);
        }else if(left < right){
            left = 0;
            right = 0;
        }
    }
    // 解决左括号多的问题
    left = 0, right = 0;
    for(let j = s.length-1; j >=0; j--){
        if(s[j] =='('){
            left++
        }else{
            right++
        }
        if(left == right){
            result = Math.max(result,2*left); 
        }else if(left > right){
            left = 0;
            right = 0;
        }
    }
    return result
}
console.log(longestValidParentheses(')()())'));
console.log(longestValidParentheses('(()'));
