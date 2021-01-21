/**
 *
 实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。

 调用 next() 将返回二叉搜索树中的下一个最小的数。



 示例：



 BSTIterator iterator = new BSTIterator(root);
 iterator.next();    // 返回 3
 iterator.next();    // 返回 7
 iterator.hasNext(); // 返回 true
 iterator.next();    // 返回 9
 iterator.hasNext(); // 返回 true
 iterator.next();    // 返回 15
 iterator.hasNext(); // 返回 true
 iterator.next();    // 返回 20
 iterator.hasNext(); // 返回 false
 * **/

// 中序遍历
    // improve:使用中序遍历后的数组作为栈，使用索引作为指针
var BSTIterator = function(root) {
    let curr = root;
    let stacks = [];
    let prev = {next:null};
    this.root = prev
    while (curr || stacks.length){
        while (curr){
            stacks.push(curr);
            curr = curr.left
        }
        curr = stacks.pop();
        prev.next = curr
        prev = curr
        curr = curr.right
    }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    const result = this.root = this.root.next
    console.log(result.val)
    return result.val
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    const result = !! (this.root && this.root.next)
    console.log(result)
    return result
};

// 思路2：为什么不在中序遍历时直接返回next呢？
// 可以思考：每次先遍历左节点，next依次出栈依次，next时再执行右节点的左节点遍历
var BSTIterator = function(root) {
    this.stacks = [];
    this.inOrderLeft(root)
};
BSTIterator.prototype.inOrderLeft = function (node){
    while (node){
        this.stacks.push(node)
        node = node.left
    }
}
/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
   const node  = this.stacks.pop()
    let result = node.val
    if(node.right){
        this.inOrderLeft(node.right)
   }
    return result
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return !!this.stacks.length
};

const iterator = new BSTIterator({val:7,left:{val:3},right:{
    val:15,left:{val:9},right:{val:20}
    }})
iterator.next();    // 返回 3
iterator.next();    // 返回 7
iterator.hasNext(); // 返回 true
iterator.next();    // 返回 9
iterator.hasNext(); // 返回 true
iterator.next();    // 返回 15
iterator.hasNext(); // 返回 true
iterator.next();    // 返回 20
iterator.hasNext(); // 返回 false

