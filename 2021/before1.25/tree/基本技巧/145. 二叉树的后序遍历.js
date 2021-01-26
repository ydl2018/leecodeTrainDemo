/**
 * 给定一个二叉树，返回它的 后序 遍历。

 示例:

 输入: [1,null,2,3]
 1
 \
 2
 /
 3

 输出: [3,2,1]
 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

 * **/
// 迭代

var postorderTraversal = function(root) {
    let currentNode = root;
    const stacks = [];
    const result = [];
    let lastNode = null;
    while(currentNode || stacks.length){
        while(currentNode){
            stacks.push(currentNode)
            currentNode = currentNode.left
        }
        const peek = stacks[stacks.length - 1];

        if(!peek.right ||  peek.right === lastNode){
            lastNode = stacks.pop();
            result.push(lastNode.val)
        }else{
            currentNode = peek.right
        }
    }
    return result
};

// morris

// 处理的逻辑：每次在某个节点要访问右节点时（清空processor），
// 将它的左节点以及左节点的右节点们入栈,达到左节点已是右序遍历
//
var postorderTraversal = function(root) {
    let currentNode = root
    const result = []
    // 处理该节点和该节点的右子节点，右右子节点
    const addPaths = (node)=>{
        let count = 0;
        while (node){
            count++
            result.push(node.val)

            node = node.right
        }
        let start = result.length - count;
        let end = result.length - 1;
        while(start < end){
            [result[start],result[end]] = [result[end],result[start]]
            start++
            end--
        }
    }
    while (currentNode){
        if(currentNode.left){
            let proccessor = currentNode.left
            while (proccessor.right && proccessor.right !== currentNode){
                proccessor = proccessor.right
            }
            if(proccessor.right){
                proccessor.right = null
                addPaths(currentNode.left)
                currentNode = currentNode.right
            }else{
                proccessor.right = currentNode
                currentNode = currentNode.left
            }
        }else{
            // 1.25 复习，这里以为要进行addPaths,错误原因：没有以意识到addPaths是处理左子节点的事务
            currentNode = currentNode.right
        }
    }
    // 保证根节点已右半部分也能成功遍历
    addPaths(root)
    return result
}
