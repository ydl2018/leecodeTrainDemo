// 1. 原始解法
// 通过双层循环
var reversePairs = function (nums) {
    let num = 0;
    for (let i = 0, len = nums.length; i < len - 1; i++) {
        const cur = nums[i];
        for (let j = i + 1; j < len; j++) {
            const next = nums[j];
            cur > next && num++
        }
    }
    return num
};
// 利用归并排序实现，为什么想到归并排序？因为归并排序在排序过程中会进行左右比较，
// 并且比较之后就会合并，不会依次比较
// 1. 实现归并排序

const arr = [5, 7, 6, 2, 3];
const mergeSort = (arr) => {
    // 1.分
    if (arr.length < 2) return arr;
    const aim = Math.floor(arr.length / 2);
    const leftArr = arr.splice(0, aim);
    const rightArr = arr;
    const curLeftArr = mergeSort(leftArr);
    const curRightArr = mergeSort(rightArr);
    // 2. 治
    const res = [];
    // 2.1 比较
    while (curLeftArr.length) {
        if (!curRightArr.length) {
            break
        }
        if (curLeftArr[0] <= curRightArr[0]) {
            res.push(curLeftArr.shift())
        } else {
            res.push(curRightArr.shift())
        }
    }
    // 2.2 处理剩余
    if (curRightArr.length) res.push(...curRightArr);
    if (curLeftArr.length) res.push(...curLeftArr);
    return res
};
reversePairs = function (nums) {
    let num = 0;
    const fn = (arr) => {
        if (arr.length < 2) return arr;
        // 分
        const aim = Math.floor(arr.length / 2);
        const leftArr = arr.slice(0, aim);
        const rightArr = arr.slice(aim);
        const resLeftArr = fn(leftArr);
        const resRightArr = fn(rightArr);
        // 治
        const res = [];
        while (resLeftArr.length && resRightArr.length) {
            if (resLeftArr[0] > resRightArr[0]) {
                num +=  resRightArr.length;
                res.push(resLeftArr.shift())
            } else {
                res.push(resRightArr.shift())
            }
        }
        if (resLeftArr.length) res.push(...resLeftArr);
        if (resRightArr.length) {
            res.push(...resRightArr)
        }
        return res
    };
   fn(nums);
    return num
};
// console.log(mergeSort([1, 7, 2, 3, 6, 8]));

console.log(reversePairs([7,5,6,4]));
