const node = { val: 1, left: { val: '2', left: { val: '3', left: null, right: null }, right: null }, right: { val: '4', left: null, right: null } }
// 中序遍历  3 2 1 4
/**
 * 二叉搜索树中的两个节点被错误地交换。

请在不改变其结构的情况下，恢复这棵树。

示例 1:

输入: [1,3,null,null,2]

   1
  /
 3
  \
   2

输出: [3,1,null,null,2]

   3
  /
 1
  \
   2

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/recover-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var recoverTree = function (root) {
    let pretendNode;
    let currentNode = root;
    const stacks = [];
    let x, y;
    // 找到节点
    while (stacks.length || currentNode) {
        while (currentNode) {
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        currentNode = stacks.pop();
        // 一共有两次会出现错位
        if (pretendNode && pretendNode.val > currentNode.val) {
            // 此处都交换逻辑一定要理清楚
            // 存在两种可能性
            // 1. x与y在中序遍历中是相邻的
            // 2. x与y在中序遍历中是不相邻的
            // 所以我们要让y记住每一次这种情况的出现

            y = root;
            if (x) {
                // y = root
                break;
            }
            x = pretendNode;
        }
        pretendNode = currentNode;
        currentNode = currentNode.right;
    }
    // 交换节点
    let temp = x.val;
    x.val = y.val;
    y.val = temp;

};

// moriss 遍历
// morris遍历是二叉树遍历算法的超强进阶算法，跟递归、非递归（栈实现）的空间复杂度，morris遍历可以将非递归遍历中的空间复杂度降为O(1)。从而实现时间复杂度为O(N)，而空间复杂度为O(1)的精妙算法。
// morris遍历利用的是树的叶节点左右孩子为空（树的大量空闲指针），实现空间开销的极限缩减。

// morris 遍历原则
/**
 * 记作当前节点为cur。

如果cur无左孩子，cur向右移动（cur=cur.right）
如果cur有左孩子，找到cur左子树上最右的节点，记为mostright
如果mostright的right指针指向空，让其指向cur，cur向左移动（cur=cur.left）
如果mostright的right指针指向cur，让其指向空，cur向右移动（cur=cur.right）

 */  

// 本质 画个向左横向的数字9的形式，所以对于没有左子树的节点，只访问一次；
// 有左子树，由于数字9的特性，需要访问两次

var recoverTree = function (root) {
    // morris 中序遍历
    let prev, x, y;
    while (root) {
        // 1. 如果有左子树
        if (root.left) {
            // 1.1 求出左子树最右节点
            let mossisRight = root.left;
            // 这里犯了两次错！ 1. while(mossisRight)
            // 2. 是没考虑到mossis节点不一定会没有右节点的
            while (mossisRight.right && mossisRight.right !== root) {
                mossisRight = mossisRight.right
            }
            // 1.1.1 如果mossisRight 的右节点为空
            if (!mossisRight.right) {
                // moss指向当前节点
                mossisRight.right = root;
                // 当前节点左移
                root = root.left

            } else { // 1.1.2 访问到这里发现右节点不为空，证明已经被访问该左子树了
                mossisRight.right = null;
                if (prev && prev.val > root.val) {
                    y = root;
                    if (!x) {
                        x = prev
                    }
                }
                prev = root;
                root = root.right
            }
        } else {
            if (prev && prev.val > root.val) {
                y = root;
                if (!x) {
                    x = prev
                }
            }

            prev = root;
            root = root.right
        }

    }
    // 交换节点
    const temp = x.val;
    x.val = y.val;
    y.val = temp;
}

// 中序遍历特性
var recoverTree = function(root){
    const stacks = [];
    let currentNode = root,x,y,prependNode;
    while(stacks.length || currentNode){
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        currentNode = stacks.pop();
        if(prependNode && prependNode.val > currentNode.val){
            y = currentNode;
            if(x){
                break;  
            }
            x = prependNode;

        }
        prependNode = currentNode;
        currentNode = currentNode.right;
    }

    x.val = x.val ^ y.val;
    y.val = x.val ^ y.val;
    x.val = x.val ^ y.val;
}

//morris
var recoverTree = function(root){
   // 1. 无左节点，直接往右节点走
   // 2. 有左节点，找到左节点的最右节点（包括自身）mosRight 判断标准为不等于当前cur
   //   mosRight.right 为空，那么指向cur，cur移动到左节点 
   //   mosRight.right 不为空，指向置为null,cur移动到右节点

   let x, y,pretendNode;
    while(root){
        if(root.left){
            let mosRight = root.left;
            while(mosRight.right && mosRight.right != root){
                mosRight = mosRight.right
            }

            if(mosRight.right){
                mosRight.right = null;
            }else{
               mosRight.right = root;
               root = root.left; 
               continue;
            }
        }
        // only go right can visit
        if(pretendNode && pretendNode.val > root.val){
            y = root;
            if(!x){
                // 错误点: 不可以直接break;
                x = pretendNode;
            }
            
        }
        pretendNode = root;
        root = root.right;
    }
    x.val = x.val ^ y.val;
    y.val = x.val ^ y.val;
    x.val = x.val ^ y.val;
}

recoverTree(node)
