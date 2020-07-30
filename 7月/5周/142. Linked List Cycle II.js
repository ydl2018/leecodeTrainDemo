/*
*
Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.

Note: Do not modify the linked list.
* */
// 1. hashLink 省略

// a为到达环状链表入口前的距离，b为坏状链表的大小
// f 为快指针，速度为慢指针的2倍
// 2. f = 2s; f = s + nb = > f = 2nb; s = nb n为未知值
// 链表入口所值 = nb + a

// 关键点当两个节点相遇时，
// 推断出 s = nb, 并且 环形链表起点是 s = nb + a
var detectCycle = function(head) {
   let fast, slow;
   fast = slow = head
    while (true){
       if(!fast || !fast.next) return null
        fast = fast.next.next
        slow = slow.next
        if(fast === slow) break
    }
    fast = head
    while (fast !== slow){
       fast = fast.next
        slow = slow.next
    }
    return slow
}
