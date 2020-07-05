/**
 * Given two binary trees, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical and the nodes have the same value.

Example 1:

Input:     1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

Output: true
Example 2:

Input:     1         1
          /           \
         2             2

        [1,2],     [1,null,2]

Output: false
Example 3:

Input:     1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

Output: false

 */

 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function TreeNode(val) {
       this.val = val;
       this.left = this.right = null;
}

   // 前序 中序 | 后序 中序 唯一确定一棵树

   // 前序 后序 不可确定一棵树
// 复习 前序

// 思路，优先往左边走，走到左边的尽头了，然后从栈里取值，往右边走

const node = {val:1,left:{val:'2',left:{val:'3',left:null,right:null},right:null},right:{val:'4',left:null,right:null}}
// 前序遍历  1 2 3 4
// 中序遍历  3 2 1 4
// 后序遍历  3 2 4 1

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
    console.log(str);
    
    return str;
}

// 中序遍历
var middleTrasversal = (tree)=>{
    const stacks = [];
    let currentNode = tree;
    let str = '';
    while(stacks.length || currentNode){
        // loop to left
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        currentNode = stacks.pop()
        str += currentNode.val;
        currentNode = currentNode.right;
    }
    console.log(str);
    
    return str;
}

// 后序遍历

var afterTrasversal = (tree) => {
    const stacks = [];

    let currentNode = tree;

    // 记录上一次访问的位置
    let lastVisit = null;

    while(stacks.length  || currentNode){
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }

        currentNode = stacks[stacks.length - 1];
        if(!currentNode.right || lastVisit == currentNode.right){
            let temp = stacks.pop();
            lastVisit = temp;
            currentNode = null;
        }else{
            currentNode = currentNode.right;
        }
     }
}


  
// 思路1： 前序 中序 遍历出来的结果，进行对比
// 思路错误，如果节点值都相同怎么办？

var isSameTree = function(p, q) {
    if(preorderTrasveral(p) === preorderTrasveral(q) && middleTrasversal(p) === middleTrasversal(q)){
        return true
    }else{
        return false
    }
};

const testUnitNode1 = {
    val:1,
    left:{val:1,left:null,right:null},
    right:null
}
const testUnitNode2 = {
    val:1,
    left:null,
    right:{val:1,left:null,right:null}
}

// 思路二：递归对比
var isSameTree = function(p, q) {
    const excursive  = (p,q)=>{
        if(p == null && q == null){
            return true;
        }
        if(p == null || q == null){
            return false;
        }
        if(p.val !== q.val){
            return false
        }

        return excursive(p.left,q.left) && excursive(p.right,q.right)
    }
    return excursive(p,q);
}

// 思路三：迭代,与递归思路一致,两棵树拿出相同的节点，如果不相同，就返回

var isSameTree = function(p, q) {
    const check = (node1,node2)=>{
        if(node1 == null  && node2 == null){
            return true
        }
        if(node2 == null || node1 == null){
            return false
        }

        return node1.val == node2.val;
    }

    const dp = [[p,q]];

    while(dp.length){
        [p,q] = dp.shift();
        
        if(check(p,q)){
            if(p){
                dp.push([p.left,q.left],[p.right,q.right])
            }

        }else{
            return false
        }
    }

    return true;
}

console.log(isSameTree(testUnitNode1,testUnitNode2));
