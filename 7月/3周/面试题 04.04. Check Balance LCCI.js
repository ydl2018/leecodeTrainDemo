/**
 Implement a function to check if a binary tree is balanced.
 For the purposes of this question,
 a balanced tree is defined to be a tree such that
 the heights of the two subtrees of any node never differ by more than one.

 Example 1:

 Given tree [3,9,20,null,null,15,7]
 3
 / \
 9  20
 /  \
 15   7
 return true.
 Example 2:

 Given [1,2,2,3,3,null,null,4,4]
 1
 / \
 2   2
 / \
 3   3
 / \
 4   4
 return false.
 **/
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
var isBalanced = function(root) {
    if(!root) return true
    if(Math.abs(getDeepLevel(root.left) - getDeepLevel(root.right)) > 1){
        return false
    }
    return isBalanced(root.left) && isBalanced(root.right)
};
const cacheMap = new Map();
const getDeepLevel = (root,level = 0)=>{
    let _level = level;
    if(root){
        if(cacheMap.has(root)){
            return cacheMap.get(root) + level
        }
        level++
        level = Math.max(getDeepLevel(root.left,level),getDeepLevel(root.right,level))
        cacheMap.set(root,level - _level)
    }
    return level
}
 const treeNode = {left:{val:0,left:{val:1,right:{val:2}}}}

 var isBalanced = function(root) {
    let result = true
     if(!root) return result
     var dfs = (root)=>{
         if(root == null) return 0
         let left = dfs(root.left);
         let right = dfs(root.right)
         if(Math.abs(left - right) > 1){
             result =  false
         }
         return Math.max(left,right) + 1
     }
     dfs(root)
    return result

};


console.log(getDeepLevel(treeNode));
