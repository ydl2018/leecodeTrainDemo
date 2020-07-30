/****
 * Given a linked list, determine if it has a cycle in it.

 To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.

  

 Example 1:

 Input: head = [3,2,0,-4], pos = 1
 Output: true
 Explanation: There is a cycle in the linked list, where tail connects to the second node.

 * ***/

var hasCycle = function(head) {
    if(head == null || head.next == null) return false
    let fastP,slowP;
    slowP = head
    fastP = head
    while (true){
        if(fastP == null || fastP.next == null){
            return false
        }
        slowP = slowP.next
        fastP = fastP.next.next
        if(slowP === fastP) return true
    }
};

const curLinkList = {val:2,next:{val:0,next:{val:4,next:curLinkList}}}
const testUnit = {val:3,next:curLinkList}
console.log(hasCycle(testUnit));
