/**
 *
 You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

 You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 Follow up:
 What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

 Example:

 Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
 Output: 7 -> 8 -> 0 -> 7
 * **/
var addTwoNumbers = function(l1, l2) {
    const stacks1 = []
    const stacks2 = []
    while (l1){
        stacks1.push(l1.val)
        l1 = l1.next
    }
    while (l2){
        stacks2.push(l2.val)
        l2 = l2.next
    }
    let carry = 0, prev = null,curr = null;
    while (stacks1.length || stacks2.length || carry){
        let x = stacks1.length ? stacks1.pop() : 0;
        let y = stacks2.length ? stacks2.pop() : 0;
        let sum = x + y + carry
        let val = sum % 10;
        carry = sum > 9 ? 1: 0
        curr = {val,next:null};
        curr.next =  prev;
        prev = curr;
    }
    return curr
};
