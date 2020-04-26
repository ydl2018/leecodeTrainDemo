// 求出个数
var permute = function (nums) {
    const len = nums.length;
    const fn = (n) => {
        if (n === 1) return n;
        return fn(n - 1) * n
    };
    return fn(len)
};
// 求出排列
// 思路 ： 固定一个数字，剩余的数字也是按照这个规律组合，接着指针往前走，即f(n) = nf(n-1)
// 由于每一次查找都是查找到nums.length 才往上走，可以使用栈的特性记录,一旦达到终点就退出
// 这是栈与递归的有机结合
var permute = function (nums) {
    const res = [];
    const stacks = [];
    const len = nums.length;
    let curValue;
    const backtrack = () => {
        if (stacks.length === len) {
            res.push(stacks.slice());
            return
        }
        for (let i = 0; i < len; i++) {
            curValue = nums[i];
            if (!stacks.includes(curValue)) {
                stacks.push(curValue);
                backtrack();
                stacks.pop()
            }
        }
    };
    backtrack();
    return res
};
// 官方思路：
// 优点：
// 1. 没使用栈去缓存数据
// 2. 成功去掉了 需要判断栈里元素是否有重复的逻辑，避免无谓遍历
// permute = function (nums) {
//     const len = nums.length;
//     const res = [];
//     const backtrack = (curIndex) => {
//         if (curIndex === len) return res.push(nums.slice());
//         for (let i = curIndex; i < len; i++) {
//             [nums[i], nums[curIndex]] = [nums[curIndex], nums[i]];
//             backtrack(curIndex + 1);
//             [nums[i], nums[curIndex]] = [nums[curIndex], nums[i]]
//         }
//     };
//     backtrack(0);
//     return res
// };

console.log(permute([1, 2, 3]));
