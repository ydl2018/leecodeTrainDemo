/**
 *
Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?

Example:

Input: 3
Output: 5
Explanation:
Given n = 3, there are a total of 5 unique BST's:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
 */

/**
 * @param {number} n
 * @return {number}
 */

 // 对于一个特定的树
 // n > 1
 // 设置f[n] 为给定n时，共有子树的数目
 // f[n] =    g[1] + .... + g[n]
 // 设置g[n] 为当根节点为n时，共有的子树数目
// g[n] = f[n-i] * f[i-1]
// f[n] = f[n-1]*f[0] + f[n-2]f[1] +... + f[0][n-1]

 // n = 1
 // f[n] = 1

 // n = 0 f[n] = 1 ,空节点
var numTrees = function(n) {
    const dep = [];

    dep[0] = 1;
    dep[1] = 1;
    for(let i = 2; i <=n ; i++){
        dep[i] = 0
        for(let j = 0; j < i; j++){
            dep[i] += dep[j] *dep[i - j -1]
        }
    }
    return dep[n]
};

// 复习
var numTrees = function(n) {
    const dep = [];
    // 1 <= i <= n
    // 设置 f[i] 为根节点为i时，组成子树的总数目；
    // 设置dep[n]是代表着给数量i的情况下，所拥有的子树数目

    // f[i] = dep[i-1] * dep[n - i] // 这里有一个技巧，就是右边的子树是大于i的，为什么可以用
    // dep[n-i]来表示呢？ 因为对于 n-i 到 n 组成的二叉搜索树，他们对应的数量（注意是数量）与dep[n-i]是一致的

    // 注意这里
    // dep[n] = f[1] + f[2] + f[3] + ... + f[n-1];
    // dep[n] = dep[0]* dep[n-1] + dep[1]* dep[n-2] + ... dep[n-1]* dep[0]

    // 如果给定的n为0
    dep[0] = 1;
    dep[1] = 1; // 为什么要排除 n == 1的情况？ 因为如果按照以上的公式，两个子树交换时，组成新的树，而这里是不符合题解的

    for(let i = 2; i <= n; i++){
        for(let j = 0 ; j < i ; j++){
            dep[i] += dep[j] * dep[i - j -1];
        }
    }
    return dep[n]
}
console.log(numTrees(3));
