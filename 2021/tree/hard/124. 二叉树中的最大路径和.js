/**
 *
 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径 至少包含一个 节点，且不一定经过根节点。

 路径和 是路径中各节点值的总和。

 给你一个二叉树的根节点 root ，返回其 最大路径和 。



 示例 1：


 输入：root = [1,2,3]
 输出：6
 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6

 输入：root = [-10,9,20,null,null,15,7]
 输出：42
 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42


 * ***/

// 后序遍历,因为计算完一个节点内部的值再往上走
var maxPathSum = function(root) {
    if(!root) return 0
    let result = -Infinity;
    const dfs = (node)=>{
        if(!node) return 0
        const leftResult = dfs(node.left)
        const rightResult = dfs(node.right)

        let curV = node.val

        if(leftResult > 0 && rightResult <= 0 ){
            curV += leftResult
        }

        if(leftResult <= 0 && rightResult > 0 ){
            curV += rightResult
        }

        if(leftResult > 0 && rightResult > 0){
            result = Math.max(leftResult+rightResult+curV,result)
            curV +=  Math.max(leftResult,rightResult)
        }
        result = Math.max(result,curV)
        return curV
    }
    dfs(root)
    return result
};

// 优化 1. 对于每一个节点，子节点 > 0，取子节点的值；如果子节点 <= 0 ,则子节点的值视为 0
//     2. 具有两种形式：（1）以该节点作为链表出口的末端；（2）该节点不作为链表头和尾

// keyPoint : 关键在思考何时才选取子节点的值

// 总结思路：
//      1.分析：对于一个节点来说，它的最大值可以怎么算？
//          1.1 作为链表的尾端，
//          1.2不作为链表的尾端
//      2. 计算最大值时，左节点和右节点是否可以直接取值？如果不可以，分为哪几种情况：
//          2.1 大于 0；
//          2.2：小于0 ；
//          2.3 等于 0
//      3. 分析2，归纳结论：子节点值小于等于0时视作0，大于0时不做任何操作
//      4. 要先计算左右节点，最后再计算此节点，采取哪种方式遍历 ？ => 后序遍历


var maxPathSum = function(root) {
    if(!root) return 0
    let result = -Infinity;
    const dfs = (node)=>{
        if(!node) return 0
        let leftResult = Math.max(dfs(node.left),0);
        let rightResult = Math.max(dfs(node.right),0);
        // (1) 该节点不作为链表和链尾
        result =  Math.max(leftResult + rightResult+node.val,result)
        // (2) 该节点作为链表的尾部
        let curNodeResult = Math.max(leftResult,rightResult)+node.val
        result = Math.max(curNodeResult,result)
        return curNodeResult
    }
    dfs(root)
    return result
}
const unitTest_1 = maxPathSum({val:1,left:{val:2},right:{val:3}})
const unitTest_2 = maxPathSum({val:-10,left:{val:9},right:{val:20,left:{val:15},right:{val:7}}})
console.log(unitTest_1)
// expected 6
console.log(unitTest_2)
// expected 42

