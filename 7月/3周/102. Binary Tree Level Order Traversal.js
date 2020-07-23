/**
 * Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
]


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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(root == null){
        return []
    }
    let queue = [],result = [],currentLevelArr = [], num = 1;
    queue.push(root);
    while(queue.length){
       let currentNode =  queue.shift()
        num--;
        currentLevelArr.push(currentNode.val)
    
        if(currentNode.left){
            queue.push(currentNode.left)
        }
        if(currentNode.right){
            queue.push(currentNode.right)
        }
        if(num === 0){
            result.push(currentLevelArr.concat())
            currentLevelArr.length = 0
            num = queue.length;
        }   
    }
    return result
};
const treeNode = {val:3,left:{val:9,left:null,right:null},right:{val:20,left:{val:15,left:null,right:null},right:{val:7,left:null,right:null}}}
console.log(levelOrder(treeNode));
