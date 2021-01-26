/**
 *
 * 给定一个二叉树，找出其最小深度。

 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

 说明：叶子节点是指没有子节点的节点。
 * **/
var minDepth = function(root) {
    if(!root) return 0
    let minDeep = Infinity;
    const getDeep = (node,originHeight = 0)=>{
        if(!node) return
        if(!node.left  && !node.right){
           minDeep = Math.min(minDeep,originHeight+1)
        }
        if(originHeight+1 < minDeep){
            getDeep(node.left,originHeight+1)
            getDeep(node.right,originHeight+1)
        }
    }
    getDeep(root)
    return minDeep
};
