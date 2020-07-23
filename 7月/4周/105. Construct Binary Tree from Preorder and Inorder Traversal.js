/**
 *
 Given preorder and inorder traversal of a tree, construct the binary tree.

 Note:
 You may assume that duplicates do not exist in the tree.

 For example, given

 preorder = [3,9,20,15,7]
 inorder = [9,3,15,20,7]
 Return the following binary tree:

 3
 / \
 9  20
 /  \
 15   7
 *
 */
function TreeNode(val) {
    this.val = val
    this.left = this.right = null
}
// 不是自己想出来的，一开始没想到前序和中序的关系
// keyPoint: 前序遍历的第一个节点为跟节点，在中序遍历中查找
// 出来这个节点对应的下标，那么可以确定这个节点的左子树和右子树的前序与中序范围
// 左子树的前序 pre_left + 1 ~~ pre_left + subLeftTreeSize
//        中序 in_left -- in_left + subLeftTreeSize -1
// 右子树的前序  pre_left + subLeftTreeSize + 1 -- pre_right
//        中序  in_left + subLeftTreeSize + 1 --  in_right
var buildTree = function(preorder, inorder) {
    const myBuildTree = (pre_start,pre_end,in_start,in_end)=>{
        if(pre_start > pre_end) return null
        const preorder_root_index = pre_start;
        const preorder_root_value = preorder[pre_start];
        const inorder_root_index = inorder.indexOf(preorder_root_value)
        const leftTreeSize = inorder_root_index - in_start;
        const root = new TreeNode(preorder_root_value)
        root.left = myBuildTree(
            pre_start+1,pre_start + leftTreeSize,
                    in_start,inorder_root_index - 1
            )
        root.right = myBuildTree(
            pre_start + leftTreeSize + 1,pre_end,
                    inorder_root_index+1, in_end
            )
        return root
    }
    let n = preorder.length - 1;
    return myBuildTree(0,n,0,n)
};

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]))
