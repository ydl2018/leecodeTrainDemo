/**
 *
 * 给定一个二叉树，找出其最小深度。

 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

 说明：叶子节点是指没有子节点的节点。
 * **/
var minDepth = function(root) {
    const deepArr = [];
    const getDeep = (node,originHeight = 0)=>{
        if(!node) return
        if(!node.left  && !node.right){
            deepArr.push(originHeight + 1);
        }
        getDeep(node.left,originHeight+1)
        getDeep(node.right,originHeight+1)
    }
    getDeep(root)
    if(!deepArr.length) return 0
    return Math.min(...deepArr)
};
