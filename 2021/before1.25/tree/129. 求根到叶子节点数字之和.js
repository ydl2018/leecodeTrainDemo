/**
 *
 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

 例如，从根到叶子节点路径 1->2->3 代表数字 123。

 计算从根到叶子节点生成的所有数字之和。

 说明: 叶子节点是指没有子节点的节点。

 示例 1:

 输入: [1,2,3]
 1
 / \
 2   3
 输出: 25
 解释:
 从根到叶子节点路径 1->2 代表数字 12.
 从根到叶子节点路径 1->3 代表数字 13.
 因此，数字总和 = 12 + 13 = 25.
 示例 2:

 输入: [4,9,0,5,1]
 4
 / \
 9   0
 / \
 5   1
 输出: 1026
 解释:
 从根到叶子节点路径 4->9->5 代表数字 495.
 从根到叶子节点路径 4->9->1 代表数字 491.
 从根到叶子节点路径 4->0 代表数字 40.
 因此，数字总和 = 495 + 491 + 40 = 1026.
 *
 * **/

var sumNumbers = function(root) {
    const result = []
    const cursive = (node,prevVal = '')=>{
        if(!node) return
        let curV =  prevVal + node.val;
        if(!node.left && !node.right){
            result.push(curV)
        }else{
            cursive(node.left,curV)
            cursive(node.right,curV)
        }
    }
    cursive(root)
    return result.reduce((prev,cur)=>prev+parseInt(cur),0)
};

// 优雅的做法：省略stacks作为缓存，因为我们组成的是数字
// 那么可以转换为 a *100 + b *10 + c*1这种思路
var sumNumbers = function(root) {
    const dfs = (node,prevVal)=>{
        // when, parentNode不是叶子节点，此时应该返回0
       if(node == null) return 0
        let sum = prevVal * 10 + node.val
        if(root.left == null && root.right  == null){
            // 复习易错点：记住是叶子节点就直接返回
            return sum
        }else{
            return dfs(node.left,sum) + dfs(node.right,sum)
        }
    }
    return dfs(root)
};


console.log(sumNumbers({val: 1, left: {val: 2}, right: {val: 3}}))
