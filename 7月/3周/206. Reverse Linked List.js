/***

 Reverse a singly linked list.

 Example:

 Input: 1->2->3->4->5->NULL
 Output: 5->4->3->2->1->NULL
 Follow up:

 A linked list can be reversed either iteratively or recursively. Could you implement both?
 **/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 思路：对于节点a，缓存节点a的next节点，然后让节点a指向前一个节点，接着更新节点a和上一个节点
var reverseList = function (head) {
    let cur = head, prev = null;
    while (cur) {
        let temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp
    }
    return prev
};

var reverseList = function (head) {
    if(head == null  || head.next == null){
        return head
    }
    let cur = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return cur
}
