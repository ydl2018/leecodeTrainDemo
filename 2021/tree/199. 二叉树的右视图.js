/**
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

 示例:

 输入: [1,2,3,null,5,null,4]
 输出: [1, 3, 4]
 解释:

 1            <---
 /   \
 2     3         <---
 \     \
 5     4       <---

 * */

// 层次遍历
var rightSideView = function(root) {
    if(!root) return []
    const stacks = [root];
    let count = 1;
    const result = []
    while (stacks.length){
        let curr = stacks.shift();
        curr.left && stacks.push(curr.left)
        curr.right && stacks.push(curr.right)
        count--
        if(count  === 0){
            result.push(curr.val)
            count = stacks.length
        }
    }
    return result
};

// 方法2：使用dfs右节点优先遍历，每个度第一次访问时就是最右节点
var rightSideView = function(root) {
    if(!root) return []
    const stacks = [root];
    const result = [];
    const levels = [0]
    while (stacks.length){
        let curr = stacks.pop();
        let level = levels.pop();
        if(curr.left){
            stacks.push(curr.left)
            levels.push(level+1)
        }
        if(curr.right){
            stacks.push(curr.right)
            levels.push(level+1)
        }
        if(result[level] == null){
            result[level] = curr.val
        }
    }
    return result
}

// 举一反三
// 获取二叉树的左视图
var leftSideView = function(root) {
    if(!root) return []
    const stacks = [root];
    const result = [];
    const levels = [0]
    while (stacks.length){
        let curr = stacks.pop();
        let level = levels.pop();
        if(curr.right){
            stacks.push(curr.right)
            levels.push(level+1)
        }
        if(curr.left){
            stacks.push(curr.left)
            levels.push(level+1)
        }
        if(result[level] == null){
            result[level] = curr.val
        }
    }
    return result
}
// 复习时，
// 1.忘记了初始化level
// 2.忘记了怎么比较level，因为每次pop时，
// 那么原来的level不就是不存在了吗?
// result
var rightSideView = function(root) {
    if(!root) return []
    const stack = [root];
    const levels = [0];
    const result = []
    while (stack.length){
     let curr = stack.pop();
      let level = levels.pop();
        if(curr){
         // only set level when it is undefined
         if(result[level] == null){
             result[level] = curr.val
         }
             stack.push(curr.left)
             levels.push(level+1)
             levels.push(level+1)
             stack.push(curr.right)
     }
    }
    return result
}
