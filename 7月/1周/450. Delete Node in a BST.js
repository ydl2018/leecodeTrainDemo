/**
 * 
 * @paramGiven a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

Search for a node to remove.
If the node is found, delete the node.
Note: Time complexity should be O(height of tree).

Example:

root = [5,3,6,2,4,null,7]
key = 3

    5
   / \
  3   6
 / \   \
2   4   7

Given key to delete is 3. So we find the node with value 3 and delete it.

One valid answer is [5,4,6,2,null,null,7], shown in the following BST.

    5
   / \
  4   6
 /     \
2       7

Another valid answer is [5,2,6,null,4,null,7].

    5
   / \
  2   6
   \   \
    4   7

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/delete-node-in-a-bst
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

const { rootCertificates } = require("tls");

// keypoint steps
// 1. search tree and find the to-delete node
// 2. find the to-delete node's left node, cache left's right node; find its right node ,then find the right node's  last left leaf
// 3. delete to-delete node, move left node to privious position, move left's right node to right node's last left leaf

const setChildNode = (parentNode,position,childNode = null)=>{
    if(parentNode) parentNode[position] = childNode;
}


var deleteNode = (tree,val)=>{
    let pt = tree, 
    toDeleteNode = null,parentNode = null,
    toDeleteNodeLeft,toDeleteNodeRight,toDeleteNodeLeft_Right,
    toDeleteNodeRight_leafLeft,position;

    // get to deleteNode and its parent and the position
    while(tree){
        if(tree.val == val){
            toDeleteNode = tree;
            break;
        }
        parentNode = tree;

        if(tree.val < val){
            position = 'right';
            tree = tree.right;
        }else{
            position = 'left';
            tree = tree.left; 
        }
    }

    if(toDeleteNode == null){
        return pt
    }

    // search to move upon's node and cache 
    toDeleteNodeLeft  = toDeleteNode.left;
    toDeleteNodeRight = toDeleteNode.right;

   
    // condition 1 : to-delete node is  a leaf node
    if(toDeleteNodeLeft == null && toDeleteNodeRight == null){
        setChildNode(parentNode,position)
        return parentNode ?  pt : null
    }

    // condition 2 : to-delete node only has one childNode
    if(toDeleteNodeLeft == null || toDeleteNodeRight == null){
        let toAppendNode ;
        if(toDeleteNodeLeft){
            toAppendNode = toDeleteNodeLeft;
            toDeleteNode.left = null;
        }else{
            toAppendNode = toDeleteNodeRight;
            toDeleteNode.right = null;
        }

        setChildNode(parentNode,position,toAppendNode);
        return  parentNode ?  pt : toAppendNode
    }
    
    // condition 3 : to-delete node has two childNodes

    // find to-delete node's left right node and find to-delete node's right node's last left node 
    toDeleteNodeLeft_Right = toDeleteNodeLeft.right;
    toDeleteNodeRight_leafLeft = toDeleteNodeRight;

    while(toDeleteNodeRight_leafLeft && toDeleteNodeRight_leafLeft.left){
        toDeleteNodeRight_leafLeft = toDeleteNodeRight_leafLeft.left;
    }


    // move to-upon node's right node to to-delete node's right node's last left node 
    // move  to-delete right node to-upon node's right
    toDeleteNodeRight_leafLeft.left = toDeleteNodeLeft_Right;
    toDeleteNodeLeft.right = toDeleteNodeRight;
    

    // rise the to-upon node , cut the to-delete node
    setChildNode(parentNode,position,toDeleteNodeLeft);
    toDeleteNode.left = null;
    toDeleteNode.right = null;
    return parentNode ?  pt :  toDeleteNodeLeft;
}   
// 方法1优化：让右边升，左边升太麻烦

var deleteNode = (tree,val)=>{
    if(tree == null){
        return null
    }
    let temp;
    if(tree.val > val){
        tree.left = deleteNode(tree.left,val)
    }else if(tree.val < val){
        tree.right = deleteNode(tree.right,val)
    }else{
        if(tree.left == null  && tree.right  == null){
            return null
        }else if(tree.left == null){
            return tree.right
        }else if(tree.right == null){
            return tree.left
        }else{
            temp = tree.right;
            while(temp.left){
                temp = temp.left
            }
            temp.left = tree.left;
            return tree.right
        }
    }
    return tree
}

// 方法二： 利用二叉树的中序遍历是单调递增的特性 

// 如果有左节点，意味着前继节点在下面，将前继节点的值放到当前节点，在左节点里删除该前继节点
// 如果没有左节点只有右节点的话，意味着后继节点在子节点，将后继节点的值放到当前节点，在右节点里删除后继节点


var deleteNode = (tree,val)=>{
    if(tree == null){
        return null
    }
    if(tree.val > val){
        tree.left = deleteNode(tree.left,val)
    }else if(tree.val < val){
        tree.right = deleteNode(tree.right,val)
    }else{
        if(tree.left == null && tree.right == null){ // leaf
            return null
        }else if(tree.left){
            let leftMax = tree.left;
            while(leftMax.right){
                leftMax = leftMax.right
            } 
            tree.val = leftMax.val;
            tree.left = deleteNode(tree.left,leftMax.val)
        }else{
            let rightMin = tree.right;
            while(rightMin.left){
                rightMin = rightMin.left;
            }
            tree.val = rightMin.val;
            tree.right = deleteNode(tree.right,rightMin.val)
        }
    }
    return tree
}
var deepNode = (tree,val)=>{
    if(tree == null){
        return null
    }
        if(tree.val > val){
            tree.left = deleteNode(tree.left,val);
        }else if(tree.val < val){
            tree.right= deleteNode(tree.right,val)
        }else{
            if(tree.left == null  && tree.right  == null){
                return null
            }else if(tree.left){
                let leftMax = tree.left;
                while(leftMax.right){
                    leftMax = leftMax.right
                }
                tree.val = leftMax.val;
                tree.left = deleteNode(tree.left,val);
            }else{
                let rightMinNode = tree.right;
                while(rightMinNode.left){
                    rightMinNode = rightMinNode.left
                }
                tree.val = rightMinNode.val;
                tree.right = deleteNode(tree.right,val)
            }
        }
   return tree;
}

var deleteNode = (root,val) =>{
    if(!root){
        return null
    }
    if(root.val > val){
        root.left = deleteNode(root.left,val)
    }else if(root.val < val){
        root.right = deleteNode(root.right,val)
    }else{
        if(!root.left && !root.right ){
            return null
        }else if(!root.right){
            return root.left
        }else{
            let rightMin = root.right;
            while(rightMin.left){
                rightMin = rightMin.left;
            }
            rightMin.left = root.left;
            root.left = null;
            return root.right;
        }
    }
    return root
}

const getTreeNode = (arr)=>{
    let treeCollection =  arr.map(val => ( val == null ? null : {left:null,right :null,val}))
    let len = arr.length;
    // nextLevel
    let i = 1;
    let curIndex = 0;
    while(len >= Math.pow(2,i+1)-1){
        let nextLevelStartIndex = Math.pow(2,i)-1
        for(let j = curIndex,curLen = nextLevelStartIndex; j < curLen;++j){
            let subStartIndex = curLen +  2 * (j -curIndex);
            treeCollection[j].left = treeCollection[subStartIndex];
            treeCollection[j].right = treeCollection[subStartIndex+1];
        }
        curIndex = nextLevelStartIndex;
        ++i
    }
    return treeCollection[0]
}

const testUnitNode = getTreeNode([1,null,2])

const result =  deleteNode(testUnitNode,1)
