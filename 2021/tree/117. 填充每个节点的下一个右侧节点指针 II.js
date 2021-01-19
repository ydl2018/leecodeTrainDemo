/***
 * 给定一个二叉树

 struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

 初始状态下，所有 next 指针都被设置为 NULL。

  

 进阶：

 你只能使用常量级额外空间。
 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

 * */
var connect = function(root) {
    if(!root) return null
    const stacks = [root];
    let levelNum = 1;
    while (stacks.length){
        let curr = stacks.shift();
        curr.left && stacks.push(curr.left);
        curr.right && stacks.push(curr.right);

        if(--levelNum !== 0){
            curr.next = stacks[0]
        }else{
            levelNum = stacks.length
        }

    }
    return root
};

// 优化层次遍历：通过for循环，减少中间变量的维持
var connect = function(root) {
    if(!root) return null
    const stacks = [root]
    while (stacks.length){
        let n = stacks.length;
        let prev = null
        for(let i = 0; i < n; ++i){
            // 赋值表达是表示结合的意思
            // 但不影响 左值 和 右值 之间的 运算先后顺序
           // stacks.shift().next = stacks[0]
            const curr = stacks.shift();
            if(i!==0 && prev){
                prev.next = curr
            }
            curr.left && stacks.push(curr.left);
            curr.right && stacks.push(curr.right);
            prev = curr
        }
    }
    return root
}


// const test = (x)=>{
//     let left = 0;
//     let right = x;
//     let mid;
//     while (left <= right){
//         mid = Math.floor((left + right)/2)
//         let midPow = Math.pow(mid,2)
//         if(midPow === x){
//             return mid
//         }
//         if(midPow > x){
//             right = mid - 1
//         }
//         if(midPow < x){
//             left = mid + 1
//         }
//     }
//     return mid
// }
