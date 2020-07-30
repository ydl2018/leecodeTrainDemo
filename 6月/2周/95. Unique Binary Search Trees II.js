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
// 思路: 每次插入考虑到插入到上方与最右节点，
// 结果错误
var generateTrees = function(n) {
    let stacks = [];
    const cursive = (limit)=>{
        const result = []
        for(let i = 0; i < stacks.length; ++i){
            let dumpHead;
            let item = dumpHead =  JSON.parse(JSON.stringify(stacks[i]));
            while (item.right){
                item = item.right
            }
            item.right = {val:limit,left:null,right:null}
            result.push(dumpHead)

            // 加在上头
            let newNode = {val:limit,left:stacks[i],right : null}
            result.push(newNode)
        }
        stacks = result;
    }
    for(let i  = 1; i<= n; ++i){
        cursive(i)
    }
    return stacks
};
var generateTrees = function(n) {
    const generateTree = (start,end) =>{
        const result = []
        if(start > end){
            result.push(null)
            return result
        }
        for(let i = start;i <=end; ++i){
            const leftTree = generateTree(start,i-1);
            const rightTree = generateTree(i+1,end)

            leftTree.forEach(left=>{
                rightTree.forEach(right=>{
                    const newNode = {
                        left:JSON.parse(JSON.stringify(left)),
                        right:JSON.parse(JSON.stringify(right)),
                        val:i
                    }
                    result.push(newNode)
                })
            })
        }
        return result
    }
    if( n === 0){
        return []
    }
    return generateTree(1,n)
}

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
// 递归复习
var generateTrees = function(n) {
    if(n == 0){
        return []
    }
    const generateTree = (start,end)=>{
        if(end< start){
            return [null]
        }
        const trees = [];
        for(let i  = start; i <= end; i++){
            const leftTrees = generateTree(start,i-1);
            const rightTrees = generateTree(i+1,end);
            leftTrees.forEach(left=>{
                rightTrees.forEach(right=>{
                    trees.push({
                        left,right,val:i
                    })
                })
            })
        }
        return trees
    };

    return generateTree(1,n)
}

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

 // 复习解法二
 var generateTrees = function(n) {
     let prev = [];
     if(n < 1){
         return prev
     }
     prev.push(new TreeNode(1));
     // 对于每一颗二叉搜索树，插入一个最大值，意味着插入到根节点的上方，或者根节点的右节点，或者根节点的右节点的右节点...
     for(let i = 2; i <= n; i++){
         const cur = [];

         prev.forEach(prevTree=>{
              // 插入到根节点
            const newTreeRoot = new TreeNode(i);
            newTreeRoot.left = prevTree;
            cur.push(newTreeRoot);
            // 为什么这么做？ 你怎么知道它的右节点长度是多少？ 我们只能设置一个最大值，合适时break
            for(let j = 1; j <=n; j++ ){
                const copyTree = TreeCopy(prevTree);
                let right = copyTree; // 这里是移动的指针
                // 查找到要插入的位置的父节点，由于每一次都要拷贝一棵树
                // 所以这里要加上查找步骤
                let k = 1;
                while(k++ < j){
                    // 位置要写对，考虑到copyTree可能就是null
                    if(!right){
                        break;
                    }
                    right = right.right;

                }
                // 查找已经到了要插入位置的父节点为null
                if(!right){
                    break;
                }
                // 替换节点 ：
                // 0. 创建要替换的节点
                // 1. 获取当前right节点的右节点right1； 2. 将right1挂载到新节点上 3. 将新节点挂载到当前right节点

                const newNode = new TreeNode(i);
                newNode.left = right.right;
                right.right= newNode;
                cur.push(copyTree);
            }
         })
         prev = cur;
     }
     return prev
 }


 var generateTrees = function(n) {
        const generateTree = (start,end)=>{
            if(start > end){
                return [null]
            }
            const allTrees = [];
            for(let i = start; i <= end; i++){
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
    return generateTree(0,n)
}

// 第二种思路 动态规划 思考突破点在于搜索二叉树的本质，插入一个值比所有节点值还要大的节点，只能在根节点的父节点或者右子树的右子树

// 根节点的父节点能不能通过一个虚拟节点来表示呢？
 // 暂时没思考出来
var generateTrees = function(n) {
    let prev = [];
    if(n < 1){
        return prev
    }
    prev[0]  = {left:null,right:null,val:1};
    for(let i = 2; i <= n ; i++){
        const cur = [];
        prev.forEach(tree=>{
              // 插入头部
            const newRoot = {left:null,right:null,val:i};
            newRoot.right = tree;
            cur.push(newRoot);
            // 找到要插入的点
            for(let j = 1; j<i; j++){ // 这里解释为什么j<i，因为i是待插入的值，j代表着要插入的节点的父节点
                const treeCopy = tree ? JSON.parse(JSON.stringify(tree)) : tree;
                let cursorPoint = treeCopy;

                let k = 0;
                while(k++ < j){
                    if(cursorPoint == null){
                        break;
                    }
                    cursorPoint = cursorPoint.right;
                }
                if(cursorPoint == null){
                    break;
                }
                // 插入到查找到的节点的右节点
                const prevRightTree = cursorPoint.right;
                const newRoot = {left:null,right:null,val:i};
                cursorPoint.right = newRoot;
                newRoot.left = prevRightTree;
                cur.push(treeCopy);
            }
        })
        prev = cur;
    }
    return prev
}

