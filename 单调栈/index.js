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
        while(stacks.length && arr[stacks[stacks.length-1]] < arr[i]){
            const index = stacks.pop();
            resArr[index] = i - index;
        }
        stacks.push(i);
    }
    return resArr
} 
console.log(fn([5,3,1,2,4]));
