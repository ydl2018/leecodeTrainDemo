/**
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

 You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 Example:

 Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 Output: 7 -> 0 -> 8
 Explanation: 342 + 465 = 807.

 * **/
// 未知原因不可以通过 1560/1563
var addTwoNumbers = function(l1, l2) {
    let num1 = '',num2 = '';
    while (l1){
        num1 = l1.val + num1;
        l1 = l1.next
    }
    while (l2){
        num2 = l2.val + num2;
        l2 = l2.next
    }
   let resultNUm = +num1 + +num2 ;
    let result = {}
    const resultArr = resultNUm.toString().split('').reverse();
       resultArr.reduce((prev,cur,index)=>{
        prev.val = cur;
        return index !== resultArr.length -1 ? (prev.next = {}) : (prev.next = null)
    },result)
    return result
};

var addTwoNumbers = function(l1, l2) {
    let result = {},cur = result,carry = 0;
    while (l1 !== null || l2 !== null){
        let x = (l1 !== null) ? l1.val : 0;
        let y = (l2 !== null) ? l2.val : 0;
        let sum = x + y + carry;
        let val = sum % 10;
        carry = sum > 9 ? 1 : 0
        cur.next = {val,next:null}
        cur = cur.next
        l1 = l1 !== null ? l1.next : null;
        l2 = l2 !== null ? l2.next : null;
    }
    if(carry > 0){
        cur.next = {val:carry,next:null}
    }
    return result.next
}

const revertLinkList = (link)=>{
    let cur = link,prev;
    while (cur){
        let temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
    }
    return prev
}
