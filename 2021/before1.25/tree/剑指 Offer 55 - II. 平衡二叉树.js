/**输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

  

 示例 1:

 给定二叉树 [3,9,20,null,null,15,7]

 3
 / \
 9  20
 /  \
 15   7
 返回 true 。

 示例 2:

 给定二叉树 [1,2,2,3,3,null,null,4,4]

 1
 / \
 2   2
 / \
 3   3
 / \
 4   4
 返回 false 。
**/
var getDeep = (root)=>{
    if(!root){
        return 0
    }
    const dl = getDeep(root.left)
    const dr = getDeep(root.right)
    if(dl === -1 || dr=== -1){
        return -1
    }
    if(Math.abs(dl - dr) > 1){
        return -1
    }
    return Math.max(dl,dr) + 1
}

var isBalanced = function(root) {
    return getDeep(root) !== -1
};
