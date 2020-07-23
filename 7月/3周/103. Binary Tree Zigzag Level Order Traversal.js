/**
 * Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its zigzag level order traversal as:
[
  [3],
  [20,9],
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
var zigzagLevelOrder = function(root) {
    let direction = true,queue = [root], num = 1,currentLevelArr = [],result = [];
    while(queue.length){
        let currentNode = queue.shift();
        if((direction)){
            currentLevelArr.push(currentNode.val)
        }else{
            currentLevelArr.unshift(currentNode.val)  
        }
       
       
        if(currentNode.left){
            queue.push(currentNode.left)
        }
        if(currentNode.right){
            queue.push(currentNode.right)
        }
        num--;
        if(num == 0){
            direction = !direction
            result.push(currentLevelArr.concat());
            currentLevelArr.length = 0;
            num = queue.length;
        }
    }
    return result
};
const treeNode = {val:3,left:{val:9,left:null,right:null},right:{val:20,left:{val:15,left:null,right:null},right:{val:7,left:null,right:null}}}
console.log(levelOrder(treeNode));