/**
 *
 The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the "root." Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that "all houses in this place forms a binary tree". It will automatically contact the police if two directly-linked houses were broken into on the same night.

 Determine the maximum amount of money the thief can rob tonight without alerting the police.
 *
 * Example 1:

 Input: [3,2,3,null,3,null,1]

 3
 / \
 2   3
 \   \
 3   1

 Output: 7
 Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.

 来源：力扣（LeetCode）
 链接：https://leetcode-cn.com/problems/house-robber-iii
 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 * **/

// 思路：官方思路
var rob = function (root) {
    // f(x) 代表着偷窃当前节点时，子节点拥有的最大值
    // g(x) 代表着不偷窃当前节点时，子节点拥有的最大值
    const dfs = (root) => {
        if (!root) return {selected: 0, unSelected: 0}
        const l = dfs(root.left)
        const r = dfs(root.right)
        const unSelected = Math.max(l.selected, l.unSelected) + Math.max(r.selected, r.unSelected)
        const selected = root.val + l.unSelected + r.unSelected
        return {selected, unSelected}
    }
    root = dfs(root)
    return Math.max(root.selected, root.unSelected)
};
var rob = function (root) {
    const cursive = (root)=>{
        if(!root) return 0
        let money = root.val
        if(root.left){
            money += cursive(root.left.left) + cursive(root.left.right)
        }
        if(root.right){
            money += cursive(root.right.left) + cursive(root.right.right)
        }
        return Math.max(money,cursive(root.left)+cursive(root.right))
    }
    return  cursive(root)
}

const unit = {val: 10, left: {val: 1, left: null, right: null}, right: {val: 10, left: null, right: null}}
console.log(rob(unit));
