/**
 * Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
// 递归
var hasPathSum = function(root, sum) {
    const caculate = (root,total)  => {
        if(root == null){
            return false
        }
        // only caculate leaf node 
        if(root.left  == null && root.right == null){
            return sum == total + root.val
        }
      return caculate(root.left,total + root.val) || caculate(root.right,total + root.val)
    }
    return  caculate(root,0)
};

// BFS
var hasPathSum = function(root, sum) {
    if(root == null){
        return false
    }
    const queue = [];
    queue.push({currentNode:root,total:root.val});
    
    while(queue.length){
       let {currentNode,total} = queue.shift();
        if(currentNode.left == null && currentNode.right == null){
            if(total == sum){
                return true;
            }
        }
        if(currentNode.left){
            queue.push({currentNode:currentNode.left,total:total + currentNode.left.val})
        }
        if(currentNode.right){
            queue.push({currentNode:currentNode.right,total:total + currentNode.right.val})
        }

    }
    return false
}
