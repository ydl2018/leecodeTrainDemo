/**
 *
 给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

 说明：
 你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。

 示例 1:

 输入: root = [3,1,4,null,2], k = 1
 3
 / \
 1   4
 \
 2
 输出: 1
 示例 2:

 输入: root = [5,3,6,2,4,null,null,1], k = 3
 5
 / \
 3   6
 / \
 2   4
 /
 1
 输出: 3
 进阶：
 如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？

 通过次数86,452提交次数118,871
 *
 * **/
var kthSmallest = function(root, k) {
    if(!root) return root
    const stack = [];
    let curr = root;
    let count = k
    while (curr || stack.length){
        while (curr){
            stack.push(curr)
            curr = curr.left
        }
        curr =  stack.pop()
        if(!--count) return curr.val
        curr = curr.right
    }
};
let unit1 = kthSmallest({val:3,left:{val:1,right:{val:2}},right:{val:4}},1)
// expected 1

let unit2 = kthSmallest({val:5,
    left:{
        val:3,
        left:{val:2,left:{val:1}},
        right:{val:4}
    },
    right:{
        val:6
    }
},3)

console.log(unit1,unit2)
