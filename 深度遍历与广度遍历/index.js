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
         nodeList.push(childrenTtem);
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
// console.log(deepTraversal(example));

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


