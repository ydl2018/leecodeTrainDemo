// 没有考虑到层级的问题
var rightSideView = function(root) {
    const stacks = [];
    const nodes = []
    stacks.push(root);
    while(stacks.length >0){
        const todoItem = stacks.shift();
       
        if(todoItem !== null){
            const {left=null,right=null} = todoItem
            nodes.push(todoItem.val)
            stacks.push(right)
        }
    }
    return nodes
};
console.log(rightSideView({val:1,left:{val:'1-1',left:{val:'1-1-1'}},right:{val:'2-1',left:{val:'2-1-1'}}}));
