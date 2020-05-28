
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
// preorderTraversal(node)

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
// middleOrderTraverval(node)

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
// postOrderTraverval(node)

const preorderTraversal2 = function(treeNodeRoot){
    // 确定游标
    let currentNode = treeNodeRoot;
    // 定义一个栈，用来保留每次遍历的节点
    const stacks = [];
    // 遍历的思路是先往最左边走，走到尽头了，退一步，往右边走

    // currentNode 遍历到底部有可能为空值，此时需要额外判断是否
    // 栈里的元素也清空了
    while(currentNode || stacks.length){
        // 遍历完左子树
        while(currentNode){
            stacks.push(currentNode);
            // 先序遍历，根左右,先取值
            console.log(currentNode.val);
            
            currentNode = currentNode.left;
        }
        // 处理完，此时currentNode是Null
        // 从栈里弹出节点，访问右子树
        if(stacks.length){
            currentNode = stacks.pop();
            currentNode = currentNode.right;
        }
    }
}
// preorderTraversal2(node)

// 中序遍历
// 思路与前序遍历类似
const middleOrderTraverval2 = function(treeNodeRoot){
    const stacks = [];
    let currentNode = treeNodeRoot;
    while(stacks.length || currentNode ){
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left
        }
        currentNode = stacks.pop()
        console.log(currentNode.val);
        currentNode = currentNode.right;
        
    }
}
// middleOrderTraverval2(node)
const postOrderTraverval2 = function(treeNodeRoot){
    let currentNode = treeNodeRoot;
    const stacks = [];
    // 额外定义一个上次访问的游标，因为后序需要判断当前的节点右节点是否被访问过了
    // 再执行访问
    let lastVisit = null;
    while(currentNode || stacks.length){
        // 继续先找左边的原则
        while(currentNode){
            stacks.push(currentNode);
            currentNode = currentNode.left;
        }
        // 此时currentNode为空,需要取栈顶元素进行判断，注意不是立即出栈
        // 前序与中序之所以立即出栈，是为了访问完后节点时，直接跳过父节点访问上面的节点
        
        // 此时currentNode 被手动赋值了，那么下一次循环时，不将节点设置为空节点
        // 会重复遍历左节点，也就是进行上面的while节点操作
       
        currentNode = stacks[stacks.length-1];
        // 如果节点的右节点为空，或者右节点被访问过了
        if(currentNode.right == null || currentNode.right == lastVisit ){
            // 访问并出栈
           
            lastVisit = stacks.pop()
            console.log(lastVisit.val);
            // 此时将currentNode 置为空值,为了让栈里的元素直接进行访问操作
            // 而不是重复遍历
            currentNode = null
        }else{
            currentNode = currentNode.right;
        }
    }
}
postOrderTraverval2(node)