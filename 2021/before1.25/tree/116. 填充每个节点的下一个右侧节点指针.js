/**
 * 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

 struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

 初始状态下，所有 next 指针都被设置为 NULL。

  

 进阶：

 你只能使用常量级额外空间。
 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
  

 示例：



 输入：root = [1,2,3,4,5,6,7]
 输出：[1,#,2,3,#,4,5,6,7,#]
 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
  

 提示：

 树中节点的数量少于 4096
 -1000 <= node.val <= 1000
 * */

// 原始版
var connect = function(root) {
    if(!root) return null
    const stacks = [root];
    let levelLen = stacks.length
    let prev = null
    while(stacks.length) {
        let curr = stacks.shift();
        curr.left && stacks.push(curr.left);
        curr.right && stacks.push(curr.right)
        if(prev){
            prev.next = curr
        }

        if(--levelLen === 0){
            prev = null
            levelLen = stacks.length
        }else{
            prev = curr
        }
    }
    return root
};

// 优化：如何通过栈的特性消除prev这个中间变量.使用栈的peek特性

var connect = function(root) {
    if(!root) return null
    const stacks = [root];
    let levelLen = stacks.length
    while(stacks.length) {
        let curr = stacks.shift();
        curr.left && stacks.push(curr.left);
        curr.right && stacks.push(curr.right)
        if(levelLen-1 !== 0){
            curr.next = stacks[0]
        }
        if(--levelLen === 0){
            levelLen = stacks.length
        }
    }
    return root
};
connect({val:1,
    left: {val:2,
        left: {val:4,left:null,right:null},
            right:{val:5,left:null,right:null}},
    right:{val:3,
        left:{val:6,left:null,right:null},
        right:{val:7,left:null,right:null}}
})
