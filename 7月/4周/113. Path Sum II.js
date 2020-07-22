/**
 * Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

 Note: A leaf is a node with no children.

 Example:

 Given the below binary tree and sum = 22,

 5
 / \
 4   8
 /   / \
 11  13  4
 /  \    / \
 7    2  5   1
 Return:

 [
 [5,4,11,2],
 [5,8,4,5]
 ]

 * **/

  function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
  }
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */

// 回溯算法： 不是自己想出来的，要复习

var pathSum = function(root, sum) {

    let total = 0;
    const result = [];
    const backTrace = (root,stacks)=>{
        if(!root) return
        total += root.val;
        stacks.push(root.val)
        if(!root.left && !root.right) {
            if (sum === total) {
                result.push(stacks.concat())
            }
        }
        if(root.left){backTrace(root.left,stacks)}
        if(root.right){backTrace(root.right,stacks)}

        total -= root.val;
        stacks.pop()
    }
    backTrace(root,[])
    return result
};
