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
var mergeKLists = function(lists) {
    let resNode = null;
    // while ()
};
