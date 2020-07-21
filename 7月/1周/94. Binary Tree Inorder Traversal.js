/**
 * Given a binary tree, return the inorder traversal of its nodes' values.

Example:

Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,3,2]
Follow up: Recursive solution is trivial, could you do it iteratively?

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal
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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const result = [];
    const stacks = [];
    let currentNode = root;
    while(currentNode || stacks.length){
        while(currentNode){
            stacks.push(currentNode)
            currentNode = currentNode.left;
        }
        currentNode =  stacks.pop();
        result.push(currentNode);
        currentNode = currentNode.right;
    }
    return result
};

//morris

var inorderTraversal = function(root) {
    const result = []
    while(root){
        if(root.left){
            let leftMax = root.left;
            while(leftMax.right && leftMax.right !== root){
                leftMax = leftMax.right
            }
            if(leftMax.right){
               leftMax.right = null;
            }else{
                leftMax.right = root;

                root = root.left;
                continue;
            }
        }
        result.push(root.val);
        root = root.right;
    }
    return result
};

var inorderTraversal = function(root) {
    // 1. 如果当前root有左节点
    //      1.1 找到左节点的最右节点node1
    //          如果node1的右节点指向 root
    //              root节点往右移动
    //          如果为空
    //              则让node1节点指向root，root节点往左移动
    //      1.2 root节点往右移动
    const result = [];
    while (root){
        if(root.left){
            let maxRight = root.left;
            while (maxRight.right && maxRight.right !== root){
                maxRight = maxRight.right
            }
            if(maxRight.right){
                maxRight.right = null;
            }else{
                maxRight.right = root;
                root = root.left;
                continue
            }
        }
        result.push(root.val)
        root = root.right
    }
}
