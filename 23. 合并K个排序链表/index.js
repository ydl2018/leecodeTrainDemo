// 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 使用一个数组Map记录list里每一个node
// 设置一个resNode为返回的node节点
    // 进行while循环，每次取出Map的节点里val属性是最小值的node节点node1，
    // 将它的子节点添加到当前Map数组对应的索引上
    // 将node1添加到当前resNode的next属性
    // 如果当前Map数组都是空节点，那么结束遍历
// 返回resNode
var mergeKLists = function (lists) {
        let resNode, originNode;
        resNode = originNode = {val: null, next: null};
        const Map = lists.filter(v => v && v.val !== null)
        while (Map.length) {
            const min = Math.min(...Map.map(v => v.val))
            // 获取最小的node节点
            const curIndex = Map.findIndex(v => v.val === min)
            const curNode = Map[curIndex];
            resNode.next = curNode;
            resNode = resNode.next;
            if (curNode.next !== null) {
                Map[curIndex] = curNode.next;
            } else {
                Map.splice(curIndex, 1)
            }
        }
        return originNode.next
    };
// 分治 分为两个链表，依次合并
var mergeKLists = function (lists) {
    const fn = (lists, start, end) => {
        if (start === end) return lists[start]
        const mid = Math.floor((start + end) / 2);
        let l1 = fn(lists, start, mid);
        let l2 = fn(lists, mid+1, end)
        if (!l1 || !l2) return l1 ? l1 : l2;

        let resPtr;
        const headPtr =  resPtr = {val:null,next:null};
        while (l1 && l2) {
            if (l1.val > l2.val) {
                resPtr.next = l2;
                resPtr = resPtr.next;
                l2 = l2.next;
            } else {
                resPtr.next = l1;
                resPtr = resPtr.next;
                l1 = l1.next;
            }
        }
        if(l1){
            resPtr.next = l1
        }else{
            resPtr.next = l2
        }
        return headPtr.next
    }
    if(!lists.length) return lists
    return fn(lists,0,lists.length-1)
}
// 从c++ 解法推出的分治 todo
var mergeKLists = function (lists) {
    const merge = (l1,l2)=>{
        let headPtr, originHeadPtr;
        headPtr = originHeadPtr = {val:null,next:null}
        while (l1 && l2){
            if(l1.val > l2.val){
                headPtr.next = l1
                l1 = l1.next;
            }else{
                headPtr.next = l2;
                l2 = l2.next
            }
        }
        if(l1){
            headPtr.next = l1
        }else{
            headPtr.next = l2
        }
        return originHeadPtr.next
    }
    // for(let i =0 ; i)
}
const modelData = [
    {val: 1, next: {val: 4, next: {val: 5, next: null}}},
    {val: 1, next: {val: 3, next: {val: 4, next: null}}},
    {val: 2, next: {val: 6, next: null}}
]
console.log(mergeKLists(modelData));
