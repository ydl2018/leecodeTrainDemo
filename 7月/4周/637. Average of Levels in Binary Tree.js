/**
 *
 Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.
 Example 1:
 Input:
 3
 / \
 9  20
 /  \
 15   7
 Output: [3, 14.5, 11]
 Explanation:
 The average value of nodes on level 0 is 3,  on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11].
 *
 * **/
 function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
 }
var averageOfLevels = function(root) {
     if(!root)  return 0
    const stacks = [root];
    let currentNode;
    let level = 1;
    const result = [];
    let sum = 0,divisor = 1;
    while (stacks.length){
        currentNode = stacks.shift()
        if(currentNode.left) stacks.push(currentNode.left)
        if(currentNode.right) stacks.push(currentNode.right)
        sum += currentNode.val;
        level--
        if(level === 0){
            result.push(sum/divisor)
            level = divisor = stacks.length;
            sum = 0
        }
    }
    return result
};
