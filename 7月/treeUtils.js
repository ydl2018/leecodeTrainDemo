class TreeNode{
    constructor(val){
        this.left = null;
        this.right = null;
        this.val = val;
    }
}

/**
 * determine  trees are equal 
 * @param {*} tree1 
 * @param {*} tree2 
 */
const isSameTree = (tree1,tree2)=>{
    if(tree1 == null  && tree2 == null){
        return true;
    }
    // key step
    if(tree1 == null || tree2 == null){
        return false
    }

    if(tree1.val !== tree2.val){
        return false
    }
    return isSameTree(tree1.left,tree2.left) && isSameTree(tree1.right,tree2.right)
}
// 思路1： 利用二叉搜素树中序遍历是单调递增的特性
const isValidBST = (tree)=>{
    if(!tree){
        return 
    }
    const stacks = [];
    let currentNode = tree;
    let lastValue = -Infinity;

    while(stacks.length || currentNode){
        stacks.push(currentNode)
    }
    currentNode = stacks.pop();
    if(currentNode.val > lastValue){
        currentNode = currentNode.right;
    }else{
        return false
    }
    return true;
}

// 对于左节点来说，一定要比父节点小，也要比父节点（作为其父级的右节点）的父节点要大

// 对于右节点来说，一定要父节点要大，也要比父节点（作为其父级的左节点）的父节点要小

// 初始化逻辑：1. 对于根节点来说，一开始没有任何限制，所以min和max都是null


const isValidBSTByRecursive = (node)=>{
 const recursive = (node,min,max)=>{
    if(min !== null && node.val <= min.val){
        return false
    }

    if(max != null && node.val >= max.val){
        return false;
    }
    return recursive(node.left,min,node) && recursive(node.right,node,max)
 }
 return recursive(node,null,null)
}

const isInBST = (tree,val)=>{
    if(!tree){
        return false
    }

    if(tree.val  == val){
        return true;
    }

   return tree.val < val ? isInBST(tree.right,val) : isInBST(tree.left,val)
}

const findNodeInBST = (tree,val)=>{
    while(tree){
        if(tree.val  == val){
            return tree
        }
        tree = tree.val < val ? tree.right : tree.left;
    }
    return null
}

// insert node to binary search tree, return true represent insert successfully, return false represent the val is exsisted

const insertIntoBST = (val,tree)=>{
    const toInsertNode = new TreeNode(val);
    while(tree){
        if(tree.val == val){
           return false
        }
        if(tree.val < val){
            if(tree.right == null){
                tree.right = toInsertNode;
            }else{
                tree = tree.right;
            }
        }else{
            if(tree.left == null){
                tree.left = toInsertNode;
            }else{
                tree = tree.left;
            }
        }
    }
    return true;
}

module.exports = {
    isSameTree,
    isValidBSTByRecursive,
    isValidBST,
    insertIntoBST
}