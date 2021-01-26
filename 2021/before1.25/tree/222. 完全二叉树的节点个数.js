/**
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

 完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

 输入：root = [1,2,3,4,5,6]
 输出：6
 示例 2：

 输入：root = []
 输出：0
 示例 3：

 输入：root = [1]
 输出：1
* */

// keyPoint:
    // 1. 完全二叉树中，二进制的位和tree的节点位置是对应的
    // 2. 度为0计算树时，叶子节点的第一个是 2^n ,最后一个节点是 2^(n+1) - 1
    // 3. 完全二叉树，可以通过不断访问左节点，或者层数level
    // 4. 如果要排除一个二进制数某个位是1还是0，可以将其和二进制数例如1000不断比较对应位置
    // 如： x = 10101, 但对我们来说x是未知的，我该怎么样才能知道x的每个位的值呢？
    // 方法1：不断除以2，将它纳入数组；
    // 方法2：以10000的形式进行比较，然后 10000 > 1
    // 逐步进行比较
var countNodes = function(root) {
    if(!root) return 0
    let level = 0
    let pt = root
    // 1
    while (pt.left){
        level++
        pt = pt.left
    }
    // 2
    let start = 1 << level
    let end = 1 << (level+1) - 1

    // 4.
    while (start < end){
        // we need [start,middle-1] & [middle,end]
        // so make end - start + 1
        let middle = Math.floor((end - start + 1) / 2) + start
        if(isExit(level,middle)){
            start = middle
        }else{
            end = middle - 1
        }
    }
    return start
    // determinate if middle exits tree

    // 3.
    // 为什么不使用全1进行比较 ？ 如果全1就不能一个位一个位进行比较了
    function isExit(level,middle){
        let pt = root
        let bits = (1) << (level - 1)
        while (pt && bits !== 0){
            if((bits & middle) === 0){
                pt = pt.left
            }else{
                pt = pt.right
            }
            bits = bits >> 1
        }
       return !! pt
    }
};
var countNodes = function(root) {
    if(!root) return 0
    let result = 0;
    let cur = root,level = 0;
    // get level
    while (cur.left){
        ++level
        cur = cur.left
    }

    // get leaf node range
    let start = 1 << level
    let end = (1 << level+1) - 1


    while (start < end){
        let mid = Math.floor((start + end + 1) / 2);
        if(exits(root,level,mid)){
            start = mid
        }else{
            end = mid - 1
        }
    }
    return start
    function exits(root,level,mid){
        let bits = 1 << (level-1);
        let cur = root;
        // 复习难点：在这里的思考：如何判断当前子树里到底有没有该节点，靠的是bits为0时（也就是访问
        // 到最后一层的节点时，是否还存在？）
        while (cur && bits){
            // 犯错点：
            // 1.到底是1是左边，还是0是左边？
            // 0
            // 为什么？
            // 现在的答案：因为root节点count为1，而最后一层的第一个节点n的count表达式为 1,0..00
            // => 根节点每一次都选择了0也就是左边进行右移

            // 2. 能不能写成(mid & bits) === 1 ？
            // 答：不能，因为 结果可能是 00100 !== 0
            const direction = (mid & bits) === 0? 'left':'right'
            root = root[direction]
            bits >>= 1
        }
        return !!root
    }
}
