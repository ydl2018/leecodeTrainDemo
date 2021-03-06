/**
 * Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

Example 1:

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.
Example 2:

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = truncate(-2.33333..) = -2.
Note:

Both dividend and divisor will be 32-bit signed integers.
The divisor will never be 0.
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/divide-two-integers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var divide = function(dividend, divisor) {
    if(dividend == 0) return dividend
    if(divisor == 1) return dividend
    if(divisor == -1){
        if(dividend > -Infinity){
            return -dividend
        }else{
            return Infinity
        }
    }
    let sign = (dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0)

    let a = dividend > 0 ? dividend : -dividend
    let b = divisor > 0 ? divisor : - divisor
    let res = cursive(a,b) 
    if(sign) return -res
    return res > Infinity ? Infinity : res
};

const cursive = (a,b)=>{
    if(a < b) return 0
    let count = 1
    let _b = b
    while( a >= (_b << 1)){
       count = count << 1
        _b = _b << 1
    }
    return count + cursive(a - _b,b)
}