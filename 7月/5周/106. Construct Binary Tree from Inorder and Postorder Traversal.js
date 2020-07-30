/**
 * Given inorder and postorder traversal of a tree, construct the binary tree.

 Note:
 You may assume that duplicates do not exist in the tree.

 For example, given

 inorder = [9,3,15,20,7]
 postorder = [9,15,7,20,3]
 Return the following binary tree:

 3
 / \
 9  20
 /  \
 15   7

 来源：力扣（LeetCode）
 链接：https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal
 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
// 后续 关键在于最后的节点为跟节点
var buildTree = function(inorder, postorder) {
    const helper = (in_left,in_right,post_left,pos_right)=>{
        if(in_left > in_right) return null
        const root = {left:null,right:null,val:postorder[pos_right]}
        const inorderIndex = inorder.indexOf(root.val)
        let len = inorderIndex - in_left
        root.left = helper(in_left,inorderIndex-1,post_left,post_left + len - 1)
        root.right = helper(inorderIndex+1,in_right,post_left  + len,pos_right-1)
        return root
    }
    return helper(0,postorder.length-1,0,postorder.length-1)
};
console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
