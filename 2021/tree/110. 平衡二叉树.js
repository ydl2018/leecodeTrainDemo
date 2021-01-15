/**给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
 **/

// 1. 自底向上的处理手法

var isBalanced = function(root) {
    const getDeep = (root)=>{
        if(!root) return 0
        const dL = getDeep(root.left);
        const dR = getDeep(root.right);

        if(dR == -1 || dL == -1 || Math.abs(dR - dL) > 1){
            return -1
        }
        return Math.max(dL,dR) + 1
    }
    return getDeep(root) !== -1
};

// 2. 自顶向下的处理手法 关键在于这里的理解
const getHeight = (node) => {
    if(!node) return 0
    return Math.max(getHeight(node.left),getHeight(node.right)) + 1
}
var isBalanced = function(root) {
    if(!root) return true
    if(Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1 &&
        isBalanced(root.left)
        &&
        isBalanced(root.right)
    ){
        return true
    }
    return false
}
