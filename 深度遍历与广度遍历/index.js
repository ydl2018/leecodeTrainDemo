const example = {
    label:'1',
    children:[
        {label:'1-1',children:[{label:'1-1-1'}]},
        {label:'1-2',children:[{label:'1-2-1'},{label:'1-2-2'}]}
    ]
}
const deepTraversal = (node)=>{
    const stacks = []
    const nodeList = []
    stacks.push(node)
    // 利用栈的思维
    while(stacks.length !== 0){
         const childrenTtem = stacks.pop();
         nodeList.push(childrenTtem.label);
         if(childrenTtem.children){
             const len = childrenTtem.children.length
             // 保证最后一个是第一个子节点
             for(let i = len-1;i>=0;i--){
                 stacks.push(childrenTtem.children[i])
             }
         }
    }
    return nodeList
}
console.log((deepTraversal(example)));

const wideTrasversal = (node)=>{
    const nodes = [];
    const stacks = [];
    stacks.unshift(node)
    while(stacks.length !== 0){
        const todoItem = stacks.shift()
        nodes.push(todoItem);
        const children = todoItem.children;
        if(children){
            for(let i =0 ;i < children.length; i++){
                stacks.push(children[i])
            }
        }
    }
    return nodes
}

// 深度遍历 多叉树 前序遍历 利用栈

// 考虑到按照顺序来遍历，那么可以采取倒序遍历
// TODO 后序如何处理？
const deepTraversal2 = function(node){
    const stacks = [];
    const res = [];
    stacks.push(node);
    let currentNode ;
    while(stacks.length){
        currentNode =  stacks.pop();
        res.push(currentNode.label);
        let len = currentNode.children ? currentNode.children.length : 0;
        while(len--){
            stacks.push(currentNode.children[len])
        }
    }
    return res
}

console.log((deepTraversal2(example)));

// 广序遍历
// 使用队列，先进先出
const wideTrasversal2 = function(node){
    const stacks = [];
    const res = [];
    let currentNode ;
    stacks.push(node);
    while(stacks.length){
        currentNode = stacks.shift();
        res.push(currentNode.label)
        currentNode.children && currentNode.children.forEach(child => {
                stacks.push(child)
         });
    }
    return res
}

console.log(wideTrasversal2(example));
