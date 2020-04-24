var reversePairs = function(nums) {
    let num = 0
    for(let i =0,len = nums.length;i<len-1;i++){
        const cur = nums[i]
        for(let j = i+1 ; j<len;j++){
            const next = nums[j]
            cur > next && num++
        }
    }
    return num
};
console.log(reversePairs([7,5,6,4]));
