/**
 * 给一个数组，返回一个大小相同的数组。返回的数组的第i个位置的值应当是，
 * 对于原数组中的第i个元素，至少往右走多少步，才能遇到一个比自己大的元素
 * （如果之后没有比自己大的元素，或者已经是最后一个元素，
 * 则在返回数组的对应位置放上-1）。
 */
const fn = (arr)=>{
    const resArr = Array.from({length:arr.length},()=>-1);
    // 存储索引
    const stacks =  new Array(arr.length);
    for(let i = 0 ; i<arr.length;i++){
        // 第一次遇到大的值
        while(stacks.length && arr[stacks[stacks.length-1]] < arr[i]){
            const index = stacks.pop();
            resArr[index] = i - index;
        }
        stacks.push(i);
    }
    return resArr
} 
console.log(fn([5,3,1,2,4]));

// 变例，给定一个数组，求出一个数组中对应位置的第一次遇到比它小的值，没有则返回-1

const fn2 = (inputArr)=>{
    // 1. 声明返回数组，声明存储索引的单调栈
    const resArr = Array.from({length:inputArr.length},()=>-1);
    const stacks = [];
    for(let i = 0 ; i < inputArr.length; i++){
        while(stacks.length && inputArr[stacks[stacks.length-1]] > inputArr[i]){
            const index = stacks.pop();
            resArr[index] = i - index;
        }
        stacks.push(i)
    }
    return resArr
}
console.log(fn2([5,3,1,2,4]));
