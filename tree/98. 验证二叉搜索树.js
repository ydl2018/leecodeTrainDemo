/**
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
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
 * @return {boolean}
 */

// 思路：

// 1. 深度优先遍历
//  由于要比较是否是二叉搜索树
//  涉及到父节点要比左子节点大，比右节点小
//  可以采取中序遍历，使用1个变量记录前一遍历的结果，
//  如果当前结果小于之前的结果，那么放弃遍历
const node = {val:5,left:{val:1,left:null,right:null},right:{
    val:4,left:{val:3,left:null,right:null},right:{val:6,left:null,right:null}
}}
var isValidBST = function(root) {
    let currentNode = root;
    let lastValue =  -Infinity;
    const stacks = [];
   
    while(currentNode || stacks.length){
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        currentNode = stacks.pop();
      
        
        if(currentNode.val>lastValue){
            lastValue = currentNode.val
            currentNode = currentNode.right
        }else{
            return false
        }
    }
    return true
};
console.log(isValidBST(node));
