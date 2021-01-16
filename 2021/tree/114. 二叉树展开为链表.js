/**
 * 给定一个二叉树，原地将他展开为1个单链表
 *
 * 例如，给定二叉树

 1
 / \
 2   5
 / \   \
 3   4   6
 将其展开为：

 1
 \
 2
 \
 3
 \
 4
 \
 5
 \
 6

 * */

var flatten = function(root) {
    //  按照例子，是将二叉树前序遍历，然后将结果依次赋值到新的节点上
    const preOrderList = []
    const preOrder = (root)=>{
        if(!root) return
        preOrderList.push(root)
        preOrder(root.left)
        preOrder(root.right)
    }
    // rebuild
    let newRoot = preOrderList.splice(0,1)
    let ptr = newRoot
    preOrderList.forEach(node=>{
        newRoot.right = node
        newRoot.left = null
        newRoot = newRoot.right
    })
    newRoot.right = null
    return ptr
};

// 思路2：如何将在前序遍历时对节点进行展开
// 展开会丢失右节点的信息，存不存在一种前序遍历，可以获取到缓存到右节点信息？

// 前序遍历1 :此方法不可行，因为是访问该节点之后，再在原有节点上找有右节点
var preorderTrasveral = (tree)=>{
    const stacks = [];
    let currentNode = tree;
    let str = '';
    while(stacks.length || currentNode){
        // loop to left
        while(currentNode){
            str += currentNode.val;
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }

        currentNode = stacks.pop().right;
    }

    return str;
}
// 前序遍历2：递归，与上面思路一致，不可行，也是在修改节点指向时，丢失右节点

// 前序遍历3:入栈时，先入栈右节点，再入栈左节点

var preorderTrasveral2 = (tree) => {
    const stacks = []
    stacks.push(tree)
    while (stacks.length) {
        let curr = stacks.pop()
        console.log(curr.val)
        if (curr.right) {
            stacks.push(curr.right)
        }
        if (curr.left) {
            stacks.push(curr.left)
        }
    }
}
const node = {val:1,left:{val:'2',left:{val:'3',left:null,right:null},right:null},right:{val:'4',left:null,right:null}}
// 前序遍历  1 2 3 4
// 中序遍历  3 2 1 4
// 后序遍历  3 2 4 1
// preorderTrasveral2(node)


// 1.实践成功

// 完善题目
var flatten = function(root) {
    if(root == null) return
    const stacks = [root]
    let prev = null
    while (stacks.length){
        let curr = stacks.pop()
        if(prev){
            prev.right=  curr;
            prev.left = null
        }
        if (curr.right) {
            stacks.push(curr.right)
        }
        if (curr.left) {
            stacks.push(curr.left)
        }
        prev = curr
    }
}

// 寻找前驱节点，结合morris算法来理解

var flatten = function (root) {
    let curr = root;
    while(curr !== null){
        if(curr.left){
            let predecessor = curr.left
            while (predecessor.right){
                predecessor = predecessor.right
            }
            predecessor.right = curr.right
            curr.right = curr.left
            curr.left = null
        }
        curr = curr.right
    }
    return root
}
