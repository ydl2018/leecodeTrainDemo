/**
 *
 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

 示例:

 给定有序数组: [-10,-3,0,5,9],

 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

 0
 / \
 -3   9
 /   /
 -10  5
 * **/

var sortedArrayToBST = function(nums) {
    return generateTree(nums)
};
/************************思路1：时间复杂度太高 ***********************************/

// 1.如何根据一个有序数组生成一颗二叉搜索树 ？

const Tree = (val)=>{
    return {
        val,
        left:null,
        right:null
    }
}
const cloneNode = (node)=>{
    return node ? JSON.parse(JSON.stringify(node)) : node
}
//
const generateTree = (nums)=>{
    // 递归思路：
    // 0. 入参，数组
    // 1.遍历数组，选择特定节点作为根节点
    // 2. 以该节点为切割点，分为左数组与右数组
    // 3. 递归左右数组
    // 4. 对返回的数组（也就是有序子数组的节点集合）分别遍历，并合成节点
    // 5. 返回该数组对应的节点集合
    const map = new Map()
    const getCacheResult = (i,j)=>{
        return map.get(i+'-'+j)
    }
   const fn = (_i,_j)=>{
       if(_i > _j ){
           return [null]
       }
       if(map.has(_i+'-'+_j)){
           console.log('执行')
           return map.get(_i+'-'+_j)
       }
       const result = []
       for(let i = _i;i <= _j; ++i){
            let node = Tree(nums[i])
           // 知识点1：slice第一个参数如果不小于总长度，并不会重新回到索引开头处
           // 如果使用负数索引，表示从数组的最后开始算
            const leftArr = fn(_i,i-1)
            const rightArr = fn(i+1,_j)
           for(let j = 0; j < leftArr.length;++j){
                for(let k = 0; k <rightArr.length; ++k){
                    let curNode = cloneNode(node)
                    curNode.left = cloneNode(leftArr[j])
                    curNode.right = cloneNode(rightArr[k])
                    if(isBalanced(curNode)){
                        result.push(curNode)
                    }
                }
            }
       }
       map.set(_i+'-'+_j,result)
       return result
   }
   return fn(0,nums.length-1)
}

// 2. 如何从生成的二叉树里选择高度平衡的树
const getDeep = (root)=>{
    if(!root) return 0
    const dl = getDeep(root.left)
    const dr = getDeep(root.right)
    if(dl === -1 || dr === -1 || Math.abs(dl - dr) > 1){
        return -1
    }
    return Math.max(dl,dr)+1
}
var isBalanced = function(root) {

    return getDeep(root) !== -1
};
const arg =  [-93,-89,-85,-76,-56,-53,-20,-10,20,28,41,50,66,70,87,88,91,94]

// console.log(generateTree(
// console.log(generateTree([1, 2, 3]))
// console.log(generateTree(arg))

// 1. 排序升序为中序遍历
// 2. 每次取数组的中点作为根节点，巧妙保证节点的平衡
var sortedArrayToBST = function(nums) {
    const generate = (i,j)=>{
        if(i > j){
          return null
        }
        let node = {left:null, right:null}
        let mid = Math.floor((i+j)/2)
        node.val = nums[mid]
        node.left = generate(i,mid-1)
        node.right = generate(mid+1,j)
        return node
    }
    return generate(0,nums.length-1)
};
console.log(sortedArrayToBST([1, 2, 3]))
console.log(sortedArrayToBST(arg))
