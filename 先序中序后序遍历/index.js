
const node = {val:1,left:{val:'2',left:{val:'3',left:null,right:null},right:null},right:{val:'4',left:null,right:null}}
// 前序遍历  1 2 3 4
// 中序遍历  3 2 1 4
// 后序遍历  3 2 4 1

// 先序遍历 根左右
// 使用栈作为缓存，遍历到每一个节点时，先取它的数值
// 优先遍历完左边的子树
// 数据结构为{left:xx,right:xxx,val:xx}
// 测试数据
const preorderTraversal = function(treeNodeRoot){
    const stacks = [];
    let currentNode = treeNodeRoot;
    // 如果当前节点为空，有可能是遍历到某一个节点的叶子节点了，如果遍历到最后一个节点
    // 那么此时的栈应该为空

    while(currentNode != null || stacks.length){
        while(currentNode != null){
            console.log(currentNode.val+" ");
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        // 如果栈里还有元素，弹出节点
        if(stacks.length){
            currentNode = stacks.pop();
            currentNode = currentNode.right;
        }
    }
}
preorderTraversal(node)

// 中序遍历 左根右
// 每次遍历到最左边的节点为空时，从栈里取元素，再取值
// 如果节点为空，从栈里可以取上一层的节点，然后访问它的右节点，没有就出栈，有就继续执行先找到最左边的节点的原则。前序中序遍历时，访问的位置不同而已，
// 出栈然后访问右节点的好处是，可以保证下一次弹出的节点直接跳过已访问过的节点
// 这个技巧在后序遍历不好用
const middleOrderTraverval = function(treeNodeRoot){
    const stacks = [];
    let currentNode = treeNodeRoot;
    while(currentNode || stacks.length){
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        if(stacks.length){
            currentNode = stacks.pop();
            // 此处取值
            console.log(currentNode.val);
            // 访问右节点
            currentNode = currentNode.right;
            
        }
    }
}
middleOrderTraverval(node)

// 后序遍历 左右中
// 思路 设置一个游标，如果当前的节点右节点不存在，或者右节点存在但是右节点之前
// 已经被访问过了，那么此时再执行访问
const postOrderTraverval = function(treeNodeRoot){
    const stacks = [];
    let currentNode = treeNodeRoot;
    let lastVisit = null;
    while(currentNode || stacks.length){
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        // 访问栈顶元素
        currentNode = stacks[stacks.length-1];
        if(!currentNode.right || currentNode.right == lastVisit){
            console.log(currentNode.val);
            
            lastVisit =stacks.pop();
            currentNode = null;
            
        }else{
            currentNode = currentNode.right;
        }
    }
}
postOrderTraverval(node)