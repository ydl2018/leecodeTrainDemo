/**
 * 
Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1 ... n.

Example:

Input: 3
Output:
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
Explanation:
The above output corresponds to the 5 unique BST's shown below:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
 

Constraints:

0 <= n <= 8
 */

 // 思路一：回溯法，这个思路不是自己想出来的，一开始看这道题没思路
 // 没思路的原因是没有按照正常的思路去思考，不要局限于动态规划

 /**
 * Definition for a binary tree node.
 * 
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    const resList = [];
    const hashStack = [];
    //难点1，递归传递什么参数呢？
    const backtrack = ()=>{
        // 难点2，如何判断已经构成了一个bitSearchTree了呢?
        // if(hashStack.length )
        // for(let )
    }
};
// 放弃

// 思路二：递归思路：参考官方，但是官方提交的卡特兰数，C(n+1) = C(0)C(n) + ...C(n)C(0),不理解，需要做回第一题
var generateTrees = function(n) {
    const generateTree = function (start,end) {
        const allTrees = [];
        if(end< start){
            allTrees.push(null)
            return allTrees
        }
        for(let i = start; i <=end ; i++){
            const leftTrees = generateTree(start,i-1);
            const rightTrees = generateTree(i+1,end);
            leftTrees.forEach(left=>{
                rightTrees.forEach(right=>{
                    allTrees.push({left,right,val:i})
                })
            })
        }
        return allTrees
    }
    if( n == 0){
        return []
    }
    return generateTree(1,n)
};

// 解法二：由于搜索二叉树的特质，每次插入最大值，只能在根节点，根节点的右子树，根节点的右子树的右子树

var generateTrees = function(n) {

    let dep = [];
    if(n < 1){
        return dep
    }
    dep.push(new TreeNode(1));
    for(let i = 2; i <=n; i++){
        const cur = [];
        // 1. 插入根节点
        for(let tree of dep){
            // 插入根节点
           let newRoot = new TreeNode(i);
           newRoot.left = tree;
            cur.push(newRoot);

            // 插入到子节点之中
            for(let j = 0; j <= n; j++){
                let curTree = TreeCopy(tree);
                let right = curTree;
                for(let k = 0; k < j; k++){
                    if(right == null){
                        break;
                    }
                    right = right.right;

                }
                if(right == null){
                    break;
                }
                const rightTree = right.right;
                const newNode = new TreeNode(i);
                right.right = newNode;
                newNode.left = rightTree;
                cur.push(curTree);
            }
        }
        dep = cur;
    }
    return dep
};
function TreeNode(val) {
         this.val = val;
        this.left = this.right = null;
 }
 function TreeCopy(tree) {
     return tree == null ? tree : JSON.parse(JSON.stringify(tree));
 }


