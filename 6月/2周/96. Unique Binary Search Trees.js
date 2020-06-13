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
 // 设置g[n] 为当节点为n时，共有的子树数目
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
console.log(numTrees(3));
