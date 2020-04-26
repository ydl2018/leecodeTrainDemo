// 求出个数
var permute = function(nums) {
    const len = nums.length;
    const fn = (n)=>{
        if(n === 1) return n
        return fn(n-1)*n
    }
    return fn(len)
}
// 求出排列
var permute = function(nums) {
    const res = []
    for(let i = 0; i<nums.length;i++){
        
    }
}
console.log(permute([1,2,3]));
